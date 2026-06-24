import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in San Diego, CA | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in San Diego, California. Browse verified specialists in San Diego, La Jolla, Chula Vista, Oceanside, and surrounding communities.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-san-diego-ca' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'How much does pelvic floor PT cost in San Diego?',
    a: "Cash-pay pelvic floor PT in San Diego runs $150-300 per session, in line with California's elevated healthcare costs. California state law requires insurers to cover physical therapy, and California Medicaid (Medi-Cal) covers pelvic floor PT for eligible beneficiaries. Major San Diego insurers — Kaiser Permanente, Sharp, Scripps, Blue Shield of California, and Anthem BCBS — typically cover pelvic floor PT when medically indicated. Ask about the superbill option with out-of-network providers.",
  },
  {
    q: 'Does San Diego have pelvic floor PTs who treat military families?',
    a: "Yes. San Diego is one of the largest military communities in the US — Naval Base San Diego, Camp Pendleton, Miramar MCAS, and Naval Hospital Camp Pendleton all contribute to a large active duty and veteran population. Several San Diego pelvic floor PTs are experienced with TRICARE billing and the specific needs of military families — postpartum recovery during deployment, combat-related pelvic trauma, and the high physical demands of military service.",
  },
  {
    q: 'Are there pelvic floor PTs in La Jolla or Encinitas?',
    a: "Yes. San Diego's North County — La Jolla, Encinitas, Carlsbad, Oceanside, and Del Mar — has a strong concentration of pelvic floor PTs reflecting the area's health-conscious, active population. Encinitas and Carlsbad in particular have multiple dedicated pelvic health practices. South County (Chula Vista, National City) and East County (El Cajon, Santee) also have pelvic floor PT options.",
  },
]

export default async function BestSanDiegoPelvicPage() {
  const listings = await getListingsByCity('San Diego', 'California', 9).catch(() => [])

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
            <Link href="/pelvic-floor-pt/california" className="hover:text-teal transition-colors">California</Link>
            <span>/</span>
            <span className="text-stone-600">San Diego</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">San Diego, CA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in San Diego, CA
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              San Diego combines one of the largest military communities in the country with a deeply
              health-conscious civilian population — both of which drive demand for specialized pelvic
              floor physical therapy. From postpartum recovery near Naval Hospital San Diego to pelvic
              pain clinics in La Jolla and Encinitas, the city has an established pelvic health PT
              community serving the full county.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in San Diego, CA</h2>
                <Link href="/listings?city=San Diego&state=CA" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
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
              <p className="text-stone-500 mb-4">Search pelvic floor PTs in San Diego below.</p>
              <Link href="/listings?city=San Diego&state=CA" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search San Diego PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-5 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">San Diego Pelvic Floor PT FAQs</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">California Pelvic Floor PT Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/listings?state=CA" className="text-sm text-teal hover:opacity-80 font-medium">All California Pelvic Floor PTs →</Link>
              <Link href="/best/pelvic-floor-pt-in-los-angeles-ca" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PTs in LA →</Link>
              <Link href="/guides/men-and-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Men and Pelvic Floor PT →</Link>
              <Link href="/categories/insurance-accepted" className="text-sm text-teal hover:opacity-80 font-medium">Insurance-Accepting PTs →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
