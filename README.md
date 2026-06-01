# Pelvic Floor PT Directory — pelvicfloordirectory.com

A production-ready directory of pelvic floor physical therapists built with Next.js 15, Tailwind CSS, and Supabase.

## Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS — custom teal/coral/cream design system
- **Database**: Supabase (project `fbuqrnzofktepkzyfmhy` — shared Directories project)
- **Payments**: Stripe ($99/yr Verified, $199/yr Featured)
- **Email**: Resend (from `hello@mail.pelvicfloordirectory.com`)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
cd builds/pelvic-floor-pt
cp .env.example .env.local
# Fill in your env vars (see Environment Variables section)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (use `fbuqrnzofktepkzyfmhy`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (same as `DIRECTORY_SUPABASE_SERVICE_KEY`) |
| `NEXT_PUBLIC_SITE_URL` | Production URL: `https://www.pelvicfloordirectory.com` |
| `STRIPE_SECRET_KEY` | Stripe restricted key (`rk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_VERIFIED_PRICE_ID` | `price_1TddtWGzK9SibluelmcU2dI5` ($99/yr) |
| `STRIPE_FEATURED_PRICE_ID` | `price_1TddtWGzK9SiblueXAuljloW` ($199/yr) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | `hello@mail.pelvicfloordirectory.com` |
| `ADMIN_EMAILS` | Comma-separated admin emails |

## Supabase Setup

### 1. Apply the migration

The schema is at `supabase/migrations/001_initial_schema.sql`. Apply it to project `fbuqrnzofktepkzyfmhy`:

**Via Supabase dashboard SQL editor** (paste the file contents and run), or:

```bash
supabase db push --db-url "postgresql://postgres:[password]@db.fbuqrnzofktepkzyfmhy.supabase.co:5432/postgres"
```

### 2. Verify tables exist

After migration, these tables should exist:
- `pelvic_floor_pt_listings`
- `pelvic_floor_pt_claims`
- `pelvic_floor_pt_payments`
- `pelvic_floor_pt_cities`

### 3. Seed initial data

```bash
DATAFORSEO_LOGIN=your_login \
DATAFORSEO_PASSWORD=your_password \
DIRECTORY_SUPABASE_SERVICE_KEY=your_service_key \
NEXT_PUBLIC_SUPABASE_URL=https://fbuqrnzofktepkzyfmhy.supabase.co \
npx ts-node scripts/seed.ts
```

This queries DataForSEO Google Maps for "pelvic floor physical therapist" across 50 US metros (~200-400 initial listings).

## Vercel Deployment

### 1. Create Vercel project

- Import the GitHub repo `pete0585/pelvic-floor-pt-directory`
- Framework: Next.js (auto-detected)
- Root directory: `/` (the repo root is this directory)

### 2. Add environment variables

In Vercel project Settings → Environment Variables, add all variables from `.env.example`.

> **Important**: Never put environment variables in `vercel.json`. Use the Vercel dashboard only.

### 3. Add custom domain

In Vercel project Settings → Domains, add `pelvicfloordirectory.com` and `www.pelvicfloordirectory.com`.

Point your Namecheap DNS to Vercel:
- `@` → CNAME to `cname.vercel-dns.com` (or A records per Vercel's instructions)
- `www` → CNAME to `cname.vercel-dns.com`

### 4. Configure Stripe webhook

In Stripe Dashboard → Webhooks, add endpoint:
```
https://www.pelvicfloordirectory.com/api/webhooks/stripe
```

Events to listen for:
- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_failed`

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in Vercel.

### 5. Configure Resend inbound webhook

In Resend Dashboard → Webhooks, add:
```
https://www.pelvicfloordirectory.com/api/inbound-email
```

> **Critical**: Must use `www.` prefix — Vercel redirects non-www with HTTP 307 and Resend does not follow redirects.

## Directory Structure

```
app/
├── page.tsx              # Homepage
├── listings/
│   ├── page.tsx          # Browse with filters
│   └── [slug]/page.tsx   # Individual listing detail
├── conditions/[slug]/    # Condition landing pages
├── submit/               # Submit a listing
├── claim/[id]/           # Claim a listing
├── admin/                # Admin panel (auth-protected)
└── api/                  # API routes

components/
├── ListingCard.tsx
├── ListingDetail.tsx
├── FilterSidebar.tsx
├── SearchBar.tsx
├── SubmitForm.tsx
└── AdminTable.tsx

supabase/migrations/
└── 001_initial_schema.sql

scripts/
└── seed.ts               # DataForSEO initial seed
```

## Admin Panel

The admin panel is at `/admin`. It requires Supabase auth with an email in the `ADMIN_EMAILS` env var.

To log in:
1. Go to `https://www.pelvicfloordirectory.com/admin/login`
2. Use Supabase Auth magic link or password auth

## Revenue Model

- **Free tier** (claimed): Basic listing, no badge
- **Verified** ($99/yr): Verified shield badge, booking link priority
- **Featured** ($199/yr): Top placement, coral star badge, all Verified features

Stripe products created by bootstrap agent — price IDs in `.env.example`.
