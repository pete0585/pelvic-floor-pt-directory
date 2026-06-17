import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Atlanta, GA | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Atlanta, Georgia. Verified specialists in Buckhead, Midtown, Decatur, Sandy Springs, and the greater Atlanta metro.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-atlanta-ga' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'Are there pelvic floor PTs in the Atlanta suburbs?',
    a: "Yes. The Atlanta metro has pelvic floor PT coverage well beyond the city core — Decatur, Sandy Springs, Alpharetta, Marietta, Roswell, and Johns Creek all have dedicated pelvic health practices. Many Atlanta-area PTs also serve clients in Gwinnett and Cobb County. If you're outside the perimeter (OTP), you'll still find specialized pelvic floor care without driving into Buckhead or Midtown.",
  },
  {
    q: 'What does pelvic floor PT cost in Atlanta?',
    a: "Cash-pay pelvic floor PT in Atlanta typically runs $110–200 per session — lower than coastal city averages. Many Atlanta pelvic floor PTs accept Aetna, UnitedHealthcare, BCBS of Georgia, and Cigna. Georgia Medicaid covers PT services at participating providers, though specialized pelvic floor practices may have limited Medicaid slots. Call ahead to verify insurance participation and get a cost estimate before your first visit.",
  },
  {
    q: 'Do Atlanta pelvic floor PTs see patients postpartum?',
    a: "Yes — postpartum recovery is one of the most common reasons Atlanta women seek pelvic floor PT. The Atlanta area has a high birth rate and a growing network of birth professionals who refer to pelvic floor PT at the 6-week postpartum visit. Common postpartum concerns treated: diastasis recti, incontinence, pelvic pain, scar tissue from C-section or perineal tears, and return-to-running protocols.",
  },
]

export default async function BestAtlantaPelvicPage() {
  const listings = await getListingsByCity('Atlanta', 'Georgia', 9).catch(() => [])

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
            <span className="text-stone-600">Atlanta, GA</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Atlanta, GA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in Atlanta, GA
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Atlanta has a growing pelvic floor PT community spread across the metro&apos;s
              distinct neighborhoods and suburbs. From specialized women&apos;s health clinics in
              Buckhead and Midtown to pelvic health practices in Decatur and Sandy Springs, Atlanta
              pelvic floor PTs treat the full spectrum of conditions — postpartum recovery, pelvic
              pain, prolapse, incontinence, and pre- and post-surgical pelvic rehabilitation.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in Atlanta</h2>
                <Link href="/listings?city=Atlanta&state=GA" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing: any) => <ListingCard key={listing.id} listing={listing} />)}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-10 text-center mb-12">
              <p className="text-stone-500 mb-4">New listings added regularly — search Atlanta pelvic floor PTs now.</p>
              <Link href="/listings?city=Atlanta&state=GA" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">
                Search Atlanta PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold text-stone-800">Atlanta Pelvic Floor PT: Common Questions</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-wrap gap-3 text-sm">
            <Link href="/listings?state=GA" className="text-teal hover:opacity-80 font-medium">All Georgia Pelvic Floor PTs →</Link>
            <Link href="/best/pelvic-floor-pt-in-chicago-il" className="text-teal hover:opacity-80 font-medium">PTs in Chicago →</Link>
            <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
