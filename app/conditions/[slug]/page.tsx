import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import { getListingsByCondition } from '@/lib/data'
import { conditionLabel } from '@/lib/utils'

const CONDITIONS = [
  'postpartum', 'pregnancy', 'urinary_incontinence', 'prolapse',
  'pelvic_pain', 'endometriosis', 'painful_sex', 'vaginismus',
  'male_pelvic_health', 'pediatric', 'diastasis_recti', 'constipation',
  'sexual_dysfunction', 'interstitial_cystitis', 'menopause', 'cancer_recovery',
  'sports', 'other',
]

const CONDITION_COPY: Record<string, { headline: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  postpartum: {
    headline: 'Find a Pelvic Floor PT for Postpartum Recovery',
    intro: 'After childbirth — whether vaginal or cesarean — your pelvic floor needs rehabilitation. Leaking when you sneeze, painful sex, diastasis recti, and feelings of heaviness or pressure are all normal symptoms a pelvic floor PT can help you resolve. You deserve more than "just do Kegels."',
    faq: [
      { q: 'When can I start pelvic floor PT after delivery?', a: 'Most practitioners recommend waiting until your 6-week postpartum check-up, but some will evaluate sooner for specific concerns. A pelvic floor PT can assess you as early as 3-4 weeks postpartum in many cases.' },
      { q: 'Will pelvic floor PT help with postpartum leaking?', a: 'Yes. Urinary incontinence after childbirth is one of the most common conditions pelvic floor PTs treat — and one of the most successfully treated. Most patients see significant improvement within 6-8 sessions.' },
      { q: 'Does insurance cover postpartum pelvic floor PT?', a: 'Many insurance plans cover physical therapy, including pelvic floor PT. Coverage depends on your specific plan and diagnosis code. Ask your PT about billing codes for postpartum pelvic floor dysfunction.' },
    ],
  },
  urinary_incontinence: {
    headline: 'Find a Pelvic Floor PT for Urinary Incontinence',
    intro: 'Leaking urine when you laugh, sneeze, cough, or exercise is common — but it\'s not something you have to live with. Urinary incontinence is one of the conditions pelvic floor PTs treat most effectively. A specialized PT can identify whether your pelvic floor is too weak, too tight, or dyscoordinated — and give you a targeted plan.',
    faq: [
      { q: 'What types of incontinence does pelvic floor PT treat?', a: 'Stress incontinence (leaking with coughing/sneezing/exercise), urge incontinence (sudden strong urge to urinate), and mixed incontinence (combination of both) are all commonly treated by pelvic floor PTs.' },
      { q: 'How long does it take to see results for incontinence?', a: 'Most patients see meaningful improvement within 8-12 sessions over 6-8 weeks. Many see significant change as early as 4 sessions. Consistency with home exercises is key.' },
      { q: 'Are Kegel exercises enough for incontinence?', a: 'Not always. If your pelvic floor is actually hypertonic (too tight), Kegels can worsen incontinence. A pelvic floor PT will assess whether you need strengthening, relaxation, or both — which is why self-directed Kegels often fail.' },
    ],
  },
  prolapse: {
    headline: 'Find a Pelvic Floor PT for Pelvic Organ Prolapse',
    intro: 'Pelvic organ prolapse — when one or more pelvic organs drop from their normal position into the vaginal canal — affects roughly 50% of women who have given birth. Symptoms include a feeling of heaviness, pressure, or a bulge. Pelvic floor PT is often the first-line treatment before considering surgical options.',
    faq: [
      { q: 'Can pelvic floor PT reverse prolapse?', a: 'PT cannot reverse structural prolapse, but it can significantly reduce symptoms, improve quality of life, and prevent progression. Many women with Stage 1-2 prolapse achieve full symptom resolution with PT.' },
      { q: 'Is pelvic floor PT safe with prolapse?', a: 'Yes — a trained pelvic floor PT will tailor all exercises to your prolapse grade and specific symptoms. They\'ll teach you to avoid movements that worsen prolapse while building the support muscles that help manage it.' },
      { q: 'What is the difference between Kegels and prolapse-specific PT?', a: 'A prolapse-specific program involves far more than Kegels. It includes load management, positional strategies, intra-abdominal pressure management, and functional movement training — skills that take multiple sessions to develop.' },
    ],
  },
  pelvic_pain: {
    headline: 'Find a Pelvic Floor PT for Chronic Pelvic Pain',
    intro: 'Chronic pelvic pain — pain lasting longer than 3-6 months in the pelvic region — often goes undiagnosed for years. Pelvic floor PTs are trained to identify musculoskeletal contributors to pelvic pain that other providers miss. If you\'ve been told your pain is "normal" or "in your head," a pelvic floor PT can offer a different answer.',
    faq: [
      { q: 'What causes pelvic pain that PT can help with?', a: 'Pelvic floor muscle tension, trigger points, nerve sensitization, scar tissue from surgeries or childbirth, hip and tailbone dysfunction, and bladder irritability are all musculoskeletal contributors that PT addresses.' },
      { q: 'How many sessions does chronic pelvic pain take?', a: 'Chronic pelvic pain typically requires more sessions than acute conditions — often 12-20 over 3-5 months. It\'s a complex condition and progress can be nonlinear. Patients who commit to home program compliance typically see the best outcomes.' },
      { q: 'Can I see a pelvic floor PT while also working with a gynecologist?', a: 'Yes — and this is often ideal. Pelvic floor PT addresses the musculoskeletal component while your gynecologist addresses the underlying condition. Many pelvic PTs actively coordinate with referring physicians.' },
    ],
  },
  vaginismus: {
    headline: 'Find a Pelvic Floor PT for Vaginismus',
    intro: 'Vaginismus — involuntary tightening of the vaginal muscles during attempted penetration — is highly treatable with pelvic floor physical therapy. Whether you\'re dealing with pain during sex, inability to use tampons, or difficulty with gynecological exams, a pelvic floor PT specializing in vaginismus can guide you through a graduated desensitization program.',
    faq: [
      { q: 'What does pelvic floor PT for vaginismus involve?', a: 'Treatment typically involves manual therapy to reduce muscle tension, breathing and relaxation techniques, and a graduated dilator program done at your own pace. No part of treatment is painful or forced.' },
      { q: 'How long does it take to treat vaginismus?', a: 'Treatment timelines vary widely — some patients achieve their goals in 6-8 sessions; others need 3-6 months of consistent work. The pace is entirely patient-led, and progress is made through gradual desensitization, not rushing.' },
      { q: 'Is PT effective for vaginismus even if I have anxiety about it?', a: 'Yes. Many pelvic floor PTs are trained in the psychological component of vaginismus and work collaboratively with therapists. The combination of PT and sex therapy or CBT produces the strongest outcomes.' },
    ],
  },
}

