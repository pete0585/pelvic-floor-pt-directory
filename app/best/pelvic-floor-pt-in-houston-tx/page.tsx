import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Houston, TX | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Houston. Browse specialists near the Texas Medical Center, The Woodlands, Sugar Land, Katy, and greater Houston.',
}

const FAQ = [
  { q: 'Do Houston pelvic floor PTs accept TRICARE?', a: 'Several pelvic floor PTs in the Houston area accept TRICARE for active duty service members, veterans, and their dependents. Use the insurance filter in the directory to find providers who accept your specific TRICARE plan type.' },
  { q: 'What is the best area of Houston to find a pelvic floor PT?', a: 'The Texas Medical Center area (Medical Center district, Greenway Plaza, Montrose) has a high concentration of pelvic health specialists. The Woodlands, Sugar Land, and Katy also have strong provider availability for those in the suburbs. Many offer telehealth for patients in the greater Houston metro.' },
  { q: 'How much does pelvic floor PT cost in Houston?', a: 'Cash-pay pelvic floor PT in Houston typically runs $150-260 per session. In-network rates with Blue Cross Blue Shield of Texas, Aetna, or UnitedHealthcare range from $40-120 per session after your deductible. Many practices offer payment plans.' },
]

export default async function BestHoustonPage() {
  const listings = await getListingsByCity('Houston', 'Texas', 9).catch(() => [])

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
            <Link href="/pelvic-floor-pt/houston-tx" className="hover:text-teal transition-colors">Houston, TX</Link>
            <span>/</span>
            <span className="text-stone-600">Best Of</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Houston, TX</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Best Pelvic Floor Physical Therapists in Houston, TX
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Houston&apos;s pelvic floor PT community is well-developed, driven by the city&apos;s large
              medical infrastructure and growing young family population. The Texas Medical Center
              area has dense specialist coverage, with strong suburban options in The Woodlands,
              Sugar Land, Katy, and Memorial. Many Houston pelvic PTs accept major Texas insurance
              plans, including TRICARE for the military community.
            </p>
          </div>

          {/* Neighborhoods */}
          <section className="mb-10 bg-cream-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-stone-700 mb-4">
              Pelvic floor PT coverage across greater Houston
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Medical Center / TMC', 'The Woodlands', 'Sugar Land', 'Katy', 'Memorial / Spring Branch', 'Midtown / Montrose', 'Pearland', 'Clear Lake / NASA Area', 'Cypress / NW Houston'].map((area) => (
                <div key={area} className="px-3 py-2 bg-white rounded-lg text-xs font-medium text-stone-600 text-center">
                  {area}
                </div>
              ))}
            </div>
          </section>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Star className="h-5 w-5 text-teal" />
                  Pelvic floor PTs in Houston
                </h2>
                <Link
                  href="/pelvic-floor-pt/houston-tx"
                  className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400"
                >
                  View all Houston providers <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/pelvic-floor-pt/houston-tx" className="btn-primary">
                  See all pelvic floor PTs in Houston <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Browse all pelvic floor PTs near Houston.
              </p>
              <Link href="/listings?location=Houston%2C+TX" className="btn-secondary">
                Search Houston
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions
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
