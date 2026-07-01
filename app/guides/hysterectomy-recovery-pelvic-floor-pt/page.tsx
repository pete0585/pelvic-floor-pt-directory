import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT Before and After Hysterectomy: Complete Guide | Pelvic Floor Directory',
  description:
    'Pelvic floor PT before and after hysterectomy can significantly reduce recovery time and lower your long-term risk of prolapse and incontinence. What to expect, when to start, and what PT involves.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/hysterectomy-recovery-pelvic-floor-pt' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'When can I start pelvic floor PT after a hysterectomy?',
    a: "Most surgeons clear patients to begin pelvic floor PT at 6–8 weeks post-operatively, once the vaginal cuff has healed. However, prehab (PT before your surgery) is highly recommended 4–6 weeks prior to optimize pelvic floor function and set a baseline. If you develop significant symptoms earlier than 6 weeks — such as leaking, pelvic pressure, or pain — contact your surgeon and ask about an earlier PT evaluation.",
  },
  {
    q: "What are the signs I need pelvic floor PT after a hysterectomy?",
    a: "Common signs include: leaking urine with coughing, sneezing, or activity; a sensation of pelvic pressure or heaviness (possible prolapse); painful intercourse after the initial healing period; difficulty emptying your bladder or bowels; and lower abdominal or pelvic pain that persists beyond normal surgical recovery. Any of these warrants a pelvic floor PT evaluation.",
  },
  {
    q: 'Does hysterectomy cause pelvic floor problems?',
    a: "Hysterectomy changes the support architecture of the pelvis — the uterine ligaments that attach to the pelvic walls are cut, and the vaginal vault is sutured closed. This changes the distribution of load through the pelvic floor and increases the long-term risk of pelvic organ prolapse. The risk is higher with total hysterectomy than subtotal. Pelvic floor PT is strongly recommended after hysterectomy as both rehabilitation and prevention — not just if you have symptoms.",
  },
  {
    q: 'How many PT sessions will I need after a hysterectomy?',
    a: "Most women benefit from 8–16 sessions after hysterectomy, depending on their symptoms, surgery type (laparoscopic vs. open, total vs. subtotal), and baseline pelvic floor function. A home exercise program — which your PT will teach and progress — is as important as the in-clinic sessions. Long-term self-management strategies mean most women do not need ongoing clinic visits after their initial treatment course.",
  },
]

