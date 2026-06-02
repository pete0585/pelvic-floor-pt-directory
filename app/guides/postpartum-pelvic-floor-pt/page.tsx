import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Postpartum Pelvic Floor Physical Therapy: A Complete Guide | PelvicFloorPTDirectory.com',
  description: 'What every new mom should know about postpartum pelvic floor PT — when to start, what to expect, and how to find the right specialist for postpartum recovery.',
}

const FAQ = [
  { q: 'When can I start pelvic floor PT after giving birth?', a: 'Most practitioners recommend your first pelvic floor PT appointment at or after your 6-week postpartum check-up — once your OB or midwife has cleared you for pelvic floor evaluation. However, many pelvic floor PTs are comfortable starting an initial consultation (including external assessment, breathing work, and education) as early as 2-3 weeks postpartum. Check with your specific provider about their approach.' },
  { q: 'Is postpartum pelvic floor PT covered by insurance?', a: 'Most major insurance plans cover pelvic floor PT as physical therapy under postpartum diagnoses. Common billing codes include Z87.511 (personal history of preterm labor), O90.89 (other complications of the puerperium), and others based on your specific symptoms. Your PT handles the billing. Always verify coverage before your first appointment.' },
  { q: 'Do I need pelvic floor PT after a C-section?', a: 'Yes. Many people assume pelvic floor PT is only for vaginal deliveries — this is a common misconception. C-section patients often deal with scar tissue adhesions that can cause bladder dysfunction, hip flexor tightness, abdominal weakness (including diastasis recti), and altered movement patterns. C-section scar massage and pelvic PT are valuable even when the birth was surgical.' },
  { q: 'What is diastasis recti and does pelvic floor PT help?', a: 'Diastasis recti is a separation of the abdominal muscles at the midline (the linea alba). It is extremely common after pregnancy — present in over 60% of women at 6 weeks postpartum. Pelvic floor PT directly addresses diastasis through specific exercises that close the gap without worsening it. Crunches and sit-ups during active diastasis typically make it worse — PT teaches you which movements are safe.' },
  { q: 'Will "just doing Kegels" be enough after birth?', a: 'Often, no — and sometimes Kegels can make things worse. If your pelvic floor is hypertonic (too tight, which can happen after a difficult delivery), Kegels further increase muscle tension and worsen leaking, pain, or constipation. A pelvic floor PT assesses your actual muscle state first. For some patients, the prescription is relaxation and downtraining, not more Kegels.' },
]

