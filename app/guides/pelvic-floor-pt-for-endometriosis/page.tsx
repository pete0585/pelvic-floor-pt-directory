import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pelvic Floor PT for Endometriosis: What to Expect | PelvicFloorPTDirectory.com',
  description: "Pelvic floor PT doesn't treat endometriosis, but it can dramatically reduce the pelvic pain and dysfunction it causes. Here's how — and what to look for in a provider.",
  alternates: { canonical: 'https://pelvicfloordirectory.com/guides/pelvic-floor-pt-for-endometriosis' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Can pelvic floor PT cure endometriosis?',
    a: "No. Pelvic floor PT does not treat the underlying endometriosis lesions, which are managed medically (hormonal suppression) or surgically (excision). What PT does treat is the secondary pelvic floor dysfunction that endometriosis causes: muscle hypertonicity, trigger points, connective tissue restrictions, and central sensitization. Many women with endo find that PT significantly reduces their pain even when lesions are still present, by addressing the neurological and musculoskeletal layers of the pain experience.",
  },
  {
    q: 'Does pelvic floor PT hurt with endometriosis?',
    a: "Pelvic floor PT should not significantly worsen your pain. A PT experienced with endometriosis will start slowly and gently — often beginning with external work (abdominal scar tissue mobilization, hip and low back work, breathing retraining) before addressing the pelvic floor directly. If any technique increases your pain significantly, tell your PT immediately. Good endo PTs calibrate their approach to your current flare status.",
  },
  {
    q: 'What does a pelvic floor PT session look like for someone with endo?',
    a: "A typical session for an endo patient might include: diaphragmatic breathing and nervous system regulation work (since endo is often accompanied by central sensitization), manual therapy to address abdominal adhesions and scar tissue from surgery, hip flexor and piriformis release, internal pelvic floor trigger point work (if tolerated), and neuromuscular re-education for coordination between the diaphragm, pelvic floor, and deep abdominal muscles. Home programs typically include pain neuroscience education, stretching, and nervous system regulation techniques.",
  },
  {
    q: 'Should I have surgery before starting pelvic floor PT for endometriosis?',
    a: "This depends on your situation. Many pelvic floor PTs recommend starting PT before surgery to reduce baseline hypertonicity and prepare your pelvic floor for better surgical outcomes and faster recovery. PT is also highly effective after excision surgery to address scar tissue, postsurgical adhesions, and the pelvic floor changes that occur from the surgical approach. Your pelvic floor PT and gynecologic surgeon should ideally communicate — an integrated approach produces the best outcomes.",
  },
  {
    q: 'How do I find a pelvic floor PT who specializes in endometriosis?',
    a: "Search PelvicFloorPTDirectory.com using the location search and look for providers who list endometriosis, chronic pelvic pain, or visceral mobilization as specialty areas. It's also worth asking directly: 'Have you treated patients with endometriosis?' and 'Do you have training in visceral manipulation or central sensitization?' The Endometriosis Foundation of America (EndoFound) and iCareBetter are additional resources for finding endo-literate providers.",
  },
]

export default function PelvicPTForEndometriosisPage() {
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
            <span className="text-stone-600">Pelvic Floor PT for Endometriosis</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl leading-tight">
              Pelvic Floor PT for Endometriosis: What to Expect
            </h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Endometriosis causes pelvic pain in part because of the lesions themselves — but also
              because of what happens to the pelvic floor in response. Years of painful periods,
              intercourse avoidance, guarding, and bracing create secondary pelvic floor dysfunction
              that persists even when the disease is treated. Pelvic floor PT targets this secondary
              layer and is one of the most effective tools for endo-related pain management.
            </p>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                How endometriosis affects the pelvic floor
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                The pelvic floor responds to chronic pain by tightening — this is a normal protective
                reflex. But in endometriosis, this protective contraction becomes chronic and involuntary.
                The result is pelvic floor hypertonicity (overactivity) that persists long after its
                cause. This is why many women with endo have:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Painful intercourse (dyspareunia)',
                  'Pain with tampon insertion',
                  'Pelvic floor muscle trigger points',
                  'Low back and hip pain',
                  'Bladder urgency or frequency',
                  'Bowel pain or constipation',
                  'Post-surgical scar tissue restrictions',
                  'Connective tissue adhesions',
                ].map((symptom) => (
                  <div key={symptom} className="flex items-start gap-2 bg-white rounded-xl border border-stone-100 p-3 text-sm shadow-sm">
                    <span className="text-teal mt-0.5">→</span>
                    <span className="text-stone-700">{symptom}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                What pelvic floor PT addresses in endo patients
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Pelvic floor hypertonicity', detail: 'Manual therapy, breathing, and neuromuscular re-education to down-regulate an overactive pelvic floor — the most common finding in endo patients.' },
                  { title: 'Abdominal and pelvic scar tissue', detail: 'Visceral mobilization and scar tissue release for laparoscopy scars, cesarean scars, and internal adhesions from endo.' },
                  { title: 'Hip and low back dysfunction', detail: 'Piriformis, iliopsoas, and quadratus lumborum restrictions that develop from the compensatory movement patterns of chronic pelvic pain.' },
                  { title: 'Central sensitization', detail: "Pain neuroscience education and nervous system regulation to address the brain's amplified pain response that develops with chronic endo." },
                  { title: 'Bladder and bowel co-symptoms', detail: 'Coordination training for pelvic floor with urination and defecation when bladder endometriosis or bowel endo affects these functions.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
                    <p className="font-semibold text-stone-800">{item.title}</p>
                    <p className="text-sm text-stone-600 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
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
              <h2 className="font-semibold text-stone-800 mb-2">Find a pelvic floor PT experienced with endometriosis</h2>
              <p className="text-sm text-stone-600 mb-4">
                Search our directory for pelvic floor PTs who list chronic pelvic pain or endometriosis as specialty areas.
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
                <Link href="/guides/pelvic-floor-pt-during-pregnancy" className="text-sm text-teal hover:opacity-80 font-medium">Pelvic Floor PT During Pregnancy →</Link>
                <Link href="/guides/kegels-vs-pelvic-floor-pt" className="text-sm text-teal hover:opacity-80 font-medium">Kegels vs. Pelvic Floor PT →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
