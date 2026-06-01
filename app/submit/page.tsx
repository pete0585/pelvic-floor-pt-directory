import type { Metadata } from 'next'
import { ShieldCheck, Star, CheckCircle } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your Pelvic Floor Practice',
  description:
    'Get your pelvic floor PT practice listed in the only directory built exclusively for pelvic floor specialists. Free to list, verified listings starting at $99/year.',
}

export default function SubmitPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800 tracking-tight mb-4">
            List Your Pelvic Floor Practice
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            The only directory built exclusively for pelvic floor PTs. Your patients are searching —
            make sure they can find you.
          </p>
        </div>

        {/* Pricing section */}
        <div id="pricing" className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
          <div className="card p-6 text-center border-2 border-cream-300">
            <div className="text-2xl font-bold text-stone-700 mb-1">Free</div>
            <div className="text-sm text-stone-400 mb-4">Unclaimed listing</div>
            <ul className="text-sm text-stone-500 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-sage-400 shrink-0" />
                Name, city, phone
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-sage-400 shrink-0" />
                Shows up in search
              </li>
              <li className="flex items-center gap-2 text-stone-300">
                <CheckCircle className="h-4 w-4 shrink-0" />
                No website or bio
              </li>
              <li className="flex items-center gap-2 text-stone-300">
                <CheckCircle className="h-4 w-4 shrink-0" />
                No booking CTA
              </li>
            </ul>
          </div>

          <div className="card p-6 text-center border-2 border-teal-200 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal text-white text-xs font-semibold px-4 py-1">
              Most Popular
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <ShieldCheck className="h-5 w-5 text-teal" />
              <span className="text-2xl font-bold text-stone-700">$99/yr</span>
            </div>
            <div className="text-sm text-teal font-semibold mb-4">Verified</div>
            <ul className="text-sm text-stone-500 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Verified badge
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Priority placement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Full bio + headshot
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Credential badges (CAPP, WCS, etc.)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Direct booking CTA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-teal shrink-0" />
                Condition tags
              </li>
            </ul>
          </div>

          <div className="card p-6 text-center border-2 border-coral-200">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Star className="h-5 w-5 text-coral-500" />
              <span className="text-2xl font-bold text-stone-700">$199/yr</span>
            </div>
            <div className="text-sm text-coral-500 font-semibold mb-4">Featured</div>
            <ul className="text-sm text-stone-500 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-coral-400 shrink-0" />
                Everything in Verified
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-coral-400 shrink-0" />
                Featured placement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-coral-400 shrink-0" />
                Top Provider badge
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-coral-400 shrink-0" />
                City page spotlight
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-coral-400 shrink-0" />
                Condition page feature
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-stone-700 mb-6">Submit Your Free Listing</h2>
          <SubmitForm />
        </div>
      </div>
    </div>
  )
}
