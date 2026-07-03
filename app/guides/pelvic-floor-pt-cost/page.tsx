import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Much Does Pelvic Floor Physical Therapy Cost? | PelvicFloorPTDirectory.com',
  description:
    'Pelvic floor PT sessions range from $100–$350 per visit. Most insurance covers it as physical therapy. Here is what affects cost and how to get it covered.',
}

const FAQ = [
  { q: 'How much does a pelvic floor PT session cost?', a: 'Pelvic floor PT sessions typically cost $100–$350 per visit at private-pay rates. Initial evaluations (60–90 minutes) are usually at the higher end of that range; follow-up sessions (45–60 minutes) are lower. Hospital-based pelvic PT programs bill through your hospital benefit and may cost less out-of-pocket with insurance. Geographic location matters — urban markets and coastal areas run 20–40% higher than the national average.' },
  { q: 'Does insurance cover pelvic floor physical therapy?', a: 'Most insurance plans cover pelvic floor PT as physical therapy when medically necessary. This includes major commercial plans, most Medicaid programs, and Medicare Part B. Coverage usually requires a referral or prescription from your OB, urogynecologist, or primary care physician. Your plan may have visit limits (commonly 20–60 visits per year) and may require meeting your deductible first. Always call and ask: "Does my plan cover pelvic floor physical therapy for [your specific diagnosis]?"' },
  { q: 'How many sessions of pelvic floor PT will I need?', a: 'Most patients require 6–16 sessions to achieve their goals. Simple conditions — mild stress incontinence, postpartum recovery — often resolve in 6–8 sessions over 6–8 weeks. Complex conditions — chronic pelvic pain, vaginismus, advanced prolapse — typically require 12–20+ sessions. Most pelvic PTs provide a session estimate after your initial evaluation.' },
  { q: 'What is the total cost of a full course of pelvic floor PT?', a: 'At private-pay rates, a typical 8-session course costs $800–$2,400 depending on your therapist\'s rate and session length. A 16-session course: $1,600–$5,600. With insurance coverage, your cost is typically a copay ($25–$75/session) or coinsurance after your deductible. Most patients with insurance pay $200–$1,200 total for a full course of care.' },
  { q: 'Can I do pelvic floor PT through telehealth?', a: 'Yes, though with limitations. Telehealth pelvic PT is effective for education, exercise instruction, breathing and coordination techniques, and lifestyle modification. It cannot replace in-person internal assessment and hands-on treatment. Many patients start in-person for the initial evaluation and internal assessment, then transition to telehealth for follow-up exercise coaching — which reduces cost and travel significantly.' },
  { q: 'Is pelvic floor PT covered by an HSA or FSA?', a: 'Yes. Pelvic floor physical therapy sessions are HSA and FSA eligible as a qualified medical expense. This effectively reduces your cost by your marginal tax rate (22–37% for most earners). If you are paying out-of-pocket, using HSA/FSA funds is a meaningful savings.' },
]

export default function PelvicFloorCostPage() {
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
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-teal transition-colors">Directory</Link>
            <span>/</span>
            <span className="text-stone-600">Pelvic Floor PT Cost Guide</span>
          </nav>
          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Cost guide</span>
          </div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            How Much Does Pelvic Floor Physical Therapy Cost?
          </h1>
          <p className="text-stone-500 mb-8 leading-relaxed">
            Pelvic floor PT sessions range from $100 to $350 per visit at private-pay rates — but
            most insurance covers it as physical therapy. Here is what affects cost and how to get
            your treatment covered.
          </p>

          <div className="prose-guide space-y-8">
            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-4">Cost at a glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-stone-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-teal text-white">
                      <th className="text-left px-4 py-3 font-semibold">Visit Type</th>
                      <th className="text-left px-4 py-3 font-semibold">Private-Pay Rate</th>
                      <th className="text-left px-4 py-3 font-semibold">With Insurance (typical)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: 'Initial evaluation (60–90 min)', pp: '$175–$350', ins: '$25–$75 copay' },
                      { type: 'Follow-up session (45–60 min)', pp: '$100–$250', ins: '$25–$75 copay' },
                      { type: 'Telehealth session', pp: '$80–$175', ins: 'Often same as in-person' },
                      { type: 'Full 8-session course', pp: '$800–$2,400', ins: '$200–$600 total' },
                    ].map((row, i) => (
                      <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                        <td className="px-4 py-3 font-medium text-stone-700">{row.type}</td>
                        <td className="px-4 py-3 text-stone-600">{row.pp}</td>
                        <td className="px-4 py-3 text-stone-600">{row.ins}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-800 mb-4">What drives cost differences</h2>
              <div className="space-y-3">
                {[
                  { factor: 'Credentials and specialization', detail: 'Pelvic PTs with additional certifications (PRPC — Pelvic Rehabilitation Practitioner Certified — or WCS) typically charge more. Therapists who also treat complex conditions like vaginismus, PGAD, or pudendal neuralgia may have longer sessions with higher rates.' },
                  { factor: 'Practice setting', detail: 'Hospital-based outpatient PT programs have different billing structures than private-practice pelvic PTs. Some hospital-based programs are less expensive with insurance; private practices may be more flexible with scheduling and treatment time.' },
                  { factor: 'Session length', detail: 'Many pelvic PTs offer one-on-one sessions of 45–60 minutes — versus the 20-minute sessions common in insurance-volume PT practices. Longer sessions cost more per visit but often require fewer total visits.' },
                  { factor: 'Geographic market', detail: 'New York City, San Francisco, Los Angeles, and Seattle-area pelvic PTs charge significantly more than those in smaller markets. Telehealth pelvic PT can give you access to highly experienced therapists in lower-cost markets.' },
                ].map((item) => (
                  <div key={item.factor} className="rounded-xl border border-stone-200 bg-white p-5">
                    <p className="font-semibold text-stone-700">{item.factor}</p>
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
            <h2 className="text-2xl font-bold text-white mb-3">Find a Pelvic Floor PT Near You</h2>
            <p className="text-teal-50 mb-6">Search by location, insurance, or condition to find a specialist who fits your needs and budget.</p>
            <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-teal hover:bg-stone-50 transition-colors">
              Browse Pelvic Floor PTs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200">
            <h3 className="font-semibold text-stone-700 mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:text-teal-700 font-medium">Insurance Coverage for Pelvic Floor PT →</Link>
              <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:text-teal-700 font-medium">What Is Pelvic Floor PT? →</Link>
              <Link href="/guides/postpartum-pelvic-floor-pt" className="text-sm text-teal hover:text-teal-700 font-medium">Postpartum Pelvic Floor PT Guide →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
