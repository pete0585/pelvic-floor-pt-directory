import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Men and Pelvic Floor PT: Why It's Not Just for Women | PelvicFloorPTDirectory.com",
  description: "Pelvic floor PT helps men with incontinence, chronic pelvic pain, post-prostatectomy recovery, and erectile dysfunction. Here's what to know before your first visit.",
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/men-and-pelvic-floor-pt' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'Do men need pelvic floor physical therapy?',
    a: "Yes. The male pelvic floor supports the bladder, bowel, and sexual function the same way it does in women — it's just less commonly discussed. Men develop pelvic floor dysfunction from surgery (especially prostatectomy), chronic pelvic tension, sports injuries, and nerve damage. Pelvic floor PT is evidence-based for male incontinence, chronic pelvic pain syndrome (CPPS), and post-surgical pelvic rehab.",
  },
  {
    q: 'What conditions in men are treated with pelvic floor PT?',
    a: "The most common: urinary incontinence after prostate surgery (radical prostatectomy), chronic pelvic pain syndrome / chronic prostatitis, erectile dysfunction with a pelvic floor component, interstitial cystitis in men, coccyx (tailbone) pain, and pudendal neuralgia. Some men also benefit from pelvic floor PT for overactive bladder, urgency-frequency, and post-rectal surgery recovery.",
  },
  {
    q: 'How does pelvic floor PT work for men?',
    a: "A pelvic floor PT will assess muscle tone, strength, coordination, and relaxation — both externally (hip flexors, core, gluteals) and via internal pelvic floor assessment if indicated and consented. Treatment typically includes manual therapy, trigger point release, breathing and movement retraining, bladder retraining (for urgency/frequency), and a home exercise program. Most men complete 6–12 sessions over 2–3 months.",
  },
  {
    q: 'Is the pelvic floor internal exam required for men?',
    a: "No — it is optional and requires your explicit consent. Many pelvic floor PTs can assess and treat male pelvic floor dysfunction effectively using external techniques only (surface EMG biofeedback, external palpation, hip and core assessment). However, internal assessment via the rectum provides the most direct information about pelvic floor muscle tone and trigger points. Discuss your comfort level with the PT before your first appointment.",
  },
  {
    q: 'How do I find a pelvic floor PT who works with men?',
    a: "Not all pelvic floor PTs see male patients — many specialize exclusively in women's health. Use the directory search and filter for 'men's pelvic health' or look for PTs who list prostatectomy recovery, CPPS, or male pelvic floor in their specialty areas. Major cities typically have several options; in smaller markets, ask about telehealth for education and home exercise programming.",
  },
]

const conditions = [
  {
    condition: 'Post-prostatectomy incontinence',
    detail: 'Urinary leakage after radical prostatectomy is one of the most common — and most treatable — outcomes. Pelvic floor PT started before surgery (prehabilitation) and immediately after catheter removal significantly reduces recovery time. Most men regain continence in 3–12 months; PT accelerates that timeline.',
  },
  {
    condition: 'Chronic pelvic pain syndrome (CPPS)',
    detail: "Also called chronic prostatitis, CPPS affects roughly 10-15% of men at some point. The pelvic floor component — hypertonic (too-tight) muscles that create referred pain, urinary urgency, and perineal pressure — is often undertreated. Pelvic floor PT focused on downtraining and trigger point release is often more effective than antibiotics alone for non-bacterial CPPS.",
  },
  {
    condition: 'Erectile dysfunction (pelvic floor component)',
    detail: 'The bulbocavernosus and ischiocavernosus muscles of the pelvic floor play a direct role in erectile rigidity and ejaculatory function. Pelvic floor PT doesn\'t replace medical evaluation for ED, but in men where pelvic floor hypotonicity or nerve sensitivity is a contributing factor — especially post-prostatectomy — targeted PT can improve outcomes alongside other treatment.',
  },
  {
    condition: 'Overactive bladder / urgency-frequency',
    detail: 'Men with urinary urgency, frequency, or nocturia that isn\'t explained by prostate size or obstruction often have a pelvic floor component. Bladder retraining, pelvic floor downtraining, and urge suppression techniques are first-line treatments that reduce reliance on medication for many men.',
  },
]

export default function MenPelvicFloorPage() {
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-1.5 text-sm text-stone-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-teal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-teal transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-stone-600">Men and Pelvic Floor PT</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
            Men and Pelvic Floor PT: Why It&apos;s Not Just for Women
          </h1>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Pelvic floor physical therapy is most commonly associated with postpartum women — but
            men have a pelvic floor too, and it breaks down in predictable ways. From post-prostatectomy
            incontinence to chronic pelvic pain, pelvic floor PT is one of the most underutilized
            treatments in men&apos;s health.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Conditions Pelvic Floor PT Treats in Men</h2>
            <div className="space-y-4">
              {conditions.map(({ condition, detail }) => (
                <div key={condition} className="border border-stone-200 rounded-xl p-5">
                  <h3 className="font-semibold text-stone-800 mb-2">{condition}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">What to Expect at Your First Appointment</h2>
            <div className="space-y-3">
              {[
                { step: 'History and intake', detail: "Your PT will review your symptom history, previous surgeries (especially prostate, colorectal, or hernia), bladder habits, and pain patterns. Be direct — pelvic floor PTs are clinically trained and won't be caught off guard." },
                { step: 'External assessment', detail: 'Assessment of posture, hip mobility, core function, and external pelvic floor muscle tone. This is always done first and doesn\'t require disrobing beyond shorts.' },
                { step: 'Internal assessment (optional)', detail: 'If you consent, a rectal internal assessment gives the most direct view of pelvic floor muscle function. It\'s brief, uses a gloved finger, and takes under 5 minutes. Many men find it less uncomfortable than expected.' },
                { step: 'Treatment and home program', detail: 'Most first sessions include some manual treatment and education, plus a home exercise program. You\'ll have clear goals and a timeline before you leave.' },
              ].map(({ step, detail }) => (
                <div key={step} className="flex gap-4 p-4 bg-stone-50 rounded-xl">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {['1','2','3','4'][[{ step, detail }].findIndex(() => true) || 0]}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-800 text-sm mb-1">{step}</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Common Questions</h2>
            <div className="space-y-4">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white border border-stone-200 rounded-xl p-5">
                  <h3 className="font-semibold text-stone-800 mb-2 text-sm">{q}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-100">
          <h3 className="font-semibold text-stone-800 mb-3">Find a Pelvic Floor PT Who Treats Men</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold">
              Browse the Directory
            </Link>
            <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-teal hover:opacity-80 font-medium">What Is Pelvic Floor PT? →</Link>
            <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
