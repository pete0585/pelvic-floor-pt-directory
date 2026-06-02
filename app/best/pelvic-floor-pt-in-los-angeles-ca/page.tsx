import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Los Angeles, CA | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Los Angeles. Browse verified specialists in West LA, Santa Monica, Silver Lake, the South Bay, and surrounding areas.',
}

const FAQ = [
  { q: 'How do I find the best pelvic floor PT in Los Angeles?', a: 'Look for a DPT with CAPP or WCS certification and experience treating your specific condition. LA has a large concentration of specialized pelvic floor PTs — many are cash-pay practices that offer deep, 60-minute sessions. Read bios carefully to find someone whose experience matches what you are dealing with.' },
  { q: 'What does pelvic floor PT cost in Los Angeles?', a: 'Most cash-pay pelvic floor PT practices in Los Angeles charge $180-320 per session. In-network sessions with Anthem Blue Cross, Blue Shield of California, or Aetna typically cost $40-120 after your deductible. Many practices offer sliding scale or reduced rates for financial hardship.' },
  { q: 'Are there pelvic floor PTs in LA who specialize in postpartum care?', a: 'Yes. LA has a strong postpartum specialist community, particularly in neighborhoods with high concentrations of young families — West Hollywood, Silver Lake, Echo Park, the South Bay, and the Westside. Many practices also offer home visits or telehealth for early postpartum patients.' },
]

export default async function BestLAPage() {
  const listings = await getListingsByCity('Los Angeles', 'California', 9).catch(() => [])

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
            <Link href="/pelvic-floor-pt/los-angeles-ca" className="hover:text-teal transition-colors">Los Angeles, CA</Link>
            <span>/</span>
            <span className="text-stone-600">Best Of</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Los Angeles, CA</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Best Pelvic Floor Physical Therapists in Los Angeles, CA
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Los Angeles has one of the country&apos;s largest concentrations of specialized pelvic
              floor PTs. The city&apos;s fitness-forward culture and large postpartum community have
              driven strong demand for high-quality pelvic floor care across every neighborhood.
              Many LA pelvic PTs hold CAPP or WCS credentials and have deep specialty expertise.
            </p>
          </div>

          {/* What makes a great pelvic PT */}
          <section className="mb-10 bg-cream-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-stone-700 mb-4">
              What to look for in a Los Angeles pelvic floor PT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🎓', title: 'Certification', desc: 'CAPP, WCS, or BCB-PMD credential signals post-graduate pelvic floor training beyond the base DPT.' },
                { icon: '📍', title: 'Specialty focus', desc: 'Look for a PT whose listed specialties match your condition — postpartum, incontinence, prolapse, pelvic pain.' },
                { icon: '📅', title: 'Availability', desc: 'Many LA pelvic PTs have waitlists. Telehealth options can bridge the gap while you wait for your preferred provider.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                  <span className="text-2xl">{icon}</span>
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
                  <Star className="h-5 w-5 text-teal" />
                  Pelvic floor PTs in Los Angeles
                </h2>
                <Link
                  href="/pelvic-floor-pt/los-angeles-ca"
                  className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400"
                >
                  View all LA providers <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/pelvic-floor-pt/los-angeles-ca" className="btn-primary">
                  See all pelvic floor PTs in Los Angeles <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Browse all pelvic floor PTs near Los Angeles.
              </p>
              <Link href="/listings?location=Los+Angeles%2C+CA" className="btn-secondary">
                Search Los Angeles
              </Link>
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
        </div>
      </div>
    </>
  )
}
