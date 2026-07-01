import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT for Men | Pelvic Floor Directory',
  description:
    'Men have a pelvic floor too. Find pelvic floor PTs who treat post-prostatectomy incontinence, CPPS, pelvic pain, and urinary dysfunction in men.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/categories/pelvic-floor-pt-for-men' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Do men need pelvic floor PT?',
    a: "Yes. Men have a pelvic floor — and pelvic floor dysfunction in men is significantly underdiagnosed. The male pelvic floor supports the bladder, bowel, and sexual function in the same way it does in women. Conditions like post-prostatectomy incontinence, chronic pelvic pain syndrome, urinary urgency, and pain with sitting all have a pelvic floor component that PT can directly address.",
  },
  {
    q: 'What is the most common reason men seek pelvic floor PT?',
    a: "Post-prostatectomy incontinence is the most common reason men are referred to pelvic floor PT. Between 60-80% of men experience urinary incontinence after prostate removal surgery. Pelvic floor PT — especially when started pre-operatively as prehabilitation and resumed immediately after catheter removal — significantly reduces the duration and severity of post-surgical incontinence.",
  },
  {
    q: 'Does pelvic floor PT for men involve internal assessment?',
    a: "Internal rectal assessment can be part of male pelvic floor PT and provides the most direct information about pelvic floor muscle function. It is always optional and requires explicit informed consent. Many conditions in men can be effectively treated with external techniques only. Your PT will discuss assessment options at your evaluation and will never proceed with internal work without your agreement.",
  },
  {
    q: 'How do I find a pelvic floor PT who treats men?',
    a: "Not all pelvic floor PTs treat male patients — many specialize in women's health only. When searching this directory, look for PTs who list men's pelvic health, post-prostatectomy care, CPPS, or male incontinence in their specialty areas. In smaller markets, ask about telehealth for education and home exercise components while you locate an in-person provider for manual therapy.",
  },
]

export default async function PelvicFloorPTForMenPage() {
  const { listings } = await getListings({ pageSize: 24 }).catch(() => ({ listings: [], total: 0 }))

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
            <span className="text-stone-600">Pelvic Floor PT for Men</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Pelvic Floor Physical Therapy for Men
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Men have a pelvic floor too — and pelvic floor dysfunction in men is significantly
              underdiagnosed and undertreated. The conditions that bring men to pelvic floor PT are
              real, common, and highly responsive to specialized physical therapy.
            </p>
          </div>

          {/* Conditions */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-stone-700 mb-5">Common reasons men seek pelvic floor PT</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  condition: 'Post-prostatectomy incontinence',
                  detail: '60-80% of men experience urinary incontinence after prostate removal. Pelvic floor PT — especially started pre-operatively — is the first-line treatment and significantly reduces recovery time.',
                },
                {
                  condition: 'Chronic pelvic pain syndrome (CPPS)',
                  detail: 'Also called chronic prostatitis. Hypertonic pelvic floor muscles create referred pain, urinary urgency, and perineal pressure that antibiotics do not resolve. PT focused on trigger point release is often more effective.',
                },
                {
                  condition: 'Urinary urgency and frequency',
                  detail: 'Overactive bladder symptoms in men that are not fully explained by prostate size often have a pelvic floor muscle component. Bladder retraining and pelvic floor downtraining reduce urgency without medication.',
                },
                {
                  condition: 'Erectile dysfunction (pelvic floor component)',
                  detail: 'The pelvic floor muscles play a direct role in erectile rigidity. In men with hypotonicity or nerve sensitivity — especially post-prostatectomy — targeted PT can improve function alongside medical treatment.',
                },
                {
                  condition: 'Pudendal neuralgia / pain with sitting',
                  detail: 'Chronic perineal pain, tailbone pain, or pain with sitting is often driven by pelvic floor muscle tension compressing the pudendal nerve. Manual therapy and postural retraining are effective.',
                },
                {
                  condition: 'Post-rectal surgery recovery',
                  detail: 'Men who have had rectal or colorectal surgery may develop pelvic floor dysfunction affecting continence and comfort. Pre- and post-operative PT improves recovery outcomes.',
                },
              ].map(({ condition, detail }) => (
                <div key={condition} className="bg-white border border-stone-200 rounded-xl p-5">
                  <h3 className="font-semibold text-stone-800 mb-2 text-sm">{condition}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important note */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-12">
            <p className="font-semibold text-teal-900 mb-2">Not every pelvic floor PT treats men</p>
            <p className="text-sm text-teal-800 leading-relaxed">
              Many pelvic floor PTs specialize exclusively in women&apos;s health. When using this
              directory, look for providers who specifically list men&apos;s pelvic health, post-prostatectomy
              care, CPPS, or male pelvic floor conditions in their specialty areas. Call ahead and
              confirm before booking.
            </p>
          </div>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700">
                  Pelvic floor PTs — search for men&apos;s health specialists
                </h2>
                <Link href="/listings" className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400">
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.slice(0, 9).map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/listings" className="btn-primary">
                  Browse all pelvic floor PTs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">Browse all pelvic floor PTs and filter by men&apos;s health specialization.</p>
              <Link href="/listings" className="btn-secondary">Browse the Directory</Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions
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

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/men-and-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Men and Pelvic Floor PT: Full Guide →</Link>
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-for-ic" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT for IC →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
