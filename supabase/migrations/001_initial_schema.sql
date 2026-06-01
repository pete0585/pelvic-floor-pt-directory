-- Pelvic Floor PT Directory — Initial Schema
-- Table prefix: pelvic_floor_pt_

-- Core listings table
CREATE TABLE IF NOT EXISTS pelvic_floor_pt_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  npi_number TEXT,
  full_name TEXT NOT NULL,
  credentials TEXT,
  practice_name TEXT,
  bio TEXT,
  headshot_url TEXT,
  phone TEXT,
  website TEXT,
  booking_url TEXT,
  email TEXT,
  do_not_email BOOLEAN DEFAULT FALSE,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  -- Specialty / credential arrays
  conditions_treated TEXT[] DEFAULT '{}' NOT NULL,
  certifications TEXT[] DEFAULT '{}' NOT NULL,
  insurance_accepted TEXT[] DEFAULT '{}' NOT NULL,
  languages_spoken TEXT[] DEFAULT '{"English"}' NOT NULL,
  -- Toggles
  accepts_telehealth BOOLEAN DEFAULT FALSE NOT NULL,
  accepting_new_patients BOOLEAN DEFAULT TRUE NOT NULL,
  home_visits BOOLEAN DEFAULT FALSE NOT NULL,
  -- Listing status
  listing_tier TEXT NOT NULL DEFAULT 'unclaimed',
  listing_tier_rank INTEGER DEFAULT 99,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE NOT NULL,
  -- Subscription
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ,
  -- Source tracking
  source TEXT,
  email_source VARCHAR,
  -- SEO
  search_vector TSVECTOR,
  -- Audit
  claimed_at TIMESTAMPTZ,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Grants
GRANT ALL ON pelvic_floor_pt_listings TO service_role, anon, authenticated;

-- Indexes
CREATE INDEX IF NOT EXISTS pfpt_listings_search_idx ON pelvic_floor_pt_listings USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS pfpt_listings_geo_idx ON pelvic_floor_pt_listings (latitude, longitude);
CREATE INDEX IF NOT EXISTS pfpt_listings_city_state_idx ON pelvic_floor_pt_listings (city, state);
CREATE INDEX IF NOT EXISTS pfpt_listings_tier_idx ON pelvic_floor_pt_listings (listing_tier);
CREATE INDEX IF NOT EXISTS pfpt_listings_conditions_idx ON pelvic_floor_pt_listings USING GIN (conditions_treated);
CREATE INDEX IF NOT EXISTS pfpt_listings_certifications_idx ON pelvic_floor_pt_listings USING GIN (certifications);

-- Search vector trigger (use trigger, not GENERATED ALWAYS AS — see LESSONS.md)
CREATE OR REPLACE FUNCTION pelvic_floor_pt_listings_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.full_name, '') || ' ' ||
    coalesce(NEW.credentials, '') || ' ' ||
    coalesce(NEW.practice_name, '') || ' ' ||
    coalesce(NEW.city, '') || ' ' ||
    coalesce(NEW.state, '') || ' ' ||
    coalesce(NEW.bio, '') || ' ' ||
    coalesce(array_to_string(NEW.conditions_treated, ' '), '') || ' ' ||
    coalesce(array_to_string(NEW.certifications, ' '), '')
  );
  NEW.updated_at := NOW();
  -- Tier rank: featured=1, verified=2, free=5, unclaimed=99
  NEW.listing_tier_rank := CASE NEW.listing_tier
    WHEN 'featured' THEN 1
    WHEN 'verified' THEN 2
    WHEN 'free' THEN 5
    ELSE 99
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pelvic_floor_pt_listings_search_vector_trigger
  BEFORE INSERT OR UPDATE ON pelvic_floor_pt_listings
  FOR EACH ROW EXECUTE FUNCTION pelvic_floor_pt_listings_search_vector_update();

-- RLS
ALTER TABLE pelvic_floor_pt_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active approved listings" ON pelvic_floor_pt_listings
  FOR SELECT USING (is_active = TRUE AND is_approved = TRUE);
CREATE POLICY "Service role full access" ON pelvic_floor_pt_listings
  USING (auth.role() = 'service_role');

-- Claims table
CREATE TABLE IF NOT EXISTS pelvic_floor_pt_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES pelvic_floor_pt_listings(id) NOT NULL,
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  verified BOOLEAN DEFAULT FALSE NOT NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  nudge_sent_at TIMESTAMPTZ
);

GRANT ALL ON pelvic_floor_pt_claims TO service_role, anon, authenticated;
ALTER TABLE pelvic_floor_pt_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access claims" ON pelvic_floor_pt_claims
  USING (auth.role() = 'service_role');

-- Payments table (append-only Stripe event log)
CREATE TABLE IF NOT EXISTS pelvic_floor_pt_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES pelvic_floor_pt_listings(id),
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd' NOT NULL,
  tier TEXT NOT NULL,
  status TEXT NOT NULL,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

GRANT ALL ON pelvic_floor_pt_payments TO service_role, anon, authenticated;
ALTER TABLE pelvic_floor_pt_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access payments" ON pelvic_floor_pt_payments
  USING (auth.role() = 'service_role');

-- City pages table
CREATE TABLE IF NOT EXISTS pelvic_floor_pt_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  state_abbr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  h1_title TEXT,
  meta_description TEXT,
  intro_content TEXT,
  listing_count INTEGER DEFAULT 0 NOT NULL,
  UNIQUE(city, state)
);

GRANT ALL ON pelvic_floor_pt_cities TO service_role, anon, authenticated;
ALTER TABLE pelvic_floor_pt_cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read cities" ON pelvic_floor_pt_cities FOR SELECT USING (TRUE);
CREATE POLICY "Service role full access cities" ON pelvic_floor_pt_cities
  USING (auth.role() = 'service_role');

-- Proximity search function
CREATE OR REPLACE FUNCTION find_pelvic_floor_pt_near(
  search_lat DOUBLE PRECISION,
  search_lng DOUBLE PRECISION,
  radius_miles DOUBLE PRECISION DEFAULT 25
)
RETURNS SETOF pelvic_floor_pt_listings AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM pelvic_floor_pt_listings
  WHERE is_active = TRUE
    AND is_approved = TRUE
    AND latitude IS NOT NULL
    AND longitude IS NOT NULL
    AND (
      3959 * acos(
        cos(radians(search_lat)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(search_lng)) +
        sin(radians(search_lat)) * sin(radians(latitude))
      )
    ) <= radius_miles
  ORDER BY listing_tier_rank, (
    3959 * acos(
      cos(radians(search_lat)) * cos(radians(latitude)) *
      cos(radians(longitude) - radians(search_lng)) +
      sin(radians(search_lat)) * sin(radians(latitude))
    )
  );
END;
$$ LANGUAGE plpgsql;

-- IndexNow key file
-- Key: 9e9f121e341d82d8e439bb5a49b2183b