const DEFAULT_COPY = {
  headline: (cond: string) => `Find a Pelvic Floor PT for ${conditionLabel(cond)}`,
  intro: (cond: string) =>
    `Looking for a pelvic floor physical therapist who specializes in ${conditionLabel(cond)}? Use the directory below to find verified specialists near you who have experience treating this condition.`,
  faq: [] as Array<{ q: string; a: string }>,
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (!CONDITIONS.includes(slug)) return { title: 'Condition Not Found' }

  const copy = CONDITION_COPY[slug]
  const label = conditionLabel(slug)
  const title = copy?.headline ?? `Find a Pelvic Floor PT for ${label}`
  const description = copy?.intro
    ? copy.intro.slice(0, 160)
    : `Find pelvic floor physical therapists who specialize in ${label}. Search by location and insurance.`

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!CONDITIONS.includes(slug)) notFound()

  const listings = await getListingsByCondition(slug, 24).catch(() => [])
  const copy = CONDITION_COPY[slug]
  const label = conditionLabel(slug)
  const headline = copy?.headline ?? DEFAULT_COPY.headline(slug)
  const intro = copy?.intro ?? DEFAULT_COPY.intro(slug)
  const faq = copy?.faq ?? DEFAULT_COPY.faq

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
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-teal transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">{headline}</h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-3xl">{intro}</p>
            <div className="mt-6">
              <SearchBar defaultCondition={slug} />
            </div>
          </div>

          {listings.length > 0 ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-700">
                  {listings.length}+ pelvic floor PTs specializing in {label}
                </h2>
                <Link
                  href={`/listings?condition=${slug}`}
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
                <Link href={`/listings?condition=${slug}`} className="btn-primary">
                  View all PTs for {label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-stone-400 text-lg mb-4">
                We&apos;re building the {label} section. More listings are added daily.
              </p>
              <Link href="/listings" className="btn-secondary">
                Browse all pelvic floor PTs
              </Link>
            </div>
          )}

          {faq.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-stone-700 mb-8">
                Frequently Asked Questions
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
          )}
        </div>
      </div>
    </>
  )
}
