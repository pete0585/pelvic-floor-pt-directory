import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Tucson, AZ | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Tucson, AZ. Treating incontinence, pelvic pain, postpartum recovery, and prolapse.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/tucson-az' },
}

export const revalidate = 86400

const FAQ = [
    { q: 'Are there pelvic floor PTs in Tucson, AZ?', a: "Yes. Tucson has a developing pelvic floor PT community with providers across the metro — north Tucson, midtown, the foothills, and near the University of Arizona campus. Banner University Medical Center Tucson has a women\'s health PT program. Several private practices in Tucson specialize in pelvic floor rehabilitation for postpartum women, those with pelvic pain, and older adults managing incontinence and prolapse." },
  { q: 'Can I see a pelvic floor PT in Tucson without a referral?', a: "Arizona has direct access PT laws — you can see a licensed PT without a physician referral. Your insurance plan may still require a referral or prior authorization. Many Tucson pelvic floor PTs accept cash-pay patients. AHCCCS (Arizona Medicaid) covers PT with appropriate authorization. The University of Arizona Faculty Practice also offers PT services through the UA Health Sciences clinic." },
  { q: 'How much does pelvic floor PT cost in Tucson?', a: "Out-of-pocket rates in Tucson typically run $90 to $160 per session — lower than Phoenix and much lower than coastal cities. Initial evaluations run $120 to $180. Many Tucson pelvic floor PTs accept BlueCross BlueShield of Arizona, United, Aetna, and AHCCCS (Arizona Medicaid). Ask your PT about package rates if you need multiple sessions." },
  { q: 'What pelvic conditions can a Tucson PT treat?', a: "Tucson pelvic floor PTs treat postpartum pelvic floor dysfunction, urinary and bowel incontinence, pelvic organ prolapse, chronic pelvic pain, vulvodynia, vaginismus, and diastasis recti. The University of Arizona\'s older adult and veteran populations also create demand for men\'s pelvic floor PT — post-prostatectomy incontinence and chronic prostatitis/CPPS. Several Tucson PTs also offer prenatal pelvic floor preparation." }
]

export default async function TucsonPelvicFloorPTPage() {
  const listings = await getListingsByCity('Tucson', 'Arizona', 24).catch(() => [])

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
            <span className="text-stone-600">Tucson, AZ</span>
          </nav>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 mb-10">
            <div className="flex items-center gap-2 text-teal-600 mb-3">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Tucson, AZ</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
              Find a Pelvic Floor PT in Tucson, AZ
            </h1>
            <p className="mt-3 text-stone-600 max-w-2xl leading-relaxed">
              Tucson has a growing women's health PT community anchored by Banner University Medical Center Tucson (University of Arizona Health Sciences) and a cluster of private-practice pelvic floor PTs serving the Tucson metro. The University of Arizona's medical school creates a well-educated patient population with high awareness of pelvic floor health.
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
                  Pelvic Floor PTs in Tucson, AZ
                </h2>
                <Link href="/listings?state=AZ" className="text-sm text-teal font-semibold hover:opacity-80 flex items-center gap-1">
                  See all Arizona PTs <ArrowRight className="h-4 w-4" />
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
              <p className="text-stone-500 mb-4">Browse all pelvic floor PTs in Arizona.</p>
              <Link href="/listings?state=AZ" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Search Arizona PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-semibold text-stone-800">Pelvic Floor PT in Tucson: Common Questions</h2>
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
              <Link href="/listings?state=AZ" className="text-sm text-teal hover:opacity-80 font-medium">All Arizona Pelvic PTs →</Link>
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
