import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Questions to Ask Your Pelvic Floor PT Before Your First Appointment | PelvicFloorPTDirectory.com',
  description: '15 questions to ask a pelvic floor physical therapist before your first appointment — credentials, approach, internal exams, and what to expect.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/questions-to-ask-your-pelvic-floor-pt' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'What should I ask about a pelvic floor PT\'s credentials?',
    a: "Ask about their physical therapy license (all pelvic floor PTs must be licensed PTs) and any additional pelvic health certifications: CAPP (Certificate of Achievement in Pelvic Health Physical Therapy from APTA), WCS (Women's Health Clinical Specialist), BCB-PMD (Biofeedback Certification), or PRPC (Pelvic Rehabilitation Practitioner Certification). None of these are legally required to practice pelvic floor PT, but they indicate dedicated training in this specialty area. Also ask how many years they have been practicing pelvic floor PT specifically.",
  },
  {
    q: 'Do I have to have an internal exam for pelvic floor PT?',
    a: "No. Internal pelvic exams (intravaginal or intrarectal assessment) are a tool, not a requirement. Many conditions can be partially assessed externally. However, internal assessment provides significantly more precise information about pelvic floor muscle tone, trigger points, and coordination — most experienced pelvic floor PTs recommend it for patients who are willing and comfortable. You always have the right to decline an internal exam, and a good PT will respect that without dismissing you as a patient.",
  },
  {
    q: 'How many sessions will I need?',
    a: "A good pelvic floor PT will not promise a fixed number of sessions at intake — outcomes depend on what they find in the assessment. A reasonable expectation is 6-12 sessions for most conditions, with reassessment at 4-6 sessions. Acute issues (new postpartum recovery) often resolve faster than chronic pelvic pain syndromes (2+ years of symptoms) which may require a longer course. Ask for a rough estimate based on your presentation — and be cautious of any PT who promises resolution in a specific number of sessions without examining you first.",
  },
  {
    q: 'Will every session involve an internal exam?',
    a: "No. Internal assessment is typically done on intake and periodically to assess progress — not every session. Most pelvic floor PT sessions after the initial evaluation involve manual therapy (external myofascial work, breathwork, neuromuscular re-education), exercise instruction, home program teaching, and education. Internal assessment may be done monthly or as needed to check progress.",
  },
]

const QUESTIONS = [
  { category: 'Credentials & Training', items: ['Are you a licensed physical therapist?', 'Do you hold any pelvic floor PT certifications (CAPP, WCS, BCB-PMD, PRPC)?', 'What percentage of your practice is pelvic floor PT?', 'Have you treated my specific condition before?'] },
  { category: 'Your Assessment', items: ['What does the initial evaluation involve?', 'Will you do an internal assessment? Is it required or optional?', 'What do you need from me before the first appointment?', 'How long is the first appointment?'] },
  { category: 'Treatment Approach', items: ['What does a typical session look like after the evaluation?', 'Will I have home exercises?', 'How do you track progress?', 'When would you refer me to another provider?'] },
  { category: 'Logistics', items: ['Do you accept my insurance?', 'What is the cancellation policy?', 'Do you offer telehealth follow-ups?'] },
]

export default function QuestionsForPelvicPTPage() {
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
            <span className="text-stone-600">Questions to Ask Your PT</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
              15 Questions to Ask Your Pelvic Floor PT Before Your First Appointment
            </h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Pelvic floor PT is a vulnerable specialty — internal exams, intimate symptoms, and treatment
              of areas that feel deeply personal. The right PT makes you feel safe, seen, and in control.
              These questions help you vet a provider before committing, understand what to expect, and
              make sure you&apos;re getting the level of care your condition requires.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <div className="space-y-8">
                {QUESTIONS.map((group) => (
                  <div key={group.category}>
                    <h2 className="text-xl font-semibold text-stone-800 mb-4">{group.category}</h2>
                    <div className="space-y-3">
                      {group.items.map((q, i) => (
                        <div key={q} className="flex items-start gap-3 bg-white rounded-xl border border-stone-100 p-4 shadow-sm">
                          <span className="flex-shrink-0 w-7 h-7 bg-teal-50 rounded-full flex items-center justify-center text-teal text-sm font-bold">
                            {i + 1}
                          </span>
                          <p className="text-stone-700 leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                Red Flags to Watch For
              </h2>
              <div className="space-y-3">
                {[
                  { flag: 'They promise results in a set number of sessions at intake', why: 'No ethical PT can guarantee outcomes without an evaluation.' },
                  { flag: 'They insist on an internal exam without discussing it first', why: 'Internal assessment requires informed consent. A PT who pushes without discussion is a concern.' },
                  { flag: 'They cannot explain what certification or training they have in pelvic floor PT', why: 'Any licensed PT can legally do pelvic floor PT — but without specific training, the quality varies widely.' },
                  { flag: 'They dismiss your symptoms or tell you it is normal', why: 'Pelvic pain, incontinence, and prolapse are common but not normal. A good PT validates your symptoms.' },
                ].map((item) => (
                  <div key={item.flag} className="rounded-xl border border-red-100 bg-red-50 p-4">
                    <p className="font-semibold text-red-700 text-sm">{item.flag}</p>
                    <p className="text-sm text-stone-600 mt-1">{item.why}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-stone-800">Common Questions Answered</h2>
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-stone-800 mb-2">{q}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </section>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6">
              <h2 className="font-semibold text-stone-800 mb-2">Find a Pelvic Floor PT near you</h2>
              <p className="text-sm text-stone-600 mb-4">
                Browse verified pelvic floor physical therapists by location, insurance, and specialty.
              </p>
              <Link href="/listings" className="inline-flex items-center gap-2 bg-teal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90">
                Browse the Directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="pt-8 border-t border-stone-100">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Related Guides</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-sm text-teal hover:opacity-80 font-medium">What is Pelvic Floor PT? →</Link>
                <Link href="/guides/does-pelvic-floor-pt-hurt" className="text-sm text-teal hover:opacity-80 font-medium">Does Pelvic Floor PT Hurt? →</Link>
                <Link href="/guides/pelvic-floor-pt-insurance-guide" className="text-sm text-teal hover:opacity-80 font-medium">Insurance Coverage Guide →</Link>
                <Link href="/guides/kegels-vs-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Kegels vs. Pelvic Floor PT →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
