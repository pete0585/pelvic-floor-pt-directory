import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT for Chronic Pelvic Pain: What You Need to Know | PelvicFloorPTDirectory.com',
  description:
    'Chronic pelvic pain affects 15–20% of women and can have pelvic floor muscle dysfunction as a primary driver. Here is how pelvic PT addresses it.',
}

const FAQ = [
  { q: 'Can pelvic floor PT cure chronic pelvic pain?', a: "Pelvic floor PT cannot cure all causes of pelvic pain — but for the large subset of chronic pelvic pain driven by pelvic floor muscle dysfunction (hypertonic muscles, trigger points, nerve sensitization), it is one of the most effective treatments available. Studies show 60–80% of women with pelvic floor hypertension-related pain experience significant symptom reduction with PT. The goal is always reduction and management — the approach depends on the cause." },
  { q: 'What is pelvic floor hypertonia and how does it cause pain?', a: "Pelvic floor hypertonia is excessive tension or tightness in the pelvic floor muscles. Rather than too-weak muscles (which cause incontinence), hypertonic muscles are in a state of persistent over-contraction. This can cause: pain with penetration (dyspareunia), pelvic pressure and aching, tailbone pain, pain with sitting, urinary urgency, and difficult bowel movements. Trigger points — knots of contracted muscle tissue — in the pelvic floor can also refer pain to the low back, hip, and thighs." },
  { q: 'How does pelvic PT treat pelvic pain differently from exercises?', a: "For hypertonic pelvic pain, the treatment is almost the opposite of the Kegels typically associated with pelvic PT. A skilled pelvic PT uses manual therapy to release trigger points, stretching techniques for shortened muscles, nerve mobilization for sensitized pudendal or ilioinguinal nerves, breathing and coordination retraining, and education about pain neuroscience to address the central sensitization that often accompanies chronic pain. Kegels can make hypertonic pelvic pain significantly worse." },
  { q: 'Should I see a gynecologist or a pelvic PT first?', a: "Ideally both — and in many cases, together. Pelvic pain can have gynecological causes (endometriosis, fibroids, ovarian cysts, PCOS), urological causes (interstitial cystitis, recurrent UTIs), gastroenterological causes (IBS, IBD), and musculoskeletal causes (pelvic floor dysfunction, hip joint issues, sacroiliac dysfunction). A pelvic PT is best for musculoskeletal evaluation and treatment. A gynecologist or urogynecologist evaluates structural causes. Many patients need both — and the good ones communicate with each other." },
  { q: 'How long does pelvic PT take to help with pelvic pain?', a: "Chronic pelvic pain typically requires 8–20 sessions over 3–5 months. Initial improvements — reduced muscle guarding, less trigger point tenderness, improved mobility — often appear in the first 3–6 sessions. Significant functional improvement (return to sex without pain, ability to sit comfortably, reduced urgency) typically takes 8–16 sessions. Central sensitization (when the nervous system has become hypersensitive to pain signals) requires longer treatment timelines — sometimes 6–12 months of intermittent PT." },
]

export default function PelvicPainPTPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal">Directory</Link>
            <span>/</span>
            <span className="text-stone-600">Pelvic PT for Pelvic Pain</span>
          </nav>
          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" /><span>Condition guide</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            Pelvic Floor PT for Chronic Pelvic Pain
          </h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Chronic pelvic pain affects 15–20% of women. For many, pelvic floor muscle dysfunction
            is a primary driver — and pelvic PT is one of the most effective treatments available.
            Here is how it works.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-4">Conditions pelvic PT addresses for pain</h2>
              <div className="space-y-3">
                {[
                  { cond: 'Dyspareunia (painful sex)', detail: 'Pelvic floor hypertonia is a leading cause of pain with penetration. PT addresses the muscular and connective tissue component — often in coordination with a gynecologist managing any structural contributors.' },
                  { cond: 'Vaginismus', detail: 'Involuntary muscle contractions that make penetration painful or impossible. PT involves graduated dilation, muscle retraining, and sometimes graded exposure desensitization — not just relaxation exercises.' },
                  { cond: 'Interstitial cystitis / bladder pain syndrome', detail: 'Pelvic floor PT is the most evidence-supported non-pharmaceutical intervention for IC/BPS. Manual therapy to the pelvic floor reduces pain, urgency, and frequency in multiple clinical trials.' },
                  { cond: 'Vulvodynia / vestibulodynia', detail: 'Generalized vulvar pain and localized vestibular pain both have a pelvic floor muscle component that PT can address. Success rates are highest when PT is combined with appropriate medical management.' },
                  { cond: 'Pudendal neuralgia', detail: 'Compression or irritation of the pudendal nerve causes burning, shooting, or electric pain in the vulva, perineum, or rectum. PT addresses muscular entrapment sites and nerve tension along the pudendal nerve pathway.' },
                ].map((item) => (
                  <div key={item.cond} className="rounded-xl border border-stone-200 bg-white p-5">
                    <p className="font-semibold text-stone-800">{item.cond}</p>
                    <p className="text-sm text-stone-500 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQ.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-stone-200 bg-white p-5">
                    <h3 className="font-semibold text-stone-800 mb-2">{faq.q}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-10 rounded-2xl bg-teal p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Find a Pelvic Pain Specialist Near You</h2>
            <p className="text-teal-50 mb-6">Search our directory for pelvic floor PTs who specialize in pain conditions, vaginismus, and interstitial cystitis.</p>
            <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-teal hover:bg-stone-50 transition-colors">
              Browse Pelvic Floor PTs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200">
            <h3 className="font-semibold text-stone-700 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/pelvic-floor-pt-for-ic" className="text-sm text-teal font-medium">Pelvic PT for Interstitial Cystitis →</Link>
              <Link href="/guides/pelvic-floor-pt-for-endometriosis" className="text-sm text-teal font-medium">Pelvic PT for Endometriosis →</Link>
              <Link href="/guides/pelvic-floor-pt-cost" className="text-sm text-teal font-medium">Pelvic Floor PT Cost Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
