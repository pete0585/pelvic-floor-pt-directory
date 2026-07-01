import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT for Interstitial Cystitis (IC) | Pelvic Floor Directory',
  description:
    'Pelvic floor physical therapy is one of the most effective treatments for interstitial cystitis. Learn how PT addresses the muscular dysfunction driving IC pain and urgency.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/pelvic-floor-pt-for-ic' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Can pelvic floor PT cure interstitial cystitis?',
    a: "Pelvic floor PT cannot cure the underlying urothelial dysfunction in interstitial cystitis, but it can dramatically reduce the muscular component of IC symptoms — which drives much of the pain, urgency, and frequency most IC patients experience. Research shows that pelvic floor PT significantly reduces symptom burden in the majority of IC patients who complete a course of treatment. Most patients see meaningful improvement after 8-12 sessions; some achieve long-term symptom control with periodic maintenance care.",
  },
  {
    q: 'Is internal pelvic floor PT safe for IC patients?',
    a: "Yes — when performed by an experienced pelvic floor PT who specializes in IC, internal myofascial release is both safe and central to effective IC treatment. The levator ani and obturator internus muscles, accessible via internal assessment, are the most common trigger point sites in IC. Many IC patients are initially apprehensive about internal work, but a skilled PT will proceed at your pace and prioritize your comfort throughout. External techniques (hip, abdomen, adductors) are always used in conjunction with or instead of internal work depending on your tolerance.",
  },
  {
    q: "What's the difference between pelvic floor PT for IC and standard pelvic floor PT?",
    a: "IC-specific pelvic floor PT focuses on downtraining (relaxing) an overactive pelvic floor — the opposite of what most people associate with pelvic floor PT. There are NO Kegel exercises for IC patients with hypertonic pelvic floor muscles; Kegels tighten already too-tight muscles and worsen IC symptoms. Treatment instead focuses on releasing trigger points, reducing muscle guarding, bladder retraining for urgency, and addressing the nervous system sensitization that amplifies pain. A PT who treats IC will specifically ask about your bladder symptoms and tailor treatment accordingly.",
  },
  {
    q: 'How do I find a pelvic floor PT who has experience with IC?',
    a: "Ask specifically when you call or book. Not all pelvic floor PTs treat IC — it requires specialized knowledge of hypertonic pelvic floor dysfunction and bladder retraining protocols. The Interstitial Cystitis Association (ICA) maintains a provider directory and can help you find IC-experienced PTs in your area. NAFC (National Association for Continence) and APTA Pelvic Health SIG are also resources. Look for PTs who mention IC, pelvic pain, or bladder pain syndrome in their specialty listings.",
  },
]

const sections = [
  {
    heading: 'What is Interstitial Cystitis?',
    content: `Interstitial cystitis (IC), also called bladder pain syndrome, is a chronic condition affecting an estimated 8 million women and 4 million men in the United States. IC is characterized by bladder pressure, pelvic pain, and urinary urgency and frequency that persist in the absence of infection or other identifiable causes. Standard antibiotics — the first response most patients receive — do not help IC because there is no bacterial infection driving symptoms.

The medical understanding of IC has evolved significantly. IC is no longer viewed purely as a bladder disease. Research increasingly recognizes the role of the pelvic floor musculature in driving — and perpetuating — IC symptoms. Many IC patients have never been told that their muscles are a central part of the problem.`,
  },
  {
    heading: 'Why Pelvic Floor PT Helps IC',
    content: `More than 70% of IC patients have pelvic floor muscle dysfunction — specifically hypertonia, meaning the muscles are overactive and chronically tight. These tight muscles create:

- Referred pain to the bladder, urethra, and perineum
- Increased urgency by putting pressure on the bladder
- Reduced bladder capacity by mechanically compressing the organ
- Pain with sitting, intercourse, and prolonged standing

The muscles most commonly involved are the levator ani group (pubococcygeus, iliococcygeus) and the obturator internus. Trigger points in these muscles can reproduce a patient's IC symptoms when compressed — which is diagnostically and therapeutically significant.

Pelvic floor PT addresses the muscular dysfunction even when the urothelium remains inflamed. Patients often experience significant symptom reduction through PT alone, and PT is most effective as part of a multimodal IC treatment plan alongside appropriate medical management.`,
  },
  {
    heading: 'What IC-Specific Pelvic Floor PT Involves',
    content: `IC-specific pelvic floor PT is meaningfully different from postpartum or incontinence PT. Key components include:

**Internal and external myofascial release.** Trigger point therapy targeting the levator ani and obturator internus — the muscles most commonly implicated in IC — is the foundation of treatment. Internal manual therapy (with full informed consent) allows direct access to these muscles.

**Bladder retraining.** Urgency suppression techniques teach the bladder and nervous system to tolerate more before triggering urgent sensation. Timed voiding and progressive bladder holds are used to extend the window between bathroom visits.

**Posture and breathing retraining.** Chronic pelvic guarding is often driven by altered breathing mechanics and postural patterns. Diaphragmatic breathing and core relaxation help down-regulate the entire pelvic floor.

**No Kegel exercises.** This is critical for IC patients with hypertonic pelvic floor: Kegel exercises strengthen and tighten muscles that are already too tight. A PT who recommends Kegels for IC without first assessing muscle tone has not fully evaluated your pelvic floor. Relaxation and lengthening exercises — reverse Kegels, diaphragmatic breathing, child's pose variations — replace strengthening in IC treatment protocols.`,
  },
  {
    heading: 'How to Find a PT Who Treats IC',
    content: `Not every pelvic floor PT is prepared to treat IC. Seek out PTs who:

- Specifically mention IC, bladder pain syndrome, or pelvic pain in their specialty areas
- Are members of the APTA Pelvic Health SIG (Section on Women's Health or pelvic health specialization)
- Are listed in the ICA (Interstitial Cystitis Association) provider directory
- Ask about your bladder symptoms in intake — not just pelvic floor strength

Finding an experienced IC pelvic floor PT may require some research in your area. Telehealth pelvic floor PT can be appropriate for bladder retraining, education, and home exercise components of IC treatment — though in-person sessions are needed for manual therapy. Use this directory and filter by your location to find pelvic floor PTs near you, then contact them directly to ask about IC experience.`,
  },
]

export default function PelvicFloorPTForICPage() {
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
          <span className="text-stone-600">Pelvic Floor PT for IC</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
            Pelvic Floor Physical Therapy for Interstitial Cystitis (IC)
          </h1>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Interstitial cystitis (IC) is one of the most undertreated chronic conditions in pelvic
            health — and pelvic floor physical therapy is one of its most evidence-supported treatments.
            More than 70% of IC patients have an overactive, hypertonic pelvic floor driving their
            symptoms. Here&apos;s what effective IC-specific PT looks like.
          </p>
        </header>

        <div className="space-y-10">
          {sections.map(({ heading, content }) => (
            <section key={heading}>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">{heading}</h2>
              <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed">
                {content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 last:mb-0 whitespace-pre-line">{para}</p>
                ))}
              </div>
            </section>
          ))}

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
          <h3 className="font-semibold text-stone-800 mb-3">Find a Pelvic Floor PT Who Treats IC</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold">
              Browse the Directory
            </Link>
            <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-teal hover:opacity-80 font-medium">What Is Pelvic Floor PT? →</Link>
            <Link href="/guides/pelvic-floor-pt-for-endometriosis" className="text-teal hover:opacity-80 font-medium">Pelvic Floor PT for Endometriosis →</Link>
            <Link href="/categories/pelvic-floor-pt-for-men" className="text-teal hover:opacity-80 font-medium">Pelvic Floor PT for Men →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
