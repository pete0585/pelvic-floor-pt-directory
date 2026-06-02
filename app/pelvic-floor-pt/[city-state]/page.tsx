import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, Users } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'
import { stateAbbr } from '@/lib/utils'

const STATE_MAP: Record<string, string> = {
  al: 'Alabama', ak: 'Alaska', az: 'Arizona', ar: 'Arkansas', ca: 'California',
  co: 'Colorado', ct: 'Connecticut', de: 'Delaware', fl: 'Florida', ga: 'Georgia',
  hi: 'Hawaii', id: 'Idaho', il: 'Illinois', in: 'Indiana', ia: 'Iowa',
  ks: 'Kansas', ky: 'Kentucky', la: 'Louisiana', me: 'Maine', md: 'Maryland',
  ma: 'Massachusetts', mi: 'Michigan', mn: 'Minnesota', ms: 'Mississippi', mo: 'Missouri',
  mt: 'Montana', ne: 'Nebraska', nv: 'Nevada', nh: 'New Hampshire', nj: 'New Jersey',
  nm: 'New Mexico', ny: 'New York', nc: 'North Carolina', nd: 'North Dakota', oh: 'Ohio',
  ok: 'Oklahoma', or: 'Oregon', pa: 'Pennsylvania', ri: 'Rhode Island', sc: 'South Carolina',
  sd: 'South Dakota', tn: 'Tennessee', tx: 'Texas', ut: 'Utah', vt: 'Vermont',
  va: 'Virginia', wa: 'Washington', wv: 'West Virginia', wi: 'Wisconsin', wy: 'Wyoming',
  dc: 'District of Columbia',
}

const CITY_CONTEXT: Record<string, string> = {
  'los-angeles-ca': 'Los Angeles has one of the largest concentrations of pelvic floor PTs in the country, with a strong culture of preventive and functional fitness care. Many practices are cash-pay and specialize in postpartum athletes and active women.',
  'san-francisco-ca': 'San Francisco Bay Area pelvic floor PTs serve a highly health-literate patient base. Telehealth options are widely available, and many clinics offer evening and weekend appointments.',
  'houston-tx': 'Houston has a large and growing pelvic floor PT community, with specialists distributed across the medical center area, The Woodlands, Sugar Land, and the Energy Corridor. Many accept major Texas insurance plans.',
  'austin-tx': 'Austin\'s pelvic floor PT scene has grown significantly alongside the city, with many practices near the Domain, South Austin, and Cedar Park. A strong postpartum and athletic community drives high demand.',
  'miami-fl': 'Miami pelvic floor PTs serve a diverse, bilingual patient population. Spanish-speaking providers are available throughout Miami-Dade and Broward County. Many practices offer telehealth for the surrounding South Florida region.',
  'denver-co': 'Denver and the Front Range have an active, fitness-forward culture that makes pelvic floor PT widely understood and sought after. Boulder and surrounding communities add to a robust provider network.',
  'charlotte-nc': 'Charlotte has a strong and growing pelvic floor PT community serving the greater metro area including Concord, Huntersville, and Ballantyne. Many practices accept Blue Cross Blue Shield of North Carolina.',
  'nashville-tn': 'Nashville pelvic floor PTs serve patients across Middle Tennessee. The city\'s rapidly growing population has brought new specialized practices alongside the established Vanderbilt and Saint Thomas health systems.',
  'phoenix-az': 'Phoenix and the East Valley (Scottsdale, Tempe, Gilbert, Chandler) have a dense pelvic floor PT provider network. Many practices specialize in postpartum care for young families in this rapidly growing metro.',
  'boston-ma': 'Boston\'s academic medical culture produces highly credentialed pelvic floor PTs. Many hold CAPP or WCS certifications. The city has strong coverage across Cambridge, Brookline, Somerville, and the South Shore.',
  'seattle-wa': 'Seattle pelvic floor PTs serve patients across King and Snohomish counties. Eastside communities like Bellevue and Kirkland have strong provider coverage, and telehealth is widely available for rural Western Washington.',
  'san-diego-ca': 'San Diego has a large military community served by pelvic floor PTs with experience in TRICARE billing and post-surgical rehabilitation. Coastal neighborhoods and the inland communities both have strong provider availability.',
  'chicago-il': 'Chicago pelvic floor PTs practice throughout the city and suburbs, from the North Shore to the South Side. Many practices are affiliated with Northwestern, Rush, and the University of Chicago medical systems.',
  'new-york-ny': 'New York City has the most pelvic floor PTs per capita of any major US city. Manhattan, Brooklyn, and Queens all have concentrated provider clusters, with many speciliasts in postpartum care and chronic pelvic pain.',
  'atlanta-ga': 'Atlanta pelvic floor PTs serve a large metro that includes Buckhead, Decatur, Alpharetta, Marietta, and Midtown. In-network options with major insurers are available throughout the area.',
}

