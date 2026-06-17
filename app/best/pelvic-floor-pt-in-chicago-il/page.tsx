import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Chicago, IL | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Chicago, Illinois. Verified specialists in the Loop, North Side, Oak Park, Evanston, and the Chicago suburbs.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/best/pelvic-floor-pt-in-chicago-il' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'Are there pelvic floor PTs near Chicago suburbs like Evanston or Oak Park?',
    a: "Yes. The Chicago metro has good pelvic floor PT coverage in the immediate suburbs — Evanston, Oak Park, Naperville, Schaumburg, and the North Shore all have dedicated pelvic health clinics. Many Chicago PTs also offer telehealth for Illinois patients who prefer virtual follow-ups.",
  },
  {
    q: 'What does pelvic floor PT cost in Chicago?',
    a: "Cash-pay sessions in Chicago typically run $130-250 per session. In-network sessions with BCBS Illinois, Aetna, or UnitedHealthcare range from $30-80 with insurance. Illinois Medicaid covers physical therapy services, though specialized pelvic floor practices may have limited Medicaid availability — call ahead to confirm.",
  },
  {
    q: 'Do Chicago pelvic floor PTs work with postpartum patients?',
    a: "Yes. Postpartum recovery is one of the most common reasons women seek pelvic floor PT, and Chicago has many PTs who specialize in this phase — diastasis recti, C-section scar mobilization, pelvic floor weakness, and return-to-exercise guidance. Many offer early postpartum scheduling (6-8 weeks post-birth).",
  },
]

export default async function BestChicagoPelvicPage() {
  const listings = await getListingsByCity('Chicago', 'Illinois', 9).catch(() => [])

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
            <span className="text-stone-600">Chicago, IL</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Chicago, IL</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Best Pelvic Floor Physical Therapists in Chicago, IL
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Chicago has a well-developed pelvic floor PT community, with specialized clinics
              throughout the city and suburbs. From postpartum recovery to pelvic pain, prolapse,
              and pre/post-surgical care, Chicago pelvic floor PTs at institutions like Northwestern
              Medicine, Rush, and independent specialized practices provide evidence-based care
              across the full spectrum of pelvic health conditions.
            </p>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PTs in Chicago</h2>
                <Link href="/listings?city=Chicago&state=IL" className="flex items-center gap-1 text-sm text-teal font-semibold hover:opacity-80">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing: any) => <ListingCard key={listing.id} listing={listing} />)}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-10 text-center mb-12">
              <p className="text-stone-500 mb-4">New listings added regularly — search Chicago pelvic floor PTs now.</p>
              <Link href="/listings?city=Chicago&state=IL" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">
                Search Chicago PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold text-stone-800">Chicago Pelvic Floor PT: Common Questions</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-wrap gap-3 text-sm">
            <Link href="/listings?state=IL" className="text-teal hover:opacity-80 font-medium">All Illinois Pelvic Floor PTs →</Link>
            <Link href="/best/pelvic-floor-pt-in-denver-co" className="text-teal hover:opacity-80 font-medium">PTs in Denver →</Link>
            <Link href="/guides/postpartum-pelvic-floor-pt" className="text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
