import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Chicago, IL | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Chicago, IL. Treating incontinence, pelvic pain, postpartum recovery, and prolapse.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/chicago-il' },
}

export const revalidate = 86400

const FAQ = [
    { q: 'How do I find a pelvic floor PT in Chicago?', a: "Use this directory to find pelvic floor PTs in Chicago and surrounding neighborhoods — Lakeview, Lincoln Park, Wicker Park, Bucktown, Hyde Park, Rogers Park, and more. Northwestern Memorial Hospital, Rush University Medical Center, and University of Chicago Medicine (Ingalls Memorial and main campus) all have pelvic floor PT programs. Chicago\'s El train system makes many neighborhood-based pelvic floor PT practices accessible without a car." },
  { q: 'Can I see a pelvic floor PT in Chicago without a referral?', a: "Illinois has direct access PT laws — you can see a licensed PT for up to 10 treatment days without a physician referral. After 10 days, most Illinois PTs require a physician referral for continued treatment. Your insurance may require a referral or prior authorization regardless. Many Chicago pelvic floor PTs offer cash-pay options with no referral required." },
  { q: 'Does insurance cover pelvic floor PT in Chicago?', a: "Most major Illinois insurance plans — Blue Cross Blue Shield of Illinois (the dominant insurer), UnitedHealthcare, Cigna, Aetna, Humana, and Medicaid Illinois — cover pelvic floor PT when medically indicated. Coverage authorization requirements and visit limits vary by plan. Northwestern Memorial and Rush are in-network with most major Illinois plans. Ask your PT for help navigating prior authorization if your plan requires it." },
  { q: 'What neighborhoods in Chicago have pelvic floor PT practices?', a: "Pelvic floor PT practices are concentrated in health-aware Chicago neighborhoods including Lakeview, Lincoln Park, Wicker Park, River North, Hyde Park, and Andersonville. The North Shore suburbs (Evanston, Wilmette, Glenview) also have strong pelvic floor PT options. Downtown Chicago (the Loop, River North, Streeterville) has several convenient practices accessible by CTA for working patients. Telehealth is available for non-hands-on sessions." }
]

export default async function ChicagoPelvicFloorPTPage() {
  const listings = await getListingsByCity('Chicago', 'Illinois', 24).catch(() => [])

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
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Find a Pelvic PT</Link>
            <span>/</span>
            <span className="text-stone-600">Chicago, IL</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Chicago, IL</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Find a Pelvic Floor PT in Chicago, IL
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Chicago has one of the most developed pelvic floor PT communities in the Midwest, anchored by Northwestern Memorial Hospital, Rush University Medical Center, and University of Chicago Medicine — all of which have women's health PT programs. Chicago's neighborhood-level private practice ecosystem allows patients in Lakeview, Lincoln Park, Wicker Park, and beyond to find pelvic floor PT without a long commute downtown.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-stone-500">
              <span>{listings.length > 0 ? `${listings.length}+` : '15+'} PTs listed</span>
              <span>·</span>
              <span>Postpartum care</span>
              <span>·</span>
              <span>Pelvic pain treatment</span>
              <span>·</span>
              <span>Incontinence therapy</span>
            </div>
          </div>

          {listings.length > 0 ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-stone-800">
                  Pelvic Floor PTs in Chicago, IL
                </h2>
                <Link href="/listings?state=IL" className="text-sm text-teal font-semibold hover:opacity-80 flex items-center gap-1">
                  See all Illinois PTs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border p-12 text-center mb-12">
              <p className="text-stone-500 mb-4">Browse all pelvic floor PTs in Illinois.</p>
              <Link href="/listings?state=IL" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Illinois PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PT in Chicago: Common Questions</h2>
            {FAQ.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Resources</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/listings?state=IL" className="text-sm text-teal hover:opacity-80 font-medium">All Illinois Pelvic PTs →</Link>
              <Link href="/guides/pelvic-floor-pt-cost" className="text-sm text-teal hover:opacity-80 font-medium">How Much Does Pelvic Floor PT Cost? →</Link>
              <Link href="/guides/pelvic-floor-pt-for-pelvic-pain" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT for Pelvic Pain →</Link>
              <Link href="/listings" className="text-sm text-teal hover:opacity-80 font-medium">Browse All Pelvic Floor PTs →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
