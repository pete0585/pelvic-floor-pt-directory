import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is Pelvic Floor Physical Therapy? A Complete Guide | PelvicFloorPTDirectory.com',
  description: 'What does a pelvic floor PT actually do? Learn what to expect at your first appointment, which conditions pelvic floor PT treats, and how to find a qualified specialist.',
}

const FAQ = [
  { q: 'What is pelvic floor physical therapy?', a: 'Pelvic floor physical therapy is a specialized form of physical therapy that assesses and treats the muscles, nerves, and connective tissue of the pelvic floor — the group of muscles that form the base of your pelvis. A pelvic floor PT has advanced training beyond general physical therapy, typically including internal (vaginal or rectal) examination and treatment.' },
  { q: 'What conditions does pelvic floor PT treat?', a: 'Pelvic floor PT treats a wide range of conditions: urinary and fecal incontinence, pelvic organ prolapse, pelvic pain, painful sex (dyspareunia), vaginismus, interstitial cystitis, postpartum recovery (including diastasis recti), endometriosis-related pain, and male pelvic floor dysfunction (post-prostatectomy incontinence, pelvic pain). It is also used preventively during pregnancy for birth preparation.' },
  { q: 'What happens at a first pelvic floor PT appointment?', a: 'Your first appointment typically lasts 60-90 minutes. It includes a detailed history about your symptoms, lifestyle, and goals; an external assessment of your posture, movement, and hip/core function; and, with your consent, an internal pelvic floor assessment. Your PT explains everything before doing it. Nothing is done without your consent, and you can stop at any time.' },
  { q: 'Is pelvic floor PT covered by insurance?', a: 'Most major insurance plans cover pelvic floor PT as physical therapy when medically necessary. Coverage depends on your specific plan, diagnosis code, and whether a referral is required. Many cash-pay pelvic PTs provide superbills for out-of-network reimbursement. Always verify with your insurance before your first appointment.' },
  { q: 'How long does pelvic floor PT take?', a: 'Most patients see meaningful improvement within 6-12 sessions over 6-10 weeks. Simpler presentations (mild stress incontinence, postpartum recovery) often resolve in 6-8 sessions. Complex conditions (chronic pelvic pain, severe prolapse, vaginismus) typically require 12-20 sessions. Your PT will give you a personalized timeline after the initial assessment.' },
]

