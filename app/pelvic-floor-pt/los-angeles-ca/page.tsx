import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Los Angeles, CA | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Los Angeles, CA. Treating incontinence, pelvic pain, postpartum recovery, and prolapse.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/los-angeles-ca' },
}

export const revalidate = 86400

const FAQ = [
    { q: 'How do I find a pelvic floor PT in Los Angeles?', a: "Use this directory to find pelvic floor PTs in LA, Santa Monica, Beverly Hills, Silver Lake, Los Feliz, Culver City, Pasadena, the San Fernando Valley, and Long Beach. Los Angeles has pelvic floor PTs in virtually every neighborhood. Cedars-Sinai Women\'s Pelvic Health program and UCLA Health\'s pelvic floor PT services are the major academic options. Private practice pelvic floor PTs in West LA and the Westside typically have shorter waits for new patients." },
  { q: 'Can I see a pelvic floor PT in LA without a referral?', a: "California has direct access PT laws — you can see a licensed PT without a physician referral for 30 treatment days or 12 visits. Your insurance plan may still require prior authorization for coverage. Many LA pelvic floor PTs offer cash-pay options. California\'s Medi-Cal covers pelvic floor PT for eligible patients. Use the insurance filter in this directory to find in-network providers." },
  { q: 'Does insurance cover pelvic floor PT in California?', a: "Yes. California law (AB 1902, SB 855) and ACA mandates require most California health plans to cover women\'s preventive care including pelvic floor PT when medically indicated. Anthem Blue Cross of California, Blue Shield of California, Kaiser Permanente, Health Net, and Medi-Cal all cover PT services. Kaiser Permanente Southern California has pelvic floor PT programs at many SoCal locations. Authorization requirements vary significantly by plan." },
  { q: 'Is telehealth available for pelvic floor PT in Los Angeles?', a: "Yes, and it is especially practical given LA\'s traffic. Many LA pelvic floor PTs offer telehealth sessions for bladder retraining, home exercise programs, postpartum education, and diastasis recti management. Hands-on internal manual therapy requires in-person visits, but a significant portion of pelvic floor PT can be delivered via telehealth — useful for patients in the South Bay, East LA, or the San Gabriel Valley who want to limit commutes." }
]

export default async function LosAngelesPelvicFloorPTPage() {
  const listings = await getListingsByCity('Los Angeles', 'California', 24).catch(() => [])

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
            <span className="text-stone-600">Los Angeles, CA</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Los Angeles, CA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Find a Pelvic Floor PT in Los Angeles, CA
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Los Angeles has one of the country's most developed pelvic floor PT markets, reflecting the city's health-conscious culture, high awareness of postpartum recovery, and dense OB/GYN referral network. Cedars-Sinai, UCLA Health, and USC Keck all have women's health PT programs, alongside hundreds of private practice pelvic floor PTs spread across LA's many neighborhoods.
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
                  Pelvic Floor PTs in Los Angeles, CA
                </h2>
                <Link href="/listings?state=CA" className="text-sm text-teal font-semibold hover:opacity-80 flex items-center gap-1">
                  See all California PTs <ArrowRight className="h-4 w-4" />
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
              <p className="text-stone-500 mb-4">Browse all pelvic floor PTs in California.</p>
              <Link href="/listings?state=CA" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search California PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PT in Los Angeles: Common Questions</h2>
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
              <Link href="/listings?state=CA" className="text-sm text-teal hover:opacity-80 font-medium">All California Pelvic PTs →</Link>
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
