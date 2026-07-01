import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor PT in Philadelphia, PA | Pelvic Floor Directory',
  description:
    'Find pelvic floor physical therapists in Philadelphia, PA. Penn Medicine, Jefferson Health, and CHOP drive strong demand for pelvic floor PT across the Philadelphia metro.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/pelvic-floor-pt/philadelphia-pa' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Are there pelvic floor PTs in Philadelphia affiliated with Penn Medicine or Jefferson Health?',
    a: "Yes. Both Penn Medicine and Thomas Jefferson University Hospital have women's health and pelvic floor PT programs within their hospital systems. However, these hospital-based programs often have longer wait times and may require physician referrals. Many Philadelphia patients prefer private pelvic floor PT clinics for faster access, more session time, and specialized postpartum or pelvic pain care outside the hospital system.",
  },
  {
    q: 'Does Pennsylvania have direct access to physical therapy?',
    a: "Pennsylvania allows direct access to physical therapy — you can see a licensed PT without a physician referral for up to 30 days of treatment. After 30 days, a referral or prescription may be required depending on your insurance plan. If you're paying out of pocket, a referral is never required. Many Philadelphia-area pelvic floor PTs can help you navigate insurance requirements at your initial evaluation.",
  },
  {
    q: 'Is pelvic floor PT available for pediatric patients in Philadelphia?',
    a: "Yes. Children's Hospital of Philadelphia (CHOP) is one of the leading pediatric healthcare institutions in the country and has helped drive awareness of pediatric pelvic floor PT in the region. Pediatric pelvic floor PT addresses conditions like childhood urinary incontinence, bedwetting (enuresis), constipation, and voiding dysfunction. Several private practice PTs in the Philadelphia area also specialize in pediatric pelvic floor conditions for older children and adolescents.",
  },
  {
    q: 'What does pelvic floor PT cost in Philadelphia?',
    a: "Cash-pay rates for pelvic floor PT in Philadelphia typically range from $150 to $250 per session, with initial evaluations often priced higher ($200-$300). Many Philadelphia pelvic floor PTs are out-of-network with insurance but will provide superbills for reimbursement. Philadelphia's large student population (Temple, Penn, Drexel, Jefferson) means some clinics offer student or sliding-scale pricing — ask when booking.",
  },
]

export default async function PhiladelphiaPelvicFloorPTPage() {
  const listings = await getListingsByCity('Philadelphia', 'Pennsylvania', 24).catch(() => [])

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
            <span className="text-stone-600">Philadelphia, PA</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Philadelphia, PA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in Philadelphia, PA
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Philadelphia&apos;s dense hospital ecosystem — Penn Medicine, Jefferson Health, Temple Health,
              and CHOP — provides strong clinical infrastructure for pelvic health, but private pelvic
              floor PT clinics are in high demand for patients seeking faster access and more specialized
              care. The region&apos;s large university population (Penn, Temple, Drexel, Jefferson) and
              diverse communities have created a growing network of pelvic floor specialists across the
              city and surrounding suburbs.
            </p>
          </div>

          {/* Coverage area tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Philadelphia', 'Center City', 'South Philly', 'Manayunk', 'Chestnut Hill', 'Cherry Hill NJ', 'Conshohocken', 'King of Prussia', 'Lansdowne'].map((area) => (
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
                  {listings.length}+ pelvic floor PTs in Philadelphia
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent('Philadelphia, PA')}`}
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
                  href={`/listings?location=${encodeURIComponent('Philadelphia, PA')}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in Philadelphia <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out Philadelphia coverage. More providers are added daily.
              </p>
              <Link href="/listings?state=Pennsylvania" className="btn-secondary">
                Browse Pennsylvania pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in Philadelphia
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
              Are you a pelvic floor PT in Philadelphia?
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
                href="/listings?state=Pennsylvania"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse Pennsylvania PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="pt-8 mt-10 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
              <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Postpartum Pelvic Floor PT →</Link>
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
