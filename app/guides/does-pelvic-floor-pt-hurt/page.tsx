import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Does Pelvic Floor PT Hurt? What to Expect | PelvicFloorPTDirectory.com',
  description: 'Honest answer: does pelvic floor physical therapy hurt? What the internal exam actually feels like, how to manage discomfort, and what "normal" means during treatment.',
}

const FAQ = [
  { q: 'Does pelvic floor physical therapy hurt?', a: 'Pelvic floor PT should not be painful in the way that makes you dread the next session. Some discomfort during trigger point release or internal assessment is normal — the pelvic floor is often holding tension it has been accumulating for years. But sharp pain, extreme discomfort, or worsening of your baseline symptoms are signals to tell your PT immediately. They will adjust.' },
  { q: 'What does the internal pelvic floor exam feel like?', a: 'Most patients describe the internal exam as unusual and mildly uncomfortable, not painful. If your pelvic floor is hypertonic (too tight) or has trigger points, you may feel localized pressure or reproduction of your familiar symptoms when those spots are contacted. This is diagnostically useful, and a skilled PT will manage the pressure carefully.' },
  { q: 'What if I have a history of trauma or pain with internal exams?', a: 'Tell your PT before you start. A good pelvic floor PT is trained to work with patients who have pain or trauma history around internal examination. Many use a graduated approach — spending multiple sessions on external work and building comfort before any internal assessment. You are always in control of the pace.' },
  { q: 'Will pelvic floor PT make my pain worse?', a: 'It is normal to experience mild soreness for 24-48 hours after a pelvic floor session, especially early in treatment or after significant manual therapy work. This is tissue response, not damage. If your symptoms are consistently worse after sessions (not just temporarily sore), tell your PT — the approach needs adjustment.' },
]

export default function DoesPelvicFloorPTHurtPage() {
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
            <span className="text-stone-600">Does Pelvic Floor PT Hurt</span>
          </nav>

          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            Does Pelvic Floor PT Hurt?
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            The honest, complete answer — not a reassurance that glosses over the real experience.
          </p>

          <div className="prose-guide">

            <h2>The short answer</h2>
            <p>
              Pelvic floor PT should not be painful in a way that makes you want to skip sessions or
              stop treatment. But "no pain" is not quite right either. Some sessions involve working
              on tissue that has been tight, restricted, or irritated for a long time — and that work
              can produce temporary discomfort, mild pressure, or the sensation of reproducing familiar
              symptoms.
            </p>
            <p>
              The distinction that matters: there is a difference between <em>therapeutic discomfort</em>
              (the "hurts good" sensation of releasing a muscle that has been holding tension) and
              <em>acute pain</em> (sharp, intense, or worsening sensation that signals something is wrong).
              A skilled pelvic floor PT will distinguish between the two and adjust accordingly.
            </p>

            <h2>What the internal assessment actually feels like</h2>
            <p>
              Many people put off pelvic floor PT because they are anxious about the internal exam.
              Here is what it actually involves:
            </p>
            <p>
              Your PT uses one or two gloved fingers to assess the pelvic floor muscles internally,
              either vaginally or rectally. They are palpating muscle tone, checking for tenderness,
              assessing coordination, and identifying trigger points. It is not a medical procedure
              that involves instruments — just a trained clinician using their hands.
            </p>
            <p>
              For most patients who do not have active pelvic pain conditions, the internal exam is
              mildly uncomfortable or simply unusual, not painful. For patients with hypertonic (too
              tight) pelvic floors, vaginismus, vulvodynia, or chronic pelvic pain, there may be
              more sensitivity. A good PT will start with the least invasive approach and progress
              only as you are comfortable.
            </p>

            <h2>What "normal" discomfort looks like during treatment</h2>
            <div className="grid grid-cols-1 gap-3 my-6">
              {[
                { label: 'Normal', items: ['Mild pressure during trigger point release', 'Temporary reproduction of familiar symptoms during assessment', 'Muscle fatigue after exercise-heavy sessions', 'Mild soreness 24-48 hours after internal manual therapy', 'Discomfort that decreases over the course of a session as tissue relaxes'] },
                { label: 'Not normal — tell your PT immediately', items: ['Sharp or severe pain during internal work', 'Pain that is consistently worse after sessions, not just temporarily sore', 'Bleeding or unexpected discharge after a session', 'Feeling violated, rushed, or unheard by your PT', 'Exercises that make your symptoms significantly worse for more than 48 hours'] },
              ].map(({ label, items }) => (
                <div key={label} className="p-5 bg-cream-100 rounded-xl">
                  <p className="font-bold text-stone-700 mb-3">{label}</p>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-stone-500">
                        <CheckCircle className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2>If you have pain or trauma history</h2>
            <p>
              Many patients come to pelvic floor PT with histories of painful gynecological exams,
              sexual pain or trauma, or pelvic surgeries. Tell your PT before you start.
            </p>
            <p>
              A well-trained pelvic floor PT will:
            </p>
            <ul>
              <li>Start with an entirely external approach if internal work feels unsafe or overwhelming</li>
              <li>Use a graduated desensitization approach — building tolerance over multiple sessions before internal assessment</li>
              <li>Check in with you throughout every session, not just at the start</li>
              <li>Understand that some patients need to build trust before any internal work happens — and that is clinically appropriate, not a delay</li>
            </ul>

            <h2>How to manage anxiety before your first appointment</h2>
            <p>
              It is normal to be nervous about pelvic floor PT, especially if your history with
              pelvic exams has not been great. A few things that help:
            </p>
            <ul>
              <li>Call or email the clinic before your first appointment to ask what the intake process looks like</li>
              <li>Tell your PT your concerns at the start of the session — do not wait to be asked</li>
              <li>Know that you can say "let&apos;s skip the internal exam today" at any point, without it being a problem</li>
              <li>Bring a support person to your first appointment if that would help</li>
            </ul>
            <p>
              Most patients who come in anxious leave their first appointment saying it was not what
              they expected — and that the PT made the process feel safe and manageable.
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
              Find a pelvic floor PT who works at your pace
            </h2>
            <p className="text-teal-100 mb-6">
              Browse the directory and filter by condition to find someone with experience in your specific situation.
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
