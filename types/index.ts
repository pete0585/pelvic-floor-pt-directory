export interface Listing {
  id: string
  slug: string
  npi_number: string | null
  full_name: string
  credentials: string | null
  practice_name: string | null
  bio: string | null
  headshot_url: string | null
  phone: string | null
  website: string | null
  booking_url: string | null
  email: string | null
  address_line1: string | null
  address_line2: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  conditions_treated: string[]
  certifications: string[]
  insurance_accepted: string[]
  languages_spoken: string[]
  accepts_telehealth: boolean
  accepting_new_patients: boolean
  home_visits: boolean
  listing_tier: 'unclaimed' | 'free' | 'verified' | 'featured'
  is_verified: boolean
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null
  source: string | null
  email_source: string | null
  do_not_email: boolean
  claimed_at: string | null
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at: string | null
  created_at: string
  expires_at: string
  nudge_sent_at: string | null
}

export interface Payment {
  id: string
  listing_id: string
  stripe_payment_intent_id: string | null
  stripe_subscription_id: string | null
  amount_cents: number
  currency: string
  tier: string
  status: string
  period_start: string | null
  period_end: string | null
  created_at: string
}

export interface CityPage {
  id: string
  city: string
  state: string
  state_abbr: string
  slug: string
  h1_title: string | null
  meta_description: string | null
  intro_content: string | null
  listing_count: number
}

export interface ConditionPage {
  id: string
  condition_slug: string
  condition_label: string
  h1_title: string | null
  meta_description: string | null
  intro_content: string | null
  listing_count: number
}

export const CONDITIONS = [
  { value: 'postpartum', label: 'Postpartum Recovery' },
  { value: 'pregnancy', label: 'Pregnancy & Birth Prep' },
  { value: 'urinary_incontinence', label: 'Urinary Incontinence' },
  { value: 'prolapse', label: 'Pelvic Organ Prolapse' },
  { value: 'pelvic_pain', label: 'Chronic Pelvic Pain' },
  { value: 'endometriosis', label: 'Endometriosis' },
  { value: 'painful_sex', label: 'Painful Sex' },
  { value: 'vaginismus', label: 'Vaginismus' },
  { value: 'male_pelvic_health', label: 'Male Pelvic Health' },
  { value: 'pediatric', label: 'Pediatric Pelvic Health' },
  { value: 'diastasis_recti', label: 'Diastasis Recti' },
  { value: 'constipation', label: 'Constipation & Bowel Issues' },
  { value: 'sexual_dysfunction', label: 'Sexual Dysfunction' },
  { value: 'interstitial_cystitis', label: 'Interstitial Cystitis' },
  { value: 'menopause', label: 'Menopause & GSM' },
  { value: 'cancer_recovery', label: 'Cancer Recovery' },
  { value: 'sports', label: 'Sports & Athletes' },
  { value: 'other', label: 'Other' },
] as const

export const CERTIFICATIONS = [
  { value: 'capp', label: 'CAPP (Certificate of Achievement in Pelvic PT)' },
  { value: 'wcs', label: 'WCS (Women\'s Clinical Specialist)' },
  { value: 'bcb_pmd', label: 'BCB-PMD (Biofeedback Certification)' },
  { value: 'prpc', label: 'PRPC (Pelvic Rehabilitation Practitioner Certification)' },
  { value: 'other', label: 'Other Certification' },
] as const

export const INSURANCE_OPTIONS = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Humana',
  'Medicare',
  'Medicaid',
  'Tricare',
  'Kaiser Permanente',
  'Oscar Health',
  'Self-pay / Cash-pay only',
] as const

export const US_STATES = [
  { abbr: 'AL', name: 'Alabama' },
  { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' },
  { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' },
  { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' },
  { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' },
  { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' },
  { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' },
  { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' },
  { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' },
  { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' },
  { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' },
  { abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' },
  { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' },
  { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' },
  { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' },
  { abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' },
  { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' },
  { abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' },
  { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' },
  { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' },
  { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' },
  { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' },
  { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' },
  { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' },
  { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' },
  { abbr: 'WY', name: 'Wyoming' },
  { abbr: 'DC', name: 'District of Columbia' },
] as const