const CITY_FAQ: Record<string, Array<{ q: string; a: string }>> = {
  'los-angeles-ca': [
    { q: 'How much does pelvic floor PT cost in Los Angeles?', a: 'In Los Angeles, pelvic floor PT typically costs $180-320 per session out of pocket at cash-pay practices. Many in-network providers charge $40-100 per session after meeting your deductible. Rates vary significantly by neighborhood and practice type.' },
    { q: 'Do pelvic floor PTs in Los Angeles accept insurance?', a: 'Many pelvic floor PTs in Los Angeles accept insurance, particularly Blue Shield, Anthem, and Aetna. However, a significant number operate as cash-pay practices with superbill reimbursement options. Always verify coverage before your first appointment.' },
    { q: 'How many pelvic floor PTs are in Los Angeles?', a: 'The Los Angeles metro area has over 80 pelvic floor physical therapists across the directory, with the highest concentrations in West LA, Santa Monica, Silver Lake, and the South Bay.' },
  ],
  'houston-tx': [
    { q: 'Do pelvic floor PTs in Houston accept insurance?', a: 'Most pelvic floor PTs in Houston accept major Texas insurance plans including Blue Cross Blue Shield of Texas, UnitedHealthcare, Aetna, and Cigna. Many also accept TRICARE for veterans and military families.' },
    { q: 'How many pelvic floor PTs are in Houston?', a: 'The Houston metro area has over 60 pelvic floor physical therapists in the directory, distributed across the Medical Center area, The Woodlands, Sugar Land, Katy, and the Energy Corridor.' },
    { q: 'What conditions do Houston pelvic floor PTs specialize in?', a: 'Houston pelvic floor PTs treat the full range of pelvic floor conditions: postpartum recovery, incontinence, prolapse, pelvic pain, and vaginismus. Several practices near the Texas Medical Center specialize in post-cancer rehabilitation.' },
  ],
  'denver-co': [
    { q: 'How much does pelvic floor PT cost in Denver?', a: 'Denver pelvic floor PT sessions typically run $150-280 out of pocket at cash-pay practices. In-network sessions with Colorado Medicaid or major commercial plans can cost $25-80 after deductible.' },
    { q: 'How many pelvic floor PTs are in Denver?', a: 'The Denver metro and Front Range has over 40 pelvic floor physical therapists in the directory, with strong coverage in Denver proper, Boulder, Fort Collins, and Colorado Springs.' },
    { q: 'Are there pelvic floor PTs in Denver who specialize in athletes?', a: 'Yes. Denver\'s fitness culture means several pelvic floor PTs specifically treat active women and athletes dealing with exercise-induced leaking, return-to-sport after childbirth, and pelvic girdle pain from endurance training.' },
  ],
}

