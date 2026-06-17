import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT During Pregnancy: What to Know | PelvicFloorPTDirectory.com',
  description: 'Pelvic floor PT during pregnancy reduces pain, prepares the body for birth, and shortens postpartum recovery. Here is what to expect and when to start.',
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/pelvic-floor-pt-during-pregnancy' },
}

export const revalidate = 3600

const FAQ = [
  {
    q: 'Is pelvic floor PT safe during pregnancy?',
    a: "Yes — pelvic floor PT is safe throughout pregnancy and is widely recommended by OBs, midwives, and physical therapists. The treatment is non-invasive, uses no radiation or medication, and is adapted to each trimester. Most techniques used during pregnancy focus on education, posture, alignment, and gentle manual therapy — not aggressive exercise or high-load training.",
  },
  {
    q: 'When should I start pelvic floor PT in pregnancy?',
    a: "Ideally, the first trimester or early second trimester — before symptoms become severe. That said, any time during pregnancy is valuable. Women with pain (pubic symphysis, sacroiliac, low back), leaking, or prolapse symptoms earlier in pregnancy should start sooner. Even starting in the third trimester to prepare for birth and learn pushing mechanics is beneficial.",
  },
  {
    q: 'What does pelvic floor PT do during pregnancy?',
    a: "Prenatal pelvic floor PT addresses: pelvic girdle pain (pubic symphysis dysfunction, SI joint pain), round ligament pain management, optimal fetal positioning techniques, pelvic floor preparation for vaginal delivery (including perineal massage and stretching), breathing strategies for the second stage of labor, and diastasis recti screening and core management. It also sets the foundation for faster postpartum recovery.",
  },
  {
    q: 'Does pelvic floor PT reduce tearing during birth?',
    a: "Perineal massage and pelvic floor stretching in the final weeks of pregnancy are associated with reduced perineal tearing and episiotomy rates in first-time mothers. A pelvic floor PT can teach you how to perform perineal massage correctly and assess whether your pelvic floor muscles are hypertonic (too tight) before birth — a significant risk factor for tearing that responds well to treatment.",
  },
  {
    q: 'Do I need a referral to see a pelvic floor PT during pregnancy?',
    a: "In most states, you can self-refer to a physical therapist without a physician referral (direct access laws). However, your OB or midwife may have preferred pelvic floor PT partners — ask at your prenatal visits. Insurance coverage varies: many plans cover PT during pregnancy, but may require a referral or prior authorization. Call your PT office before your first visit to confirm your coverage.",
  },
]

const trimesterGuide = [
  {
    trimester: 'First trimester (weeks 1–12)',
    focus: ['Baseline assessment of pelvic floor function', 'Address pre-existing conditions (pain, leaking) early', 'Education on posture, lifting mechanics, and safe exercise', 'Core and breathing foundation before the bump grows'],
    note: 'Lower urgency unless you have symptoms — but ideal time to establish care',
  },
  {
    trimester: 'Second trimester (weeks 13–27)',
    focus: ['Address pelvic girdle pain as ligaments loosen', 'Diastasis recti screening and management', 'Safe strengthening as the center of gravity shifts', 'Bladder urgency and leaking prevention'],
    note: 'Most women start here — visible bump + new aches are common triggers',
  },
  {
    trimester: 'Third trimester (weeks 28–40)',
    focus: ['Perineal massage and birth preparation', 'Optimal pushing mechanics and breathing strategies', 'Pelvic floor downtraining for hypotonic delivery', 'Postpartum recovery planning'],
    note: 'Even starting at 36 weeks provides meaningful birth prep',
  },
]

export default function PelvicFloorPregnancyPage() {
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
          <span className="text-stone-600">Pelvic Floor PT During Pregnancy</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
            Pelvic Floor PT During Pregnancy: What to Know
          </h1>
          <p className="mt-4 text-stone-600 text-lg leading-relaxed">
            Seeing a pelvic floor PT during pregnancy is one of the highest-leverage things you can
            do for your birth experience and postpartum recovery. It&apos;s not just for when things
            go wrong — it&apos;s preparation, the same way prenatal yoga or childbirth education is.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">What Pelvic Floor PT Looks Like Each Trimester</h2>
            <div className="space-y-4">
              {trimesterGuide.map(({ trimester, focus, note }) => (
                <div key={trimester} className="border border-stone-200 rounded-xl overflow-hidden">
                  <div className="bg-teal-50 px-5 py-3">
                    <h3 className="font-semibold text-stone-800">{trimester}</h3>
                    <p className="text-xs text-stone-500 mt-0.5">{note}</p>
                  </div>
                  <ul className="px-5 py-4 space-y-1.5">
                    {focus.map((item) => (
                      <li key={item} className="text-sm text-stone-600 flex items-start gap-2">
                        <span className="text-teal-500 mt-0.5 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Common Pregnancy Conditions Treated</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Pelvic girdle pain (PGP)', desc: 'SI joint and pubic symphysis pain from ligament laxity — very common and very treatable' },
                { name: 'Diastasis recti', desc: 'Abdominal separation that worsens without guidance — early intervention prevents chronic dysfunction' },
                { name: 'Urinary leakage', desc: 'Stress incontinence (coughing, sneezing, running) during pregnancy responds well to pelvic floor training' },
                { name: 'Pelvic pressure and heaviness', desc: 'Can indicate pelvic organ descent — assessment helps distinguish normal discomfort from prolapse risk' },
                { name: 'Low back pain', desc: 'Pelvic floor and core imbalances are often the driver of pregnancy-related back pain' },
                { name: 'Birth preparation', desc: 'Perineal massage, pushing mechanics, breathing — evidence supports reduced tearing and shorter second stage' },
              ].map(({ name, desc }) => (
                <div key={name} className="bg-stone-50 rounded-xl p-4">
                  <p className="font-semibold text-stone-800 text-sm mb-1">{name}</p>
                  <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
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
          <h3 className="font-semibold text-stone-800 mb-3">Find a Prenatal Pelvic Floor PT Near You</h3>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/listings" className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold">
              Browse the Directory
            </Link>
            <Link href="/guides/what-is-pelvic-floor-physical-therapy" className="text-teal hover:opacity-80 font-medium">What Is Pelvic Floor PT? →</Link>
            <Link href="/guides/men-and-pelvic-floor-pt" className="text-teal hover:opacity-80 font-medium">Men and Pelvic Floor PT →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
