import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Colorado Springs, CO | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Colorado Springs, CO. Treating incontinence, pelvic pain, postpartum recovery, and prolapse.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/colorado-springs-co' },
}

export const revalidate = 86400

const FAQ = [
    { q: 'Are there pelvic floor PTs in Colorado Springs?', a: "Yes. Colorado Springs has a solid pelvic floor PT community serving downtown, Briargate, the Black Forest area, and Fountain. UCHealth Pikes Peak and Penrose-St. Francis Health Services (CommonSpirit Health) both have PT departments. Several private pelvic floor PT practices have grown to serve the military family community around Fort Carson and Peterson. Telehealth is practical for patients in Woodland Park, Monument, and Castle Rock who lack local specialists." },
  { q: 'Does the military population affect pelvic floor PT in Colorado Springs?', a: "Significantly. Fort Carson, the Air Force Academy, and Peterson and Schriever SFBs create a large, young military family demographic with high postpartum care needs, frequent moves disrupting provider relationships, and unique physical demands. Many Colorado Springs pelvic floor PTs have experience with high-activity postpartum return-to-duty programs, treating women who need to pass Army/Air Force physical fitness tests after childbirth." },
  { q: 'Can I see a pelvic floor PT in Colorado Springs without a referral?', a: "Colorado has direct access PT laws — you can see a licensed PT without a physician referral. TRICARE (for military families) may require a referral from your primary care manager at the military treatment facility before seeing a civilian pelvic floor PT. Confirm your TRICARE plan\'s referral requirements, especially if you\'re enrolled in TRICARE Prime rather than TRICARE Select." },
  { q: 'How much does pelvic floor PT cost in Colorado Springs?', a: "Out-of-pocket rates in Colorado Springs run $100 to $175 per session — comparable to Denver and more affordable than Boulder. Most Colorado Springs PTs accept Anthem, UnitedHealthcare, Cigna, and TRICARE. TRICARE Select typically covers out-of-network pelvic floor PT at 80/20 after deductible with a referral. TRICARE Prime requires referral from your military PCP and covers in-network civilian PT at lower or no cost." }
]

export default async function ColoradoSpringsPelvicFloorPTPage() {
  const listings = await getListingsByCity('Colorado Springs', 'Colorado', 24).catch(() => [])

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
            <span className="text-stone-600">Colorado Springs, CO</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Colorado Springs, CO</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Find a Pelvic Floor PT in Colorado Springs, CO
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Colorado Springs has a uniquely large military population connected to Fort Carson, Peterson Space Force Base, Schriever Space Force Base, and the Air Force Academy. The city's pelvic floor PT community has extensive experience with military women's health needs, high-altitude athletic performance, and the postpartum care demands of a young military family demographic.
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
                  Pelvic Floor PTs in Colorado Springs, CO
                </h2>
                <Link href="/listings?state=CO" className="text-sm text-teal font-semibold hover:opacity-80 flex items-center gap-1">
                  See all Colorado PTs <ArrowRight className="h-4 w-4" />
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
              <p className="text-stone-500 mb-4">Browse all pelvic floor PTs in Colorado.</p>
              <Link href="/listings?state=CO" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Colorado PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PT in Colorado Springs: Common Questions</h2>
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
              <Link href="/listings?state=CO" className="text-sm text-teal hover:opacity-80 font-medium">All Colorado Pelvic PTs →</Link>
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