export default function HysterectomyRecoveryPTPage() {
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
            <span className="text-stone-600">Pelvic Floor PT Before and After Hysterectomy</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
              Pelvic Floor PT Before and After Hysterectomy: A Complete Guide
            </h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Hysterectomy is one of the most commonly performed major surgeries in the United States.
              What many women aren&apos;t told is that the pelvic floor changes significantly after
              uterus removal — and that pelvic floor PT, both before and after surgery, is one of
              the most effective ways to protect long-term function.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                Why your pelvic floor changes during a hysterectomy
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The uterus is not just a reproductive organ — it provides structural support to the
                pelvic floor through a series of ligaments (cardinal, uterosacral, broad). When the
                uterus is removed, these ligaments are cut. The vaginal vault is sutured to the
                remaining pelvic wall, but the support architecture is fundamentally altered.
              </p>
              <p className="text-stone-600 leading-relaxed">
                The result is a redistribution of pressure through the pelvic floor and an increased
                risk of pelvic organ prolapse — where the bladder, rectum, or vaginal walls begin to
                descend into the vaginal canal. Studies show that women who have had a hysterectomy
                have a significantly higher lifetime rate of prolapse repair than those who haven&apos;t.
                Pelvic floor PT does not eliminate this risk, but it dramatically reduces it by
                optimizing pelvic floor coordination, load management, and connective tissue health.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                Prehab: PT before your hysterectomy (4–6 weeks before)
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Prehabilitation — starting PT before surgery — is supported by evidence in orthopedic
                surgery and increasingly in gynecologic surgery. For hysterectomy, prehab PT focuses on:
              </p>
              <div className="space-y-3">
                {[
                  { title: 'Pelvic floor assessment', detail: "Understanding your baseline — are you tight or weak? Coordination issues? The PT establishes your starting point so they can track recovery progress after surgery." },
                  { title: 'Learning proper pelvic floor activation', detail: "Most women don't know how to correctly activate (and relax) their pelvic floor. Learning this before surgery means you can begin gentle rehab movements immediately post-op without guessing." },
                  { title: 'Breathing and pressure management', detail: "Proper diaphragmatic breathing reduces downward pressure on the pelvic floor — critical in the first weeks after surgery when the pelvic floor is healing." },
                  { title: 'Core and hip preparation', detail: "A stronger hip and core complex reduces the load demands on the recovering pelvic floor during early ambulation." },
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
                Recovery timeline: what to expect in the first 8 weeks
              </h2>
              <div className="space-y-3">
                {[
                  { phase: 'Weeks 1–2', content: 'Rest is the priority. Gentle breathing exercises, ankle pumps to reduce clotting risk, and very short walks. No lifting. Vaginal cuff is actively healing.' },
                  { phase: 'Weeks 3–4', content: 'Longer walks (15–30 min) are usually tolerated. Begin gentle abdominal breathing and pelvic floor reconnection exercises (gentle activation only, no pressure).' },
                  { phase: 'Weeks 5–6', content: 'Most women feel significantly better. Light activity resumes. Surgical clearance appointment typically occurs at 6 weeks — the key milestone before starting formal PT.' },
                  { phase: 'Weeks 7–8', content: 'PT typically begins with clearance from your surgeon. Initial focus is on assessment, scar tissue mobilization, and coordination training — not strengthening yet.' },
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
                What pelvic floor PT after hysterectomy involves
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Contrary to what many women expect, post-hysterectomy pelvic floor PT is not just
                Kegels. In fact, many women are too tight after surgery, not too weak — and squeezing
                harder would be counterproductive. A PT will assess your specific situation and design
                treatment accordingly:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Vaginal cuff scar tissue mobilization (after full healing)',
                  'Abdominal and laparoscopy scar release',
                  'Pelvic floor coordination training (tighten AND release)',
                  'Bladder training if urgency or frequency is present',
                  'Prolapse prevention exercise progression',
                  'Return-to-activity planning (lifting, exercise, intercourse)',
                  'Bowel function optimization',
                  'Core and hip integration',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 bg-white rounded-xl border border-stone-100 p-3 text-sm shadow-sm">
                    <span className="text-teal mt-0.5">→</span>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                Long-term pelvic floor health after hysterectomy
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Recovery from hysterectomy is not a 6-week process — it&apos;s a 6-to-12-month process
                for most women, and the pelvic floor continues to adapt for longer than that.
                Long-term success means maintaining what PT built: proper load management, good
                intra-abdominal pressure mechanics, and a home exercise routine that keeps the pelvic
                floor coordinated and responsive. Most women do not need indefinite PT visits —
                they need a solid program and the knowledge to self-manage.
              </p>
              <p className="text-stone-600 leading-relaxed">
                If symptoms recur (increased pelvic pressure, leaking resumes, painful intercourse)
                a PT check-in — even years after surgery — can identify and address the cause early.
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
              <h2 className="font-semibold text-stone-800 mb-2">Find a pelvic floor PT near you</h2>
              <p className="text-sm text-stone-600 mb-4">
                Search our directory for pelvic floor PTs who specialize in post-surgical
                rehabilitation, prolapse, and hysterectomy recovery.
              </p>
              <Link href="/listings" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Browse the Directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="pt-8 border-t border-stone-100">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
                <Link href="/guides/pelvic-floor-pt-for-endometriosis" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT for Endometriosis →</Link>
                <Link href="/guides/kegels-vs-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Kegels vs. Pelvic Floor PT →</Link>
                <Link href="/guides/does-pelvic-floor-pt-hurt" className="text-sm text-teal hover:opacity-80 font-medium">Does Pelvic Floor PT Hurt? →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
