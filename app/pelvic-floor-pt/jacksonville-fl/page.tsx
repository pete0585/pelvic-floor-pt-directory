import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Jacksonville, FL | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Jacksonville, FL. Treating incontinence, pelvic pain, postpartum recovery, and prolapse.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/jacksonville-fl' },
}

export const revalidate = 86400

const FAQ = [
    { q: 'Can I see a pelvic floor PT in Jacksonville without a referral?', a: "Florida has direct access physical therapy laws — you can see a licensed PT without a physician referral for an initial evaluation. Your insurance plan may still require a referral or prior authorization for coverage. Many Jacksonville pelvic floor PTs accept cash-pay patients with no referral required. Naval Hospital Jacksonville serves military families through TRICARE; civilian community providers offer more scheduling flexibility." },
  { q: 'Does Jacksonville have pelvic floor PT for military women?', a: "Yes. Jacksonville\'s large naval community has created a strong pelvic floor PT resource base for military women — including postpartum care, return-to-duty after pregnancy, and care for the spouses of deployed service members. Naval Hospital Jacksonville has a women\'s health PT program. Several private pelvic floor PT practices near NAS Jacksonville and Mayport serve TRICARE patients and military families directly." },
  { q: 'How much does pelvic floor PT cost in Jacksonville?', a: "Out-of-pocket rates in Jacksonville typically range from $100 to $180 per session — lower than major coastal cities. Initial evaluations run $150 to $200. Most Jacksonville pelvic floor PTs accept Florida Blue, UnitedHealthcare, Aetna, Cigna, and Florida Medicaid. TRICARE covers pelvic floor PT for eligible military families. Ask your PT about cash-pay discounts if you are uninsured." },
  { q: 'What pelvic conditions can a Jacksonville PT treat?', a: "Jacksonville pelvic floor PTs commonly treat postpartum pelvic floor dysfunction, stress urinary incontinence (leaking with sneezing/coughing), urgency incontinence, pelvic organ prolapse, diastasis recti, chronic pelvic pain, vulvodynia, vaginismus, dyspareunia, and interstitial cystitis/bladder pain syndrome. Pre- and post-prostatectomy pelvic floor rehabilitation for men is also available at several Jacksonville practices." }
]

export default async function JacksonvillePelvicFloorPTPage() {
  const listings = await getListingsByCity('Jacksonville', 'Florida', 24).catch(() => [])

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
            <span className="text-stone-600">Jacksonville, FL</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Jacksonville, FL</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Find a Pelvic Floor PT in Jacksonville, FL
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Jacksonville is Florida's largest city by area and has a large military population centered on Naval Station Mayport and Naval Air Station Jacksonville. The city's pelvic floor PT community has significant experience with military women's health needs — including postpartum care for Navy and Marine Corps families — alongside the general Jacksonville community.
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
                  Pelvic Floor PTs in Jacksonville, FL
                </h2>
                <Link href="/listings?state=FL" className="text-sm text-teal font-semibold hover:opacity-80 flex items-center gap-1">
                  See all Florida PTs <ArrowRight className="h-4 w-4" />
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
              <p className="text-stone-500 mb-4">Browse all pelvic floor PTs in Florida.</p>
              <Link href="/listings?state=FL" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Florida PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PT in Jacksonville: Common Questions</h2>
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
              <Link href="/listings?state=FL" className="text-sm text-teal hover:opacity-80 font-medium">All Florida Pelvic PTs →</Link>
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
