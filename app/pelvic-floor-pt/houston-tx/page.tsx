import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Houston, TX | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Houston, TX. The Texas Medical Center drives demand for specialized pelvic PT across Houston, Sugar Land, Katy, and The Woodlands.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/houston-tx' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Can I see a pelvic floor PT in Houston without a referral?',
    a: "Texas has direct access physical therapy laws — you can see a licensed PT without a physician referral. However, your insurance plan may still require a referral or prior authorization for coverage. Many Houston pelvic floor PTs accept cash-pay patients with no referral required. If you plan to use insurance, contact your insurer to confirm their referral requirements for pelvic floor PT specifically.",
  },
  {
    q: 'Is telehealth pelvic floor PT popular in Houston?',
    a: "Yes. Houston's sprawling suburban layout — Sugar Land, Katy, The Woodlands, Pearland, and Cypress are all significant distance from central Houston — makes telehealth pelvic floor PT a practical option for many patients. Telehealth PT is effective for bladder retraining, pelvic floor exercise programs, postpartum recovery education, and ongoing management of urinary incontinence. Conditions requiring hands-on internal manual therapy are best treated in person.",
  },
  {
    q: 'Does the Texas Medical Center have pelvic floor PT programs?',
    a: "Yes. Several major hospitals within the Texas Medical Center — including UTHealth Houston, Memorial Hermann, and Houston Methodist — have women's health or urogynecology PT programs. These hospital-based programs are well-resourced but typically require referrals and can have longer wait times. Houston's growing private practice pelvic floor PT community offers more flexible scheduling and specialized postpartum or pelvic pain care.",
  },
  {
    q: 'How much does pelvic floor PT cost in Houston?',
    a: "Out-of-pocket rates for pelvic floor PT in Houston typically range from $120 to $200 per session, which is generally lower than major coastal cities. Initial evaluations run $150 to $250. Many Houston pelvic floor PTs accept insurance under general PT benefits — coverage depends on your plan, the number of authorized visits, and whether your condition meets medical necessity criteria. Ask your PT about superbill options if they are out-of-network.",
  },
]

export default async function HoustonPelvicFloorPTPage() {
  const listings = await getListingsByCity('Houston', 'Texas', 24).catch(() => [])

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
            <span className="text-stone-600">Houston, TX</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Houston, TX</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Houston, TX
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Houston&apos;s Texas Medical Center — the world&apos;s largest medical complex — provides
              hospital-based pelvic PT programs, but private pelvic floor PT specialization is a
              rapidly growing area across the metro. Houston&apos;s large and diverse population includes
              significant Hispanic and Asian communities where culturally sensitive pelvic floor PT
              is increasingly available. The University of Texas Health Science Center supports PT
              education and training in the region, and Houston&apos;s extensive suburban sprawl
              across Sugar Land, Katy, and The Woodlands makes telehealth consultations an attractive
              option for many patients.
            </p>
          </div>

          {/* Coverage area tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Houston', 'Sugar Land', 'Katy', 'The Woodlands', 'Pearland', 'Cypress', 'Spring', 'Pasadena', 'Friendswood'].map((area) => (
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
                  {listings.length}+ pelvic floor PTs in Houston
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Houston, TX')}`}
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
                  href={`/listings?location=${encodeURIComponent('Houston, TX')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Houston <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Houston coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Texas" className="btn-secondary">
                Browse Texas pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Houston
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
              Are you a pelvic floor PT in Houston?
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
                href="/listings?state=Texas"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Texas PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
              <Link href="/categories/telehealth" className="text-sm text-teal hover:opacity-80 font-medium">Telehealth Pelvic Floor PT →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
