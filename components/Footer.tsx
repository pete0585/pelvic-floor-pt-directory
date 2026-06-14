import Link from 'next/link'
import { Activity } from 'lucide-react'

const CONDITIONS = [
  { label: 'Postpartum Recovery', slug: 'postpartum' },
  { label: 'Urinary Incontinence', slug: 'urinary_incontinence' },
  { label: 'Pelvic Organ Prolapse', slug: 'prolapse' },
  { label: 'Chronic Pelvic Pain', slug: 'pelvic_pain' },
  { label: 'Endometriosis', slug: 'endometriosis' },
  { label: 'Vaginismus', slug: 'vaginismus' },
]

export default function Footer() {
  return (
    <footer className="border-t border-cream-300 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50">
                <Activity className="h-4 w-4 text-teal" />
              </div>
              <span className="text-base font-bold text-stone-700">
                PelvicFloor<span className="text-teal">PT</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              The only directory built exclusively for pelvic floor physical therapists. Find a specialist for your specific condition, in your city.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-4">Browse by Condition</h3>
            <ul className="space-y-2">
              {CONDITIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/conditions/${c.slug}`}
                    className="text-sm text-stone-400 hover:text-teal transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-4">For Patients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Find a Pelvic Floor PT
                </Link>
              </li>
              <li>
                <Link href="/listings?telehealth=true" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Telehealth PTs
                </Link>
              </li>
              <li>
                <Link href="/listings?accepting_new=true" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Accepting New Patients
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-4">For Practitioners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Get Listed Free
                </Link>
              </li>
              <li>
                <Link href="/submit#pricing" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Verified Listing ($99/yr)
                </Link>
              </li>
              <li>
                <Link href="/submit#pricing" className="text-sm text-stone-400 hover:text-teal transition-colors">
                  Featured Listing ($199/yr)
                </Link>
              </li>
              <li>
                <a href="https://www.menopausedirectory.co" className="text-sm text-stone-400 hover:text-teal transition-colors" target="_blank" rel="noopener noreferrer">
                  Menopause Directory
                </a>
              </li>
              <li>
                <a href="https://lactationconsultantdirectory.com" className="text-sm text-stone-400 hover:text-teal transition-colors" target="_blank" rel="noopener noreferrer">
                  IBCLC Directory
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream-300 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} PelvicFloorPTDirectory.com. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            Not a medical referral service. Always consult a licensed healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
