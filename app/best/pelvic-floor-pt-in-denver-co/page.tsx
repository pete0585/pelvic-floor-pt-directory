import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, MapPin } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Pelvic Floor Physical Therapists in Denver, CO | PelvicFloorPTDirectory.com',
  description: 'Find the best pelvic floor PTs in Denver and the Front Range. Browse verified specialists in Denver, Boulder, Fort Collins, and surrounding areas.',
}

const FAQ = [
  { q: 'Are there pelvic floor PTs in Denver who work with athletes?', a: 'Yes — Denver\'s active culture means several pelvic floor PTs specifically serve athletes and fitness-active women. If you are dealing with exercise-induced leaking, return-to-sport after pregnancy, or pelvic girdle pain from endurance training, search for providers who list "sports" or "athletes" as a specialty.' },
  { q: 'How much does pelvic floor PT cost in Denver?', a: 'Cash-pay sessions in Denver typically run $150-280. In-network sessions with Colorado Medicaid, Anthem, or CIGNA range from $30-100 per session depending on your plan. Boulder and Fort Collins practices have similar pricing to Denver.' },
  { q: 'Can I find a pelvic floor PT in the Denver suburbs?', a: 'Pelvic floor PT coverage extends throughout the Front Range. Boulder, Littleton, Lakewood, Aurora, Thornton, Westminster, and Fort Collins all have providers. Many Denver PTs also offer telehealth for patients across Colorado and neighboring states.' },
]

export default async function BestDenverPage() {
  const listings = await getListingsByCity('Denver', 'Colorado', 9).catch(() => [])

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
            <Link href="/pelvic-floor-pt/denver-co" className="hover:text-teal transition-colors">Denver, CO</Link>
            <span>/</span>
            <span className="text-stone-600">Best Of</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>Denver, CO</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Best Pelvic Floor Physical Therapists in Denver, CO
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
              Denver&apos;s fitness-forward culture means pelvic floor PT is widely understood and
              sought after. The Front Range has strong provider coverage from Denver through Boulder,
              Fort Collins, and Colorado Springs. Many Denver pelvic PTs specialize in active
              women and athletes — treatment philosophies here often include return-to-running,
              CrossFit, and endurance sport programs alongside standard rehabilitation.
            </p>
          </div>

          {/* Coverage area */}
          <section className="mb-10 bg-cream-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-stone-700 mb-4">
              Front Range pelvic floor PT coverage
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Denver', 'Boulder', 'Fort Collins', 'Littleton / Highlands Ranch', 'Lakewood', 'Aurora', 'Colorado Springs', 'Westminster / Broomfield', 'Castle Rock'].map((area) => (
                <div key={area} className="px-3 py-2 bg-white rounded-lg text-xs font-medium text-stone-600 text-center">
                  {area}
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
                  Pelvic floor PTs in Denver
                </h2>
                <Link
                  href="/pelvic-floor-pt/denver-co"
                  className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-400"
                >
                  View all Denver providers <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/pelvic-floor-pt/denver-co" className="btn-primary">
                  See all pelvic floor PTs in Denver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                Browse all pelvic floor PTs near Denver.
              </p>
              <Link href="/listings?location=Denver%2C+CO" className="btn-secondary">
                Search Denver
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
