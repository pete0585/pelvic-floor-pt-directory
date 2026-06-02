import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Home, CheckCircle, Heart } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT Home Visits — In-Home Pelvic Floor Therapy | PelvicFloorPTDirectory.com',
  description: 'Find pelvic floor physical therapists who offer home visits. Get pelvic PT care in your own home — ideal for postpartum women and those with mobility limitations.',
}

const FAQ = [
  { q: 'What conditions are best suited for pelvic floor PT home visits?', a: 'Postpartum women in the early weeks after delivery are the primary beneficiaries of home-visit pelvic PT — leaving the house with a newborn for appointments is genuinely difficult. Home visits are also ideal for women with mobility limitations, severe pelvic organ prolapse, significant diastasis recti limiting mobility, or anyone recovering from pelvic surgery.' },
  { q: 'Is in-home pelvic floor PT as thorough as clinic-based care?', a: 'Yes. A qualified pelvic floor PT brings everything needed for a full assessment and treatment session to your home. The main limitation is heavy gym equipment for advanced rehabilitation — but for the majority of pelvic floor PT goals (postpartum recovery, incontinence, prolapse management), the home setting is fully adequate.' },
  { q: 'How do I prepare for a home pelvic floor PT visit?', a: 'Have a private room available with enough floor space for movement. A yoga mat or comfortable towel is helpful. Wear loose, comfortable clothing. Your PT will bring any specialized equipment needed. Let them know about parking or access details when you book.' },
  { q: 'Does insurance cover home visits for pelvic floor PT?', a: 'Coverage for home visits varies. Some insurance plans cover home health PT under specific criteria (homebound status, physician order). Many home-visit pelvic PTs operate as cash-pay practices with superbill options for out-of-network reimbursement. Always verify with both your insurance and the PT before booking.' },
]

export default async function HomeVisitsPage() {
  const { listings } = await getListings({ homeVisits: true, pageSize: 24 }).catch(() => ({ listings: [], total: 0 }))

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
            <span className="text-stone-600">Home Visits</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <Home className="h-4 w-4" />
              <span>In-home pelvic floor care</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Pelvic Floor Physical Therapists Who Make Home Visits
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Getting out of the house in the early postpartum weeks is hard enough. A pelvic floor
              PT who comes to you removes one more barrier to getting the care you need. Find
              providers who offer in-home sessions below.
            </p>
          </div>

          {/* Who it helps */}
          <section className="mb-12 bg-cream-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-stone-700 mb-5">
              Who benefits most from pelvic floor PT home visits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Postpartum women', desc: 'Getting to a clinic with a newborn and healing pelvic floor is genuinely difficult. Home visits meet you where you are.' },
                { title: 'After pelvic surgery', desc: 'Post-hysterectomy, prolapse repair, or colorectal surgery patients often benefit from home-based rehab in early recovery.' },
                { title: 'Mobility limitations', desc: 'Severe prolapse symptoms, significant pain with movement, or other physical limitations make clinic travel difficult.' },
                { title: 'Busy caregivers', desc: 'Parents of young children or primary caregivers who cannot leave responsibilities for clinic appointments.' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                  <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-700 text-sm mb-1">{title}</p>
                    <p className="text-xs text-stone-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-coral-400" />
                  Pelvic floor PTs offering home visits
                </h2>
                <Link
                  href="/listings?home_visits=true"
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
                <Link href="/listings?home_visits=true" className="btn-primary">
                  Browse all home-visit pelvic floor PTs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Home visit providers are being added. Browse all pelvic floor PTs in the meantime.
              </p>
              <Link href="/listings" className="btn-secondary">Browse all pelvic floor PTs</Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about In-Home Pelvic Floor PT
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
        </div>
      </div>
    </>
  )
}
