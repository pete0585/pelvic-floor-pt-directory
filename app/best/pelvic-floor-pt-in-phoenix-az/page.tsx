import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Phoenix, AZ | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Phoenix, Arizona. Browse verified specialists in Phoenix, Scottsdale, Tempe, Mesa, Chandler, and the East Valley.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-phoenix-az' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'How much does pelvic floor PT cost in Phoenix?',
    a: "Cash-pay pelvic floor PT in Phoenix typically runs $100-220 per session — more affordable than Los Angeles or New York but rising as Phoenix has grown. Most major Arizona insurers — Blue Cross Blue Shield of Arizona, Aetna, UnitedHealthcare, Cigna, Banner Health Plan, and AHCCCS (Arizona Medicaid) — cover pelvic floor PT when deemed medically necessary. Use the insurance filter to find in-network providers.",
  },
  {
    q: 'Are there pelvic floor PTs in Scottsdale or Mesa?',
    a: "Yes. Phoenix metro pelvic floor PTs are spread throughout the region — Scottsdale, Tempe, Mesa, Chandler, Gilbert, and Peoria all have practices. Scottsdale in particular has a concentration of women's health and pelvic specialists aligned with the area's active, health-conscious population. Many East Valley practices serve both Scottsdale and Mesa/Chandler patients.",
  },
  {
    q: 'Is there military-aligned pelvic floor PT in Phoenix?',
    a: "Yes. The Phoenix metro has significant military and veteran populations through Luke AFB and the large veteran community in the West Valley. Several pelvic floor PTs in the area are experienced with postpartum care for military families, post-deployment pelvic pain, and TRICARE billing. Use the insurance filter to find TRICARE-participating providers.",
  },
]

export default async function BestPhoenixPelvicPage() {
  const listings = await getListingsByCity('Phoenix', 'Arizona', 9).catch(() => [])

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Directory</Link>
            <span>/</span>
            <Link href="/pelvic-floor-pt/arizona" className="hover:text-teal transition-colors">Arizona</Link>
            <span>/</span>
            <span className="text-stone-600">Phoenix</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Phoenix, AZ</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in Phoenix, AZ
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Phoenix and the greater East Valley have a growing community of pelvic floor PTs serving
              one of America&apos;s fastest-growing metro areas. Whether you delivered at Dignity Health
              St. Joseph&apos;s, Honor Health, or a birth center in Scottsdale, Phoenix area pelvic
              floor PTs specialize in postpartum recovery, pelvic pain, prolapse, and men&apos;s pelvic
              health across the full metro.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in Phoenix, AZ</h2>
                <Link href="/listings?city=Phoenix&state=AZ" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border p-12 text-center mb-12">
              <p className="text-stone-500 mb-4">Search pelvic floor PTs in Phoenix below.</p>
              <Link href="/listings?city=Phoenix&state=AZ" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Phoenix PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-5 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Phoenix Pelvic Floor PT FAQs</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Arizona Pelvic Floor PT Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/listings?state=AZ" className="text-sm text-teal hover:opacity-80 font-medium">All Arizona Pelvic Floor PTs →</Link>
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Coverage Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
