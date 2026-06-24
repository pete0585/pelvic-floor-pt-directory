import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Austin, TX | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Austin, Texas. Browse verified specialists in Central Austin, South Austin, the Domain, and surrounding communities.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-austin-tx' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'How much does pelvic floor PT cost in Austin?',
    a: "Cash-pay pelvic floor PT in Austin typically runs $120-250 per session — lower than major coastal cities but on the rise as Austin's cost of living has increased. In-network sessions with major Texas insurers (Blue Cross Blue Shield of Texas, Aetna, UnitedHealthcare, Cigna, Texas Medicaid) typically run $20-80 after deductible. Many Austin pelvic floor PTs are in-network with major plans — ask when booking.",
  },
  {
    q: 'Are there pelvic floor PTs near South Congress or the Domain?',
    a: "Yes. Austin pelvic floor PTs are distributed across the city — you'll find practices in Central Austin, South Austin (South Congress, Travis Heights), North Austin (the Domain, Arboretum), Round Rock, Cedar Park, and Bee Cave. Austin's growth has brought more pelvic health clinics to the city, making it easier to find a specialist close to home or work.",
  },
  {
    q: 'Do Austin pelvic floor PTs see men?',
    a: "Yes. Austin has pelvic floor PTs who work with men — prostatectomy recovery, chronic pelvic pain syndrome, sexual dysfunction, and pelvic floor dysfunction after sports injury. Awareness of men's pelvic health has grown significantly in Austin alongside the city's fitness culture. Search the directory and look for PTs who list men's pelvic health or post-surgical pelvic rehabilitation as specialty areas.",
  },
]

export default async function BestAustinPelvicPage() {
  const listings = await getListingsByCity('Austin', 'Texas', 9).catch(() => [])

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
            <Link href="/pelvic-floor-pt/texas" className="hover:text-teal transition-colors">Texas</Link>
            <span>/</span>
            <span className="text-stone-600">Austin</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Austin, TX</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in Austin, TX
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Austin&apos;s booming population and strong fitness culture have driven significant growth
              in pelvic floor PT availability across the metro. From postpartum recovery after delivering
              at St. David&apos;s or Seton to pelvic pain management and men&apos;s pelvic health, Austin
              now has a robust community of pelvic floor PTs serving the full city and surrounding suburbs.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in Austin, TX</h2>
                <Link href="/listings?city=Austin&state=TX" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
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
              <p className="text-stone-500 mb-4">Search pelvic floor PTs in Austin below.</p>
              <Link href="/listings?city=Austin&state=TX" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Austin PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-5 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Austin Pelvic Floor PT FAQs</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Texas Pelvic Floor PT Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/listings?state=TX" className="text-sm text-teal hover:opacity-80 font-medium">All Texas Pelvic Floor PTs →</Link>
              <Link href="/best/pelvic-floor-pt-in-houston-tx" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PTs in Houston →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Coverage Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
