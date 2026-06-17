import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in New York, NY | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in New York City. Browse verified specialists in Manhattan, Brooklyn, Queens, and the Tri-State area.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-new-york-ny' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'How much does pelvic floor PT cost in New York City?',
    a: "Cash-pay pelvic floor PT in NYC runs $175-375 per session — higher than national averages due to the city's overhead costs. In-network sessions with major insurers (Aetna, UnitedHealthcare, Cigna, Empire BCBS) typically run $30-80 with meeting your deductible. Many NYC pelvic floor PTs are out-of-network — ask for a superbill and submit to your insurance for partial reimbursement.",
  },
  {
    q: 'Are there pelvic floor PTs in Brooklyn or Queens?',
    a: "Yes. Pelvic floor PT has expanded across NYC's outer boroughs — Brooklyn (Williamsburg, Park Slope, DUMBO, Bay Ridge) and Queens (Astoria, Forest Hills) have dedicated pelvic health clinics. You don't need to travel to Manhattan for specialized care, though many Manhattan practices have shorter waitlists than you might expect.",
  },
  {
    q: 'Can men see pelvic floor PTs in New York City?',
    a: "Absolutely. NYC has some of the most specialized pelvic floor PTs in the country, including those who work specifically with men — prostatectomy recovery, chronic pelvic pain, sexual dysfunction, and post-prostate cancer pelvic floor rehabilitation. Search the directory and look for PTs who list 'men's pelvic health' as a specialty area.",
  },
]

export default async function BestNewYorkPelvicPage() {
  const listings = await getListingsByCity('New York', 'New York', 9).catch(() => [])

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
            <span className="text-stone-600">New York City</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">New York, NY</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in New York City
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              New York City has one of the most developed pelvic floor PT communities in the country.
              With a dense population of women&apos;s health providers, birth professionals, and
              specialized PTs trained at institutions like NYU Langone, Columbia, and NYP/Weill Cornell,
              NYC patients have access to cutting-edge pelvic floor care — from postpartum recovery to
              pelvic pain, prolapse, and male pelvic health — across all five boroughs.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in NYC</h2>
                <Link href="/listings?city=New+York&state=NY" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
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
            <div className="bg-stone-50 rounded-2xl p-10 text-center mb-12">
              <p className="text-stone-500 mb-4">New listings added regularly — search NYC pelvic floor PTs now.</p>
              <Link href="/listings?city=New+York&state=NY" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">
                Search NYC PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold text-stone-800">NYC Pelvic Floor PT: Common Questions</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-wrap gap-3 text-sm">
            <Link href="/listings?state=NY" className="text-teal hover:opacity-80 font-medium">All New York Pelvic Floor PTs →</Link>
            <Link href="/best/pelvic-floor-pt-in-los-angeles-ca" className="text-teal hover:opacity-80 font-medium">PTs in Los Angeles →</Link>
            <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-teal hover:opacity-80 font-medium">What Is Pelvic Floor PT? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
