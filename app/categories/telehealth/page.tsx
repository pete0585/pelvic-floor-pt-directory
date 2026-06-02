import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Video, CheckCircle, Globe } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Telehealth Pelvic Floor PT — Online Pelvic Floor Therapy | PelvicFloorPTDirectory.com',
  description: 'Find pelvic floor physical therapists who offer telehealth sessions. Get expert pelvic PT care from home — available in all 50 states.',
}

const STEPS = [
  { step: '1', title: 'Video assessment', desc: 'Your PT observes your movement patterns, posture, and breathing mechanics via video call.' },
  { step: '2', title: 'Internal assessment guidance', desc: 'You perform your own internal assessment with guidance from your PT — designed to be safe and straightforward at home.' },
  { step: '3', title: 'Personalized exercise program', desc: 'You receive a custom home program with video demonstrations you can follow between sessions.' },
  { step: '4', title: 'Ongoing coaching', desc: 'Follow-up sessions adjust your program based on how you\'re responding and what you\'re experiencing.' },
]

const FAQ = [
  { q: 'Is telehealth pelvic floor PT as effective as in-person?', a: 'For many conditions — especially urinary incontinence, pelvic pain, postpartum recovery, and diastasis recti — telehealth PT is highly effective. Conditions that require hands-on internal manual therapy (certain types of prolapse, vaginismus, severe scar tissue) may benefit more from in-person care. Your PT can advise which format is best for your situation.' },
  { q: 'What do I need for a telehealth pelvic floor PT session?', a: 'A stable internet connection, a device with a camera (phone, tablet, or laptop), a private space where you can move around, and comfortable clothing you can move in. Your PT will let you know if any props or equipment are helpful before your first session.' },
  { q: 'Does insurance cover telehealth pelvic floor PT?', a: 'Many insurance plans that cover physical therapy also cover telehealth PT, especially since the expansion of telehealth benefits during 2020. Coverage varies significantly by plan and state. Check with your insurance and the specific provider before booking.' },
  { q: 'Can I see a telehealth pelvic floor PT in a different state?', a: 'Physical therapists must be licensed in the state where the patient is located at the time of the session. Many pelvic floor PTs hold multi-state licenses. When searching, look for providers who list your state as a telehealth coverage area.' },
]

export default async function TelehealthPage() {
  const { listings } = await getListings({ telehealth: true, pageSize: 24 }).catch(() => ({ listings: [], total: 0 }))

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
            <span className="text-stone-600">Telehealth</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <Video className="h-4 w-4" />
              <span>Online pelvic floor PT</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Telehealth Pelvic Floor Physical Therapy
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              You don&apos;t have to live near a pelvic floor specialist to work with one. Telehealth
              pelvic floor PT delivers expert care via video — effective for most conditions, available
              nationwide. Many patients prefer it for the privacy and flexibility it offers.
            </p>
          </div>

          {/* How telehealth works */}
          <section className="mb-12 bg-cream-100 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-stone-700 mb-6">How telehealth pelvic floor PT works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {STEPS.map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center">
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-700 mb-1">{title}</p>
                    <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Who benefits */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-stone-700 mb-5">Who benefits most from telehealth pelvic floor PT</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Women in rural areas without local pelvic PT access',
                'New moms who need care but can\'t easily leave the house',
                'Athletes managing exercise-induced leaking',
                'Anyone dealing with urinary incontinence or urgency',
                'Women managing diastasis recti postpartum',
                'Anyone who prefers the privacy of home-based sessions',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-4 bg-white rounded-xl border border-cream-300">
                  <CheckCircle className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-stone-500">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-teal" />
                  Pelvic floor PTs offering telehealth
                </h2>
                <Link
                  href="/listings?telehealth=true"
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
                <Link href="/listings?telehealth=true" className="btn-primary">
                  Browse all telehealth pelvic floor PTs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Telehealth providers are being added. Check back soon or browse all pelvic floor PTs.
              </p>
              <Link href="/listings" className="btn-secondary">Browse all pelvic floor PTs</Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Telehealth Pelvic Floor PT
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
