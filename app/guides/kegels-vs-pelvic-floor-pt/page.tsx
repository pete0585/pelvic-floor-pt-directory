import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kegels vs. Pelvic Floor PT: What\'s the Difference? | PelvicFloorPTDirectory.com',
  description: "Why doing Kegels on your own isn't always the right answer — and when you actually need a pelvic floor physical therapist instead of self-directed exercises.",
}

const FAQ = [
  { q: 'Why don\'t Kegels always work for leaking?', a: 'Kegels are a strengthening exercise. But urinary leaking is not always caused by a weak pelvic floor. If your pelvic floor is hyperactive (too tight), Kegels will increase tension and can worsen leaking, urgency, and pain. Without an internal assessment, there is no way to know whether your pelvic floor needs strengthening, relaxation, or better coordination. A pelvic floor PT identifies which one you need.' },
  { q: 'Can Kegels make pelvic floor problems worse?', a: 'Yes. For patients with hypertonic pelvic floors — which is common in people with chronic pelvic pain, vaginismus, interstitial cystitis, or certain presentations of prolapse — unsupervised Kegels can worsen symptoms. This is one of the most important reasons to get a pelvic floor assessment before self-prescribing exercises.' },
  { q: 'How do I know if I need PT vs. just Kegels?', a: 'If you have tried Kegels consistently for 8-12 weeks and have not seen improvement, see a pelvic floor PT. If your symptoms include pelvic pain, painful sex, or an inability to use tampons comfortably, see a PT first — Kegels are not the right starting point for those conditions. If you recently delivered a baby or had pelvic surgery, PT-guided rehabilitation is more appropriate than self-directed Kegels.' },
  { q: 'What does a pelvic floor PT do that Kegels don\'t?', a: 'A pelvic floor PT assesses muscle function internally to understand whether your pelvic floor is weak, tight, or uncoordinated — and creates a specific program based on your actual findings. They also address the surrounding structures: hip muscles, core, breathing mechanics, and posture. Most pelvic floor dysfunction is multifactorial; Kegels address exactly one variable.' },
]

const COMPARISON = [
  { feature: 'Requires assessment', kegels: 'No — self-directed', pt: 'Yes — internal assessment by trained PT' },
  { feature: 'Effective for weak pelvic floor', kegels: 'Yes', pt: 'Yes' },
  { feature: 'Safe for tight pelvic floor', kegels: 'No — can worsen symptoms', pt: 'Yes — downtraining and relaxation addressed' },
  { feature: 'Treats pelvic pain', kegels: 'No — often makes it worse', pt: 'Yes — manual therapy + breathing + coordination' },
  { feature: 'Treats vaginismus', kegels: 'No', pt: 'Yes — desensitization program' },
  { feature: 'Addresses diastasis recti', kegels: 'No', pt: 'Yes — specific loading and coordination work' },
  { feature: 'Teaches correct technique', kegels: 'No — most people do them wrong', pt: 'Yes — biofeedback and cueing available' },
  { feature: 'Addresses breath and posture', kegels: 'No', pt: 'Yes — intraabdominal pressure management' },
  { feature: 'Cost', kegels: 'Free', pt: '$80-280/session (varies by insurance)' },
]

export default function KegelsVsPTPage() {
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
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-stone-600">Guides</span>
            <span>/</span>
            <span className="text-stone-600">Kegels vs. Pelvic Floor PT</span>
          </nav>

          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            Kegels vs. Pelvic Floor PT: What&apos;s the Difference?
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            Why Kegels are not always the right answer — and when you actually need professional guidance.
          </p>

          <div className="prose-guide">

            <h2>The problem with self-prescribed Kegels</h2>
            <p>
              "Just do your Kegels" is the pelvic floor equivalent of "just drink more water." It is
              not wrong exactly, but it misses almost everything important.
            </p>
            <p>
              Kegels are a voluntary contraction of the pelvic floor muscles. They are appropriate
              when the pelvic floor is actually too weak. But there are multiple possible reasons for
              pelvic floor dysfunction:
            </p>
            <ul>
              <li><strong>Weak pelvic floor</strong> — Kegels help here</li>
              <li><strong>Hypertonic (too tight) pelvic floor</strong> — Kegels make this worse</li>
              <li><strong>Poor coordination</strong> — the pelvic floor contracts and relaxes at the wrong times</li>
              <li><strong>Poor load management</strong> — the system fails under load (coughing, jumping) even if strength is adequate</li>
              <li><strong>Breathin and intra-abdominal pressure issues</strong> — the system is functioning correctly but under too much pressure</li>
            </ul>
            <p>
              Without knowing which of these applies to you, self-prescribed Kegels are a coin flip.
              And for hypertonic patients, they actively worsen symptoms.
            </p>

            <h2>Kegels vs. pelvic floor PT — comparison</h2>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-cream-200 text-left">
                  <th className="p-3 font-semibold text-stone-700">Feature</th>
                  <th className="p-3 font-semibold text-stone-700">Kegels (self-directed)</th>
                  <th className="p-3 font-semibold text-stone-700">Pelvic floor PT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-300">
                {COMPARISON.map(({ feature, kegels, pt }) => (
                  <tr key={feature} className="bg-white">
                    <td className="p-3 font-medium text-stone-700">{feature}</td>
                    <td className="p-3 text-stone-500">{kegels}</td>
                    <td className="p-3 text-stone-500">{pt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-guide">

            <h2>When Kegels are appropriate on their own</h2>
            <p>
              Self-directed Kegels are a reasonable starting point if:
            </p>
            <ul>
              <li>You have mild stress incontinence with no pelvic pain or prolapse symptoms</li>
              <li>You are doing Kegels preventively during pregnancy or before pelvic surgery</li>
              <li>You have been assessed by a pelvic floor PT previously and told your floor is weak</li>
              <li>You are certain you are doing them correctly (many people are not)</li>
            </ul>
            <p>
              In all other cases, getting a pelvic floor assessment first — even a single session —
              gives you far better information than guessing.
            </p>

            <h2>Am I doing Kegels correctly?</h2>
            <p>
              Research consistently shows that most people who are given verbal Kegel instructions
              without hands-on training are doing them incorrectly. Common errors:
            </p>
            <ul>
              <li>Bearing down (increasing pressure) instead of lifting up</li>
              <li>Contracting the glutes or inner thighs instead of the pelvic floor</li>
              <li>Holding their breath during the contraction</li>
              <li>Not fully relaxing between contractions (which matters as much as the contraction)</li>
            </ul>
            <p>
              A pelvic floor PT can confirm you are doing them correctly using biofeedback or direct
              assessment — and then tell you whether you should be doing them at all.
            </p>

          </div>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-stone-700 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="card p-6">
                  <h3 className="font-bold text-stone-700 mb-3">{q}</h3>
                  <p className="text-stone-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-teal p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Get an actual assessment, not a guess
            </h2>
            <p className="text-teal-100 mb-6">
              Find a pelvic floor PT near you and know exactly what your pelvic floor needs.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
            >
              Browse the directory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