export default function WhatIsPelvicFloorPTPage() {
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
            <span className="text-stone-600">What Is Pelvic Floor PT</span>
          </nav>

          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            What Is Pelvic Floor Physical Therapy?
          </h1>
          <p className="text-stone-400 text-sm mb-8">A guide for anyone who has been told "you need pelvic floor PT" and is figuring out what that actually means.</p>

          {/* Content */}
          <div className="prose-guide">

            <h2>The basics</h2>
            <p>
              Pelvic floor physical therapy is specialized PT focused on the muscles, nerves, and
              connective tissue of the pelvic floor — the hammock of muscle that runs from your pubic
              bone to your tailbone and supports your bladder, bowel, and uterus (or prostate, in men).
            </p>
            <p>
              Like other PT specialties (orthopedic PT for knee injuries, neurological PT for stroke
              recovery), pelvic floor PT requires advanced training beyond the base PT license.
              Most pelvic floor PTs have completed hundreds of hours of post-graduate coursework and
              clinical training specifically in pelvic assessment and treatment.
            </p>

            <h2>What a pelvic floor PT actually does</h2>
            <p>
              The most distinctive feature of pelvic floor PT — and the one that makes some people
              nervous — is internal assessment. A trained pelvic floor PT can assess the muscles
              internally (vaginally or rectally) to understand their strength, coordination, resting
              tone, and trigger point patterns. This is how they know whether your pelvic floor is
              too weak, too tight, uncoordinated, or some combination.
            </p>
            <p>
              Critically: internal assessment is done only with your explicit consent. Everything is
              explained before it happens. You can stop at any time. Many first appointments involve
              only external assessment, and your PT will move at your pace.
            </p>
            <p>
              Beyond assessment, treatment includes manual therapy (internal and external release of
              trigger points and tight tissue), therapeutic exercise (strengthening, coordination,
              and relaxation), behavioral education (bladder habits, bowel mechanics, breathing
              patterns), and a home exercise program you do between sessions.
            </p>

            <h2>Conditions treated by pelvic floor PT</h2>
            <p>Pelvic floor PT is first-line treatment for:</p>
            <ul>
              <li><strong>Urinary incontinence</strong> — stress (leaking with coughing, sneezing, exercise), urgency, mixed, and overflow</li>
              <li><strong>Pelvic organ prolapse</strong> — symptom management, prevention of progression, post-surgical rehabilitation</li>
              <li><strong>Postpartum recovery</strong> — diastasis recti, perineal scar tissue, return to exercise, incontinence after delivery</li>
              <li><strong>Pelvic pain</strong> — including endometriosis-related pain, interstitial cystitis, vulvodynia, coccydynia</li>
              <li><strong>Painful sex</strong> — dyspareunia, vaginismus, provoked vestibulodynia</li>
              <li><strong>Pregnancy-related pain</strong> — pubic symphysis pain, sacroiliac joint dysfunction, round ligament pain</li>
              <li><strong>Male pelvic floor dysfunction</strong> — post-prostatectomy incontinence, chronic prostatitis/pelvic pain, erectile dysfunction</li>
              <li><strong>Pediatric pelvic issues</strong> — bedwetting, constipation, voiding dysfunction</li>
            </ul>

            <h2>What to expect at your first appointment</h2>
            <p>
              Your first appointment runs 60-90 minutes. Here is what typically happens:
            </p>
            <ol>
              <li><strong>Intake and history.</strong> Your PT asks detailed questions about your symptoms, how long they have been occurring, what makes them better or worse, your birth history, surgeries, and your goals.</li>
              <li><strong>External assessment.</strong> Your PT observes your posture, how you move, your breathing mechanics, and your hip, spine, and core function. They may assess your outer hip and thigh muscles, which connect to pelvic floor function.</li>
              <li><strong>Internal assessment (with consent).</strong> With your verbal consent, your PT performs an internal examination using one or two gloved fingers. They assess resting tone, strength, coordination, and pain response of the pelvic floor muscles. This is the assessment that can only be done internally — it is how they know what is actually happening in your pelvic floor, not just what they can see from outside.</li>
              <li><strong>Treatment plan.</strong> Based on findings, your PT explains what they found, what is driving your symptoms, and what the treatment plan will involve. You should leave with a clear understanding of what will happen over the next several weeks.</li>
            </ol>

            <h2>How to find a qualified pelvic floor PT</h2>
            <p>
              Not all physical therapists are trained in pelvic floor care. When searching, look for:
            </p>
            <ul>
              <li><strong>DPT (Doctor of Physical Therapy)</strong> degree — the current standard entry-level PT credential</li>
              <li><strong>CAPP</strong> (Certificate of Achievement in Pelvic Physical Therapy) — from the APTA Pelvic Health section, requires 60+ hours of coursework plus clinical case submission</li>
              <li><strong>WCS</strong> (Women&apos;s Clinical Specialist) — board certification from ABPTS, the most rigorous pelvic PT credential</li>
              <li><strong>BCB-PMD</strong> (Biofeedback Certification in Pelvic Muscle Dysfunction) — specialized biofeedback training</li>
              <li><strong>PRPC</strong> (Pelvic Rehabilitation Practitioner Certification) — from HCHC, another recognized certification</li>
            </ul>
            <p>
              Any of these credentials indicates a PT who has invested in pelvic floor-specific
              training beyond their base license. A PT without these credentials may still be
              competent — ask directly about their pelvic floor training and how many pelvic patients
              they see per week.
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
              Ready to find a pelvic floor PT?
            </h2>
            <p className="text-teal-100 mb-6">
              Browse the directory to find a specialist who treats your specific condition.
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
