import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Denver, CO | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Denver and the Front Range — Aurora, Lakewood, Westminster, Centennial, Englewood, and Littleton. Browse by condition, insurance, and telehealth.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/denver-co' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Are there pelvic floor PTs in Denver who work with athletes?',
    a: "Yes. Denver's fitness-forward culture — runners, climbers, skiers, CrossFit athletes — means several Denver-area pelvic floor PTs specialize in return-to-sport rehabilitation. If you deal with exercise-induced leaking, pelvic girdle pain from endurance training, or post-pregnancy return to running, search for PTs who list 'sports' or 'athletes' as a specialty area.",
  },
  {
    q: 'Does insurance cover pelvic floor PT in Colorado?',
    a: "Most major Colorado insurers — Rocky Mountain Health Plans, Anthem BCBS Colorado, Cigna, Aetna, and UnitedHealthcare — cover pelvic floor PT with a referral, under general PT benefits. Colorado Medicaid (Health First Colorado) also covers PT services. Coverage for the specific number of visits varies by plan; check your plan's PT benefit and ask your clinic about prior authorization requirements.",
  },
  {
    q: 'How many sessions of pelvic floor PT will I need?',
    a: 'Most Denver-area pelvic floor PTs recommend 6–12 sessions as a starting point, with an initial evaluation (typically 45–60 minutes) followed by follow-up sessions of 45 minutes. The number of sessions varies based on your condition, severity, and how consistently you do home exercises. Postpartum patients and those with pelvic pain typically need more sessions than those with mild incontinence.',
  },
  {
    q: 'Can I see a pelvic floor PT without a referral in Colorado?',
    a: "Colorado has direct access physical therapy laws — you can see a licensed PT for up to 30 days without a physician referral. After 30 days, a referral may be required depending on your insurance plan. Many Denver-area pelvic floor PTs can see you directly and help you obtain insurance authorization. If you're paying cash, no referral is ever required.",
  },
]

export default async function DenverPelvicFloorPTPage() {
  const listings = await getListingsByCity('Denver', 'Colorado', 24).catch(() => [])

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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-stone-600">Denver, CO</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Denver, CO</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Denver, CO
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              UCHealth and CommonSpirit Health both have women&apos;s health PT programs throughout
              the Denver metro. Colorado&apos;s active population — runners, climbers, skiers, and
              CrossFit athletes — creates unique pelvic floor demands that many Denver PTs specialize
              in. High demand for postpartum PT in this young family-heavy metro has produced a strong
              network of specialists across Denver, Aurora, Lakewood, Centennial, and the western suburbs.
            </p>
          </div>

          {/* Coverage area tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Denver', 'Aurora', 'Lakewood', 'Westminster', 'Centennial', 'Englewood', 'Littleton', 'Arvada', 'Highlands Ranch'].map((area) => (
              <span key={area} className="px-3 py-1.5 bg-stone-100 rounded-full text-xs font-medium text-stone-600">
                {area}
              </span>
            ))}
          </div>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal" />
                  {listings.length}+ pelvic floor PTs in Denver
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Denver, CO')}`}
                  className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href={`/listings?location=${encodeURIComponent('Denver, CO')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Denver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Denver coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Colorado" className="btn-secondary">
                Browse Colorado pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Denver
            </h2>
            <div className="space-y-5 max-w-3xl">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="card p-6">
                  <h3 className="font-bold text-stone-700 mb-3">{q}</h3>
                  <p className="text-stone-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl bg-teal p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Are you a pelvic floor PT in Denver?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Get found by patients actively searching in your area. Free listing included — upgrade
              for featured placement and direct inquiry routing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
              >
                Add Your Listing Free
              </Link>
              <Link
                href="/listings?state=Colorado"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Colorado PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
              <Link href="/guides/kegels-vs-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Kegels vs. Pelvic Floor PT →</Link>
              <Link href="/guides/does-pelvic-floor-pt-hurt" className="text-sm text-teal hover:opacity-80 font-medium">Does Pelvic Floor PT Hurt? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
