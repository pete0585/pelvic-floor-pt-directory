import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Postpartum Pelvic Floor Recovery: When to Start and What to Expect | Pelvic Floor Directory',
  description:
    'The 6-week clearance doesn\'t mean your pelvic floor has recovered. A guide to postpartum pelvic floor PT — when to start, red flags, and the evidence-based return-to-running timeline.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/return-to-exercise-after-birth' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'When should I see a pelvic floor PT after giving birth?',
    a: "Ideally within the first 6–12 weeks postpartum, even if you feel fine. Many pelvic floor issues — including mild prolapse and pelvic floor hypertonicity — don't have obvious symptoms until you return to exercise. If you have symptoms (leaking, pelvic pressure, perineal pain, pain with intercourse), see a PT sooner rather than waiting for your 6-week OB appointment. In France, postpartum pelvic floor PT is standard care covered by national health insurance for every new mother — the US is catching up.",
  },
  {
    q: 'Is pelvic floor PT covered by insurance after childbirth?',
    a: "Typically yes, under general PT benefits. Most major commercial insurance plans cover physical therapy, which includes pelvic floor PT. Diagnosis codes for postpartum pelvic floor dysfunction and urinary incontinence are widely accepted. You may need a referral from your OB or midwife, and your plan may have a per-visit copay or annual session limit. Call your insurance before booking to confirm PT coverage.",
  },
  {
    q: 'Should I do Kegels right away after giving birth?',
    a: "Not always — and this is one of the most common misconceptions in postpartum recovery. A significant percentage of new mothers have pelvic floor hypertonicity (an overactive, too-tight pelvic floor) rather than weakness, especially after difficult deliveries, prolonged pushing, or significant tearing. Kegeling a tight pelvic floor makes it tighter, not better. A pelvic floor PT can assess whether you need strengthening, relaxation, or coordination training — and you may need all three at different stages of recovery.",
  },
  {
    q: 'How long is postpartum pelvic floor recovery?',
    a: "With PT, most women experience significant improvement within 12–20 sessions. Common conditions like stress urinary incontinence (leaking with coughing or jumping) often resolve in 4–8 sessions. More complex presentations — prolapse, diastasis recti combined with pelvic floor dysfunction, or chronic pelvic pain — take longer. Full tissue healing after vaginal delivery continues for up to 12 months, and after cesarean section, for 12–18 months.",
  },
]

