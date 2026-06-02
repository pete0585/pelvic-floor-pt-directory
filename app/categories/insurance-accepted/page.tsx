import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, DollarSign } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT That Takes Insurance | PelvicFloorPTDirectory.com',
  description: 'Find pelvic floor physical therapists who accept your insurance. Browse in-network pelvic floor PT options by location and insurance plan.',
}

const INSURERS = [
  { name: 'Blue Cross Blue Shield', note: 'Most regional BCBS plans cover pelvic floor PT with a PT referral or prior auth.' },
  { name: 'Aetna', note: 'Covers pelvic floor PT under physical therapy benefits. Prior auth often required.' },
  { name: 'UnitedHealthcare', note: 'Covers pelvic floor PT as medically necessary PT. Check your specific plan.' },
  { name: 'Cigna', note: 'Covers pelvic floor PT when medically necessary with proper diagnosis code.' },
  { name: 'Humana', note: 'Coverage varies by plan type. Many Humana PPO plans include PT.' },
  { name: 'Medicare', note: 'Part B covers outpatient PT, including pelvic floor PT. Deductible and 20% coinsurance apply.' },
  { name: 'Medicaid', note: 'Coverage varies significantly by state. Many state Medicaid plans cover pelvic PT.' },
  { name: 'TRICARE', note: 'Covers pelvic floor PT for eligible service members and veterans. Referral required.' },
]

const FAQ = [
  { q: 'Does insurance cover pelvic floor physical therapy?', a: 'Most major insurance plans cover pelvic floor PT when it is deemed medically necessary — the same way they cover any physical therapy. Coverage typically requires a diagnosis from your doctor and may require prior authorization. Out-of-pocket costs depend on your deductible, copay, and coinsurance.' },
  { q: 'What diagnosis code is used for pelvic floor PT?', a: 'Common ICD-10 codes used for pelvic floor PT billing include N39.3 (stress incontinence), N81.1 (cystocele), M79.3 (panniculitis), O26.7 (subluxation of symphysis pubis in pregnancy), and N94.1 (dyspareunia). Your physician and PT will select the appropriate code for your condition.' },
  { q: 'Do I need a referral for pelvic floor PT?', a: 'It depends on your state and insurance plan. Many states allow direct access to physical therapy without a physician referral. However, your insurance may still require a referral for coverage. Check your plan\'s PT benefits and your state\'s direct access laws.' },
  { q: 'What if my pelvic floor PT doesn\'t take my insurance?', a: 'Many cash-pay pelvic floor PTs will provide a superbill — a detailed receipt you can submit to your insurance for out-of-network reimbursement. Depending on your plan\'s out-of-network benefits, you may recover 40-80% of the cost. Ask your provider about this option.' },
]

export default async function InsurancePage() {
  const { listings } = await getListings({ pageSize: 24 }).catch(() => ({ listings: [], total: 0 }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-stone-600">Insurance Accepted</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>In-network pelvic floor PT</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Pelvic Floor PT That Accepts Insurance
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Pelvic floor physical therapy is a covered medical service under most major insurance
              plans. The trick is finding a pelvic floor specialist who is both qualified and
              in-network. Use the directory below to find providers who accept your plan.
            </p>
          </div>

          {/* Insurance breakdown */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-stone-700 mb-5">Coverage by major insurance plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INSURERS.map(({ name, note }) => (
                <div key={name} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-cream-300">
                  <DollarSign className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-700 text-sm">{name}</p>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-stone-700">
                  Browse pelvic floor PTs — filter by insurance in search
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  Use the filters on the browse page to narrow by specific insurance plans.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.slice(0, 9).map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/listings" className="btn-primary">
                  Browse all pelvic floor PTs with insurance filters <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Browse all pelvic floor PTs and filter by insurance on the listings page.
              </p>
              <Link href="/listings" className="btn-secondary">Browse the directory</Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Insurance Coverage for Pelvic Floor PT
            </h2>
            <div className="space-y-5 max-w-3xl">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="card p-6">
                  <h3 className="font-bold text-stone-700 mb-3">{q}</h3>
                  <p className="text-stone-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
