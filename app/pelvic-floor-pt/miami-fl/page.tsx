import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Miami, FL | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Miami, FL. Florida direct access laws mean no referral needed. Browse specialists across Miami-Dade and Broward counties.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/miami-fl' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Do I need a referral for pelvic floor PT in Florida?',
    a: "No — Florida has direct access physical therapy laws, meaning you can see a licensed PT without a physician referral. You can book directly with a pelvic floor PT in Miami without first seeing your OB-GYN or primary care doctor. Insurance plans may still have their own referral requirements for coverage — check with your insurer — but for cash-pay patients, no referral is ever needed in Florida.",
  },
  {
    q: 'Is pelvic floor PT available in Spanish in Miami?',
    a: "Yes. Miami's large Latin American patient population has driven many Miami pelvic floor PTs to offer Spanish-language services. When searching for a pelvic floor PT in Miami, look for providers who note Spanish-language sessions or bilingual staff in their listing. Cultural awareness of pelvic floor health varies significantly across Latin American communities, and working with a culturally competent provider can improve outcomes and comfort.",
  },
  {
    q: 'What major hospital systems offer pelvic floor PT in Miami?',
    a: "Jackson Memorial Hospital (the University of Miami Health System flagship) and Baptist Health South Florida are the two largest hospital systems in Miami, and both have women's health PT programs within their networks. The University of Miami Miller School of Medicine also supports PT education in the region. Private pelvic floor PT clinics in Miami-Dade and Broward counties are increasingly common and often offer more appointment flexibility than hospital-based programs.",
  },
  {
    q: 'Are there pelvic floor PTs in Miami who work with international patients?',
    a: "Yes. Miami's medical tourism industry — particularly from South American and Caribbean patients — means some Miami pelvic floor PT clinics have experience working with international patients who may be seeking treatment alongside other medical procedures. These clinics are often familiar with coordinating care and providing documentation in multiple languages. If you are an international patient, ask about scheduling flexibility and session structure when booking.",
  },
]

export default async function MiamiPelvicFloorPTPage() {
  const listings = await getListingsByCity('Miami', 'Florida', 24).catch(() => [])

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
            <span className="text-stone-600">Miami, FL</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Miami, FL</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Miami, FL
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Florida&apos;s direct access PT laws make pelvic floor care easy to access in Miami — no
              physician referral required. Miami&apos;s large Latin American community has created growing
              demand for culturally competent and Spanish-language pelvic floor PT. Jackson Memorial
              and Baptist Health are the primary hospital systems, while private practice clinics
              across Miami-Dade and Broward counties offer more specialized postpartum, pelvic pain,
              and urogynecological PT programs.
            </p>
          </div>

          {/* Coverage area tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Miami', 'Coral Gables', 'Brickell', 'Coconut Grove', 'Doral', 'Hialeah', 'Fort Lauderdale', 'Hollywood FL', 'Aventura'].map((area) => (
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
                  {listings.length}+ pelvic floor PTs in Miami
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Miami, FL')}`}
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
                  href={`/listings?location=${encodeURIComponent('Miami, FL')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Miami <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Miami coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Florida" className="btn-secondary">
                Browse Florida pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Miami
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
              Are you a pelvic floor PT in Miami?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Get found by patients actively searching in your area. Free listing included — upgrade
              for featured placement and direct inquiry routing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
              >
                Add Your Listing Free
              </Link>
              <Link
                href="/listings?state=Florida"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Florida PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