export default function ReturnToExerciseAfterBirthPage() {
  const faqLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-teal transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-stone-600">Postpartum Pelvic Floor Recovery</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
              Postpartum Pelvic Floor Recovery: When to Start and What to Expect
            </h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Your OB clears you at 6 weeks. That doesn&apos;t mean your pelvic floor is ready for
              running, jumping, or heavy lifting. Research consistently shows that pelvic floor
              recovery after childbirth takes months — not weeks — and that many women who feel
              fine early on have underlying dysfunction that surfaces when they return to exercise.
              Pelvic floor PT closes the gap between &quot;cleared&quot; and &quot;actually ready.&quot;
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                What happens to your pelvic floor during pregnancy and birth
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Pregnancy puts the pelvic floor under sustained load for 9 months — the growing
                uterus, placenta, and baby press downward throughout. Relaxin (a hormone of pregnancy)
                softens the pelvic ligaments to allow the pelvis to accommodate birth, but this also
                reduces the passive support the pelvic floor depends on. The result is that the
                muscles have to work harder to compensate.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                During vaginal delivery, the levator ani muscle group stretches to 3–4 times its
                resting length as the baby passes through. This is beyond what most muscles can
                stretch without some degree of injury — even when delivery is uncomplicated. Forceps
                or vacuum delivery, prolonged pushing, large babies, and perineal tears or episiotomy
                add additional trauma.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Cesarean section does not spare the pelvic floor — the pelvic floor still supported
                9 months of pregnancy. Cesarean adds a major abdominal wound with 7 layers of tissue
                cut and repaired, and the resulting scar can create adhesions that affect pelvic
                floor mechanics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                The 6-week clearance myth
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The 6-week postpartum appointment was designed primarily to assess perineal and
                uterine healing — not pelvic floor function. When your OB says you&apos;re
                &quot;cleared for activity,&quot; they typically mean the external wound has healed
                and there are no signs of infection or serious complications.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Research published in the British Journal of Sports Medicine (2019) found that the
                6-week timeline has no evidence base for return to high-impact exercise. The paper
                — co-authored by two of the leading experts in postpartum exercise — recommends
                not returning to high-impact activity (running, jumping, heavy lifting) before
                12 weeks at the earliest, and only then with a pelvic floor PT assessment confirming
                readiness.
              </p>
              <p className="text-stone-600 leading-relaxed">
                This is not about being overly cautious — it&apos;s about not trading short-term
                fitness for long-term pelvic health problems like prolapse, persistent incontinence,
                or pelvic pain.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                The postpartum timeline: weeks 0–12
              </h2>
              <div className="space-y-3">
                {[
                  { phase: 'Weeks 0–2', content: 'Rest, manage perineal healing (ice, sitz baths if needed), gentle diaphragmatic breathing. Pelvic floor is healing — no activation exercises yet unless your midwife or PT specifically guides you.' },
                  { phase: 'Weeks 2–6', content: 'Gentle walking increases progressively. Begin mindful pelvic floor reconnection — gentle awareness of contracting and releasing, not hard Kegels. Incision care for C-section. Scar desensitization can begin when the wound is closed.' },
                  { phase: 'Weeks 6–12', content: 'With OB clearance, begin formal pelvic floor PT assessment. This is the optimal window to identify issues before returning to higher-impact activity. PT assessment guides your return-to-exercise plan.' },
                ].map(({ phase, content }) => (
                  <div key={phase} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-20 text-xs font-semibold text-teal bg-teal/10 rounded-lg px-2 py-1.5 text-center">
                      {phase}
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed pt-1">{content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                Red flags that mean you need PT now — not later
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Leaking urine with coughing, sneezing, or laughing',
                  'Leaking urine with urgency — rushing to the toilet',
                  'Pelvic heaviness or a sensation of something falling out',
                  'Pain with intercourse after 8–10 weeks (beyond expected tenderness)',
                  'Significant perineal pain at rest beyond 4 weeks',
                  'Difficulty emptying your bladder or bowels',
                  'Diastasis recti with abdominal doming or coning',
                  'Tailbone pain that persists beyond 8 weeks',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 bg-white rounded-xl border border-stone-100 p-3 text-sm shadow-sm">
                    <span className="text-rose-500 mt-0.5 flex-shrink-0">!</span>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                What postpartum pelvic floor PT actually looks like
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Most people expect postpartum PT to be exercise-heavy. The reality is that a
                significant part of early postpartum PT is assessment and relaxation — not just
                strengthening. Many new mothers have pelvic floors that are too tight, too weak,
                or poorly coordinated in different areas at the same time.
              </p>
              <div className="space-y-3">
                {[
                  { title: 'Internal and external pelvic floor assessment', detail: "A PT will assess muscle tone, strength, coordination, and scar tissue — both externally and, when appropriate and comfortable, internally. This is the only way to know what your pelvic floor actually needs." },
                  { title: 'Scar tissue mobilization', detail: "Perineal scars (tears, episiotomies) and C-section scars can become restricted and affect pelvic mechanics. Scar massage is one of the most impactful things a PT can do — and teach you to do at home." },
                  { title: 'Relaxation and down-training (if needed)', detail: "If your pelvic floor is too tight — very common after difficult deliveries — the PT will focus on teaching relaxation before strengthening. A hypertonic pelvic floor does not respond well to more Kegels." },
                  { title: 'Progressive loading and return-to-exercise', detail: "Once your PT has confirmed your pelvic floor is ready, they build a structured return-to-exercise program based on your goals — whether that's running, CrossFit, lifting heavy, or just getting through the day leak-free." },
                ].map(({ title, detail }) => (
                  <div key={title} className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                    <p className="font-semibold text-stone-800">{title}</p>
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                The evidence-based return-to-running guide
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Per the 2019 BJSM guidelines, before returning to running postpartum you should be
                able to:
              </p>
              <div className="bg-stone-50 rounded-xl p-5 space-y-2">
                {[
                  'Walk briskly for 30 minutes without symptoms',
                  'Complete 20 single-leg calf raises (each side)',
                  'Complete 20 single-leg bridges (each side)',
                  'Hop on each leg 10 times without leaking, pain, or pelvic pressure',
                  'Have no pelvic heaviness during or after walking',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-teal font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-stone-500 text-sm mt-4">
                Minimum 12 weeks postpartum before attempting running. Most women benefit from
                PT assessment before this milestone to confirm readiness.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-stone-800">Frequently Asked Questions</h2>
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </section>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6">
              <h2 className="font-semibold text-stone-800 mb-2">Find a postpartum pelvic floor PT near you</h2>
              <p className="text-sm text-stone-600 mb-4">
                Search our directory for pelvic floor PTs who specialize in postpartum recovery and
                return to exercise after childbirth.
              </p>
              <Link href="/listings" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Browse the Directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="pt-8 border-t border-stone-100">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
                <Link href="/guides/kegels-vs-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Kegels vs. Pelvic Floor PT →</Link>
                <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
                <Link href="/guides/does-pelvic-floor-pt-hurt" className="text-sm text-teal hover:opacity-80 font-medium">Does Pelvic Floor PT Hurt? →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
