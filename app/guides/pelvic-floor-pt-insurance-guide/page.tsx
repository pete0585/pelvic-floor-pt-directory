import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Find a Pelvic Floor PT That Takes Your Insurance | PelvicFloorPTDirectory.com',
  description: 'Step-by-step guide to getting pelvic floor physical therapy covered by insurance — what to ask your insurer, how referrals work, and what a superbill is.',
}

const FAQ = [
  { q: 'How do I know if my insurance covers pelvic floor PT?', a: 'Call the member services number on the back of your insurance card. Ask: (1) Does my plan cover outpatient physical therapy? (2) Is a referral or prior authorization required? (3) Is pelvic floor PT specifically covered, or are there any exclusions? (4) What is my deductible and coinsurance for PT? Get the representative\'s name and the call reference number for your records.' },
  { q: 'Do I need a doctor\'s referral for pelvic floor PT?', a: 'It depends on your state and insurance plan. Over 20 US states have "direct access" laws allowing patients to see a PT without a physician referral. However, your insurance may still require a referral to cover the visit — even in direct-access states. Your PT\'s office can often help navigate this and submit the prior auth on your behalf.' },
  { q: 'What is a superbill and how does it help?', a: 'A superbill is a detailed receipt with all the billing codes your PT used — the ICD-10 diagnosis codes, CPT procedure codes, provider NPI, and fees charged. You submit it to your insurance for out-of-network reimbursement. If your plan has out-of-network benefits, you may recover 40-80% of the cost. Ask any cash-pay pelvic PT if they provide superbills.' },
  { q: 'Why do some pelvic floor PTs not accept insurance?', a: 'Insurance companies reimburse PT sessions at rates that often do not cover the cost of a 60-minute pelvic floor session — particularly when internal assessment and manual therapy are involved. Many specialized pelvic PTs have left insurance networks so they can spend full sessions with patients rather than seeing 10-12 patients per day to keep the practice viable. This is why cash-pay specialty practices often deliver better care, even at higher out-of-pocket cost.' },
]

const STEPS = [
  { n: '1', title: 'Get a diagnosis code from your doctor', body: 'Pelvic floor PT is most easily covered with a physician referral that includes a diagnosis code matching your symptoms — N39.3 (stress incontinence), N81.1 (cystocele), or M54.5 (low back pain) are among the most commonly used. Schedule a telehealth visit with your OB/GYN or primary care doctor to get a referral with the appropriate code.' },
  { n: '2', title: 'Call your insurance before booking', body: 'Ask specifically: Does my plan cover outpatient PT? Is prior authorization required? What is my deductible status and coinsurance for PT visits? In-network providers are covered at a better rate than out-of-network. Confirm the provider you want to see is actually in-network — directories are not always current.' },
  { n: '3', title: 'Ask the PT office about billing upfront', body: 'Before your first appointment, ask: What insurance do you accept? What is the estimated out-of-pocket cost per session after my insurance? If you are not in-network, do you provide superbills? A good PT office will give you a clear estimate before you commit.' },
  { n: '4', title: 'Consider the superbill option for out-of-network PTs', body: 'The best pelvic floor PTs in your area may not be in-network. If your plan has out-of-network benefits (common in PPO plans), the math often works: a $200 session minus 60% out-of-network reimbursement = $80 out-of-pocket. Many patients find this worth it for a PT with specific expertise in their condition.' },
  { n: '5', title: 'Appeal denials — they are common and often successful', body: 'If insurance denies your PT claim, appeal it. Ask your PT to write a letter of medical necessity describing how your specific condition requires specialized pelvic floor rehabilitation. Insurance denials are often overturned on appeal, especially when accompanied by clinical documentation.' },
]

export default function InsuranceGuidePage() {
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
            <span className="text-stone-600">Insurance Guide</span>
          </nav>

          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            How to Find a Pelvic Floor PT That Takes Your Insurance
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            A practical guide to navigating insurance coverage for pelvic floor physical therapy.
          </p>

          <div className="prose-guide">

            <h2>The insurance reality for pelvic floor PT</h2>
            <p>
              Here is the honest situation: pelvic floor PT is covered by most insurance plans,
              but the best pelvic floor PTs are often not in-network. The reason is economic — a
              60-minute specialized pelvic PT session involving internal assessment and manual therapy
              is reimbursed by insurance at rates designed for 15-minute general PT exercises. Most
              high-quality pelvic floor specialists who do this full time cannot afford to stay
              in-network and see patients properly.
            </p>
            <p>
              This does not mean you have to pay full cash-pay rates. It means your strategy should
              be: (1) use in-network options if a qualified pelvic floor PT is available in your
              network, (2) use the superbill out-of-network path if your plan has out-of-network
              benefits, or (3) plan cash-pay as a medical expense and budget accordingly.
            </p>

            <h2>Step-by-step guide to getting pelvic floor PT covered</h2>
            <div className="space-y-5 my-8">
              {STEPS.map(({ n, title, body }) => (
                <div key={n} className="flex gap-4 p-5 bg-cream-100 rounded-xl">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal text-white text-sm font-bold flex items-center justify-center">
                    {n}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-700 mb-2">{title}</p>
                    <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>What pelvic floor PT actually costs (with and without insurance)</h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-cream-200 text-left">
                    <th className="p-3 font-semibold text-stone-700">Scenario</th>
                    <th className="p-3 font-semibold text-stone-700">Estimated cost per session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-300">
                  {[
                    ['In-network with deductible met', '$20-60 copay/coinsurance'],
                    ['In-network, deductible not met', '$80-180 depending on your plan'],
                    ['Out-of-network with PPO + superbill (50% OON benefit)', '$80-130 after reimbursement'],
                    ['Out-of-network with HMO (no OON benefit)', '$150-280 full cash-pay'],
                    ['Medicare Part B (with 80/20 split)', '$25-50 after coinsurance'],
                    ['TRICARE (military/veteran)', '$20-60 depending on plan type'],
                  ].map(([scenario, cost]) => (
                    <tr key={String(scenario)} className="bg-white hover:bg-cream-50">
                      <td className="p-3 text-stone-600">{scenario}</td>
                      <td className="p-3 text-stone-600 font-medium">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-teal/10 border border-teal/20 rounded-xl p-5 flex gap-3">
              <DollarSign className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
              <p className="text-sm text-stone-600">
                <strong>The ROI perspective:</strong> A full course of pelvic floor PT (8-12 sessions)
                runs $1,200-$3,360 at cash-pay rates. The conditions it treats — incontinence, prolapse,
                painful sex — affect quality of life every single day. Most patients consider it
                one of the most valuable healthcare investments they have made.
              </p>
            </div>
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
              Find a pelvic floor PT near you
            </h2>
            <p className="text-teal-100 mb-6">
              Use the directory to find in-network and cash-pay specialists in your area.
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
