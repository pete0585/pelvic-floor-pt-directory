import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Seattle, WA | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Seattle, Bellevue, Kirkland, Redmond, Bothell, and Renton. Browse by condition, insurance, and telehealth availability.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/seattle-wa' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Are there pelvic floor PTs on the Eastside — Bellevue, Kirkland, and Redmond?',
    a: "Yes. Multiple pelvic floor PT clinics serve the Eastside tech corridor, with providers in Bellevue, Kirkland, Redmond, and Bothell. Many offer extended hours to accommodate tech industry schedules. Telehealth is also widely available for Eastside patients who prefer virtual visits for follow-up appointments.",
  },
  {
    q: 'Does Washington state insurance cover pelvic floor PT?',
    a: "Premera Blue Cross, Regence BlueShield, and Kaiser Permanente Washington — the dominant Washington state insurers — typically cover pelvic floor PT as part of general PT benefits with a referral. Providence Health Plan and Molina Washington also provide coverage. Preauthorization may be required for extended treatment beyond the initial visits. Contact your plan directly to confirm your PT benefit and required referral process.",
  },
  {
    q: 'Can I see a pelvic floor PT for prolapse in Seattle?',
    a: "Yes. Pelvic organ prolapse is one of the most common reasons women seek pelvic floor PT in Seattle. Conservative PT management — including pelvic floor coordination training, load management, and lifestyle modification — is often highly effective for stages 1 and 2 prolapse, and can reduce symptoms in more advanced cases. Many Seattle-area PTs have extensive prolapse experience and work in conjunction with urogynecologists at UW Medicine and Swedish.",
  },
  {
    q: 'Is there pelvic floor PT for men in Seattle?',
    a: "Yes. Male pelvic floor PT is available across the Seattle area, most commonly for post-prostatectomy urinary rehabilitation, pelvic pain, interstitial cystitis, and chronic prostatitis. Several Seattle-area PTs specifically list male pelvic floor conditions as a specialty. Post-prostatectomy PT has strong evidence for reducing the duration of urinary incontinence after surgery.",
  },
]

export default async function SeattlePelvicFloorPTPage() {
  const listings = await getListingsByCity('Seattle', 'Washington', 24).catch(() => [])

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
            <span className="text-stone-600">Seattle, WA</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Seattle, WA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Seattle, WA
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              UW Medicine and Swedish Medical Group have strong pelvic health PT programs serving
              Seattle and the greater metro. The city&apos;s tech workforce — sitting for long hours
              at Amazon and Microsoft — brings high rates of hip and pelvic dysfunction alongside
              traditional postpartum and incontinence referrals. Seattle has a strong postpartum care
              culture, with many midwives and OBs routinely referring new mothers for pelvic floor PT.
            </p>
          </div>

          {/* Coverage area */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Seattle', 'Bellevue', 'Kirkland', 'Redmond', 'Bothell', 'Renton', 'Mercer Island', 'Bainbridge Island', 'Issaquah'].map((area) => (
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
                  {listings.length}+ pelvic floor PTs in Seattle
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Seattle, WA')}`}
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
                  href={`/listings?location=${encodeURIComponent('Seattle, WA')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Seattle <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Seattle coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Washington" className="btn-secondary">
                Browse Washington pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Seattle
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
              Are you a pelvic floor PT in Seattle?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Get found by patients in Seattle, Bellevue, Kirkland, and Renton who are actively
              searching for pelvic floor PT. Free listing included.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
              >
                Add Your Listing Free
              </Link>
              <Link
                href="/listings?state=Washington"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Washington PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/men-and-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Men and Pelvic Floor PT →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT Insurance Guide →</Link>
              <Link href="/guides/questions-to-ask-your-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Questions to Ask Your PT →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
