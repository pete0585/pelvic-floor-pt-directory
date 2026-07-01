import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Boston, MA | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Boston, Cambridge, Brookline, Newton, Somerville, and Quincy. Browse by condition, insurance, and telehealth availability.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/boston-ma' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Are there pelvic floor PTs affiliated with Mass General or Brigham and Women\'s in Boston?',
    a: "Yes. Massachusetts General Hospital (part of Mass General Brigham) and Brigham and Women's Hospital both have pelvic health physical therapy programs. Many independent Boston-area PTs trained at these institutions and bring that academic medical rigor to private practice. Boston has a particularly high concentration of WCS (Women's Clinical Specialist) and CAPP-certified pelvic floor PTs compared to most US cities.",
  },
  {
    q: 'Does Blue Cross Blue Shield MA cover pelvic floor PT?',
    a: "Blue Cross Blue Shield of Massachusetts typically covers pelvic floor PT under general PT benefits with a referral from your primary care physician. BCBS MA plans often require preauthorization for treatment beyond 12–15 visits. Harvard Pilgrim Health Care, Tufts Health Plan, and Mass General Brigham Health Plan also commonly cover pelvic floor PT. Always confirm coverage and visit limits before beginning treatment.",
  },
  {
    q: 'Can I get pelvic floor PT for vaginismus in Boston?',
    a: "Yes. Vaginismus, vulvodynia, and other sexual pain conditions are among the most commonly treated conditions by Boston pelvic floor PTs — particularly those in the Cambridge, Brookline, and downtown practices that serve younger professional populations. PT for sexual pain typically involves gentle manual therapy, pelvic floor relaxation training (most patients need down-regulation, not strengthening), and graduated desensitization work. Several Boston PTs specialize exclusively in sexual pain and pelvic pain.",
  },
  {
    q: 'How much does pelvic floor PT cost in Boston without insurance?',
    a: "Cash-pay pelvic floor PT in Boston typically runs $150–250 per session, with initial evaluations sometimes higher. Boston and Cambridge practices tend to be at the upper end of the national range due to the cost of living and the high concentration of specialized credentials. Many practices offer superbill receipts for out-of-network reimbursement if you have an OON PT benefit. Initial evaluation is typically recommended before committing to a full course of treatment.",
  },
]

export default async function BostonPelvicFloorPTPage() {
  const listings = await getListingsByCity('Boston', 'Massachusetts', 24).catch(() => [])

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
            <span className="text-stone-600">Boston, MA</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Boston, MA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Boston, MA
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Mass General Brigham and Beth Israel Deaconess Medical Center both have established
              women&apos;s health PT programs, and Harvard Medical School affiliation elevates practice
              standards throughout the Boston metro. Boston Marathon culture creates unique hip and
              pelvic floor demands for the city&apos;s large running community. The result is a dense
              network of highly credentialed pelvic floor PTs — many holding WCS or CAPP
              certifications — across Cambridge, Brookline, Somerville, Newton, and the South Shore.
            </p>
          </div>

          {/* Coverage area */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Boston', 'Cambridge', 'Brookline', 'Newton', 'Somerville', 'Quincy', 'Waltham', 'Watertown', 'Jamaica Plain', 'South End'].map((area) => (
              <span key={area} className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600">
                {area}
              </span>
            ))}
          </div>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal" />
                  {listings.length}+ pelvic floor PTs in Boston
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Boston, MA')}`}
                  className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/listings?location=${encodeURIComponent('Boston, MA')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Boston <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Boston coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Massachusetts" className="btn-secondary">
                Browse Massachusetts pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Boston
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

          {/* CTA */}
          <section className="mt-16 rounded-2xl bg-teal p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Are you a pelvic floor PT in Boston?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Get found by patients across Cambridge, Brookline, Newton, and Greater Boston who are
              searching for pelvic floor PT. Free listing included.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
              >
                Add Your Listing Free
              </Link>
              <Link
                href="/listings?state=Massachusetts"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Massachusetts PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-for-endometriosis" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT for Endometriosis →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Guide →</Link>
              <Link href="/guides/questions-to-ask-your-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Questions to Ask Your PT →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