export default function PostpartumPelvicFloorPTPage() {
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
            <span className="text-stone-600">Postpartum Pelvic Floor PT</span>
          </nav>

          <div className="flex items-center gap-2 text-teal text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            <span>Resource guide</span>
          </div>

          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-4">
            Postpartum Pelvic Floor Physical Therapy
          </h1>
          <p className="text-stone-400 text-sm mb-8">
            What every new mom should know — whether you delivered vaginally or by C-section.
          </p>

          <div className="prose-guide">

            <h2>Why postpartum pelvic floor PT exists</h2>
            <p>
              In France, postpartum pelvic floor rehabilitation is standard state-funded care after
              every birth. Every new mother gets 10 to 20 covered sessions of pelvic PT. The result:
              French women report dramatically lower rates of chronic incontinence, prolapse, and
              painful sex compared to American women.
            </p>
            <p>
              In the US, postpartum care is a 6-week appointment followed by being told you have been
              cleared. Nobody tells you about your pelvic floor. The message you get is: your body
              went through something significant, you are fine now, go back to normal. Which leaves
              women leaking, in pain, avoiding sex, and told by well-meaning friends that this is
              just "what happens after you have a baby."
            </p>
            <p>
              It does not have to be. Pelvic floor PT exists specifically for this gap.
            </p>

            <h2>What happens to your pelvic floor during pregnancy and birth</h2>
            <p>
              During pregnancy, the pelvic floor bears dramatically increased load as the growing
              uterus shifts your center of gravity and increases pressure on everything below it.
              Relaxin (a pregnancy hormone) loosens ligaments throughout your body, including the
              pelvic ligaments. By the third trimester, your pelvic floor has been under sustained
              mechanical stress for months.
            </p>
            <p>
              During vaginal delivery, the pelvic floor stretches to allow the baby to pass through.
              Research shows the levator ani muscle stretches to more than three times its normal
              length during birth. Even without visible tearing, the muscle fibers experience
              microtrauma. Delivery with forceps, vacuum, prolonged pushing, or significant perineal
              tearing increases the risk of more significant pelvic floor injury.
            </p>
            <p>
              After a C-section, the pelvic floor did not go through a vaginal delivery — but it
              still carried a full-term pregnancy. The abdominal scar creates adhesion patterns that
              affect the bladder, bowel, hip flexors, and core muscles. C-section moms are not immune
              to postpartum pelvic floor dysfunction.
            </p>

            <h2>Symptoms that pelvic floor PT treats postpartum</h2>
            <ul>
              <li>Leaking urine when coughing, sneezing, laughing, or exercising (stress incontinence)</li>
              <li>Urgency — feeling a sudden strong urge to urinate that is hard to control</li>
              <li>Pelvic heaviness or pressure (especially after standing or walking)</li>
              <li>Diastasis recti (abdominal gap — the "mommy pooch" that does not close on its own)</li>
              <li>Perineal scar pain or tightness after vaginal delivery or episiotomy</li>
              <li>C-section scar tightness or numbness above or below the incision</li>
              <li>Painful sex after delivery (dyspareunia)</li>
              <li>Low back pain, hip pain, or tailbone pain</li>
              <li>Pelvic organ prolapse (feeling of pressure or bulge)</li>
            </ul>

            <h2>When to start</h2>
            <p>
              The most common question: <em>when can I start?</em>
            </p>
            <p>
              The standard guideline is to wait until your 6-week postpartum visit and get clearance
              from your OB or midwife before beginning pelvic floor assessment. This gives initial
              tissue healing time to occur.
            </p>
            <p>
              However, many pelvic floor PTs will see postpartum patients earlier for consultations
              that do not involve internal assessment — breathing and core reconnection, posture
              education, c-section scar management (starting after sutures are removed), and guidance
              on activity progression. Ask your PT what they offer in weeks 2-5 postpartum.
            </p>
            <p>
              There is also no upper limit on "too late." Women come to pelvic floor PT 10 or 20
              years after delivery because they have been leaking since their second child was born
              and finally decided to do something about it. The tissue responds to treatment at any age.
            </p>

            <h2>What to look for in a postpartum pelvic floor PT</h2>
            <p>
              When searching for a postpartum specialist specifically, look for PTs who list postpartum
              recovery, diastasis recti, or C-section rehabilitation in their specialty areas.
              Experience with postpartum patients means they understand the full picture — not just
              the pelvic floor but how it connects to core recovery, return to exercise, and the
              emotional component of navigating a changed body.
            </p>

          </div>

          {/* CTA: Find postpartum PT */}
          <div className="my-10 rounded-2xl bg-cream-100 p-6 flex items-start gap-4">
            <Heart className="h-6 w-6 text-coral-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-700 mb-2">Looking for a postpartum pelvic floor PT?</p>
              <p className="text-sm text-stone-500 mb-4">
                Browse the directory filtered for postpartum specialists in your area.
              </p>
              <Link
                href="/conditions/postpartum"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-400"
              >
                Find postpartum pelvic floor PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <section className="mt-12">
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
              Find a postpartum pelvic floor PT near you
            </h2>
            <p className="text-teal-100 mb-6">
              Search by location and filter for postpartum specialists in your area.
            </p>
            <Link
              href="/conditions/postpartum"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-teal hover:bg-cream-100 transition-colors"
            >
              Browse postpartum specialists <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