const DEFAULT_FAQ = (cityName: string, stateAbbrev: string) => [
  { q: `How many pelvic floor PTs are in ${cityName}, ${stateAbbrev}?`, a: `The number of pelvic floor physical therapists in ${cityName} varies — use the directory above to see all currently listed providers in the area. New providers are added weekly.` },
  { q: `Do pelvic floor PTs in ${cityName} accept insurance?`, a: 'Coverage varies by practice. Some pelvic floor PTs accept major commercial insurance, Medicare, or Medicaid; others are cash-pay only. Contact individual practices to verify your specific plan is accepted.' },
  { q: `How do I find the right pelvic floor PT in ${cityName}?`, a: `Filter by the condition you\'re dealing with (postpartum, incontinence, prolapse, pelvic pain), check telehealth availability if you want remote sessions, and confirm insurance before booking. Reading the practitioner\'s bio helps you find someone who has experience with your specific situation.` },
]

function parseCityState(slug: string): { cityName: string; stateKey: string; stateAbbrev: string; stateFull: string } | null {
  const parts = slug.split('-')
  if (parts.length < 2) return null
  const stateKey = parts[parts.length - 1].toLowerCase()
  const stateFull = STATE_MAP[stateKey]
  if (!stateFull) return null
  const citySlug = parts.slice(0, -1).join('-')
  const cityName = citySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
  return { cityName, stateKey, stateAbbrev: stateKey.toUpperCase(), stateFull }
}

export async function generateMetadata({ params }: { params: Promise<{ 'city-state': string }> }): Promise<Metadata> {
  const { 'city-state': cityStateSlug } = await params
  const parsed = parseCityState(cityStateSlug)
  if (!parsed) return { title: 'City Not Found' }
  const { cityName, stateAbbrev } = parsed
  const title = `Pelvic Floor Physical Therapists in ${cityName}, ${stateAbbrev} | PelvicFloorPTDirectory.com`
  const description = `Find a pelvic floor PT in ${cityName}, ${stateAbbrev}. Browse verified specialists by condition, insurance, and telehealth availability.`
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function CityPage({ params }: { params: Promise<{ 'city-state': string }> }) {
  const { 'city-state': cityStateSlug } = await params
  const parsed = parseCityState(cityStateSlug)
  if (!parsed) notFound()
  const { cityName, stateAbbrev, stateFull } = parsed

  const listings = await getListingsByCity(cityName, stateFull, 24).catch(() => [])
  const context = CITY_CONTEXT[cityStateSlug]
  const faq = CITY_FAQ[cityStateSlug] ?? DEFAULT_FAQ(cityName, stateAbbrev)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
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
            <span className="text-stone-600">{cityName}, {stateAbbrev}</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
              <MapPin className="h-4 w-4" />
              <span>{cityName}, {stateAbbrev}</span>
            </div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
              Find a Pelvic Floor Physical Therapist in {cityName}, {stateAbbrev}
            </h1>
            {context ? (
              <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">{context}</p>
            ) : (
              <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">
                Find pelvic floor physical therapists in {cityName}, {stateAbbrev} who specialize in
                postpartum recovery, urinary incontinence, prolapse, pelvic pain, and more. Filter by
                condition, insurance, and telehealth availability.
              </p>
            )}
          </div>

          {/* Listings */}
          {listings.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal" />
                  {listings.length}+ pelvic floor PTs in {cityName}
                </h2>
                <Link
                  href={`/listings?location=${encodeURIComponent(cityName + ', ' + stateAbbrev)}`}
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
                  href={`/listings?location=${encodeURIComponent(cityName + ', ' + stateAbbrev)}`}
                  className="btn-primary"
                >
                  View all pelvic floor PTs in {cityName} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center mb-10">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re still building out {cityName} coverage. More providers are added daily.
              </p>
              <Link href="/listings" className="btn-secondary">
                Browse all pelvic floor PTs
              </Link>
            </div>
          )}

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions about Pelvic Floor PT in {cityName}
            </h2>
            <div className="space-y-5 max-w-3xl">
              {faq.map(({ q, a }) => (
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
              Are you a pelvic floor PT in {cityName}?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Get found by patients actively searching in your area. Free listing included.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
              >
                Add Your Listing Free
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-3 text-sm font-semibold text-white hover:border-white transition-colors"
              >
                Browse All PTs
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
