'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { CONDITIONS, CERTIFICATIONS, INSURANCE_OPTIONS, US_STATES } from '@/types'

const schema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  credentials: z.string().optional(),
  practice_name: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  booking_url: z.string().url('Valid URL required').optional().or(z.literal('')),
  address_line1: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().optional(),
  bio: z.string().max(800, 'Bio must be under 800 characters').optional(),
  accepts_telehealth: z.boolean().default(false),
  accepting_new_patients: z.boolean().default(true),
  home_visits: z.boolean().default(false),
  conditions_treated: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  insurance_accepted: z.array(z.string()).default([]),
  languages_spoken: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accepting_new_patients: true,
      conditions_treated: [],
      certifications: [],
      insurance_accepted: [],
    },
  })

  const conditionsValue = watch('conditions_treated')
  const certsValue = watch('certifications')
  const insuranceValue = watch('insurance_accepted')

  const toggleArray = (field: 'conditions_treated' | 'certifications' | 'insurance_accepted', value: string) => {
    const current = field === 'conditions_treated' ? conditionsValue : field === 'certifications' ? certsValue : insuranceValue
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    setValue(field, next)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const languages = data.languages_spoken
        ? data.languages_spoken.split(',').map((l) => l.trim()).filter(Boolean)
        : ['English']
      const payload = { ...data, languages_spoken: languages }
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Submission failed. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
            <CheckCircle className="h-8 w-8 text-sage-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-stone-700 mb-3">You&apos;re submitted!</h2>
        <p className="text-stone-400 max-w-md mx-auto">
          Your listing is under review. We&apos;ll approve it within 1 business day and send you a confirmation email.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic info */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full Name *</label>
            <input {...register('full_name')} className="input" placeholder="Dr. Jane Smith" />
            {errors.full_name && <p className="mt-1 text-xs text-coral-500">{errors.full_name.message}</p>}
          </div>
          <div>
            <label className="label">Credentials</label>
            <input {...register('credentials')} className="input" placeholder="DPT, PT, MSPT" />
          </div>
          <div>
            <label className="label">Practice / Clinic Name</label>
            <input {...register('practice_name')} className="input" placeholder="Pelvic Wellness Clinic" />
          </div>
          <div>
            <label className="label">Email Address *</label>
            <input {...register('email')} type="email" className="input" placeholder="you@yourpractice.com" />
            {errors.email && <p className="mt-1 text-xs text-coral-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input {...register('phone')} type="tel" className="input" placeholder="(555) 555-5555" />
          </div>
          <div>
            <label className="label">Website</label>
            <input {...register('website')} type="url" className="input" placeholder="https://yourpractice.com" />
            {errors.website && <p className="mt-1 text-xs text-coral-500">{errors.website.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="label">Online Booking Link</label>
            <input {...register('booking_url')} type="url" className="input" placeholder="https://yourpractice.com/book" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">Location</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Address</label>
            <input {...register('address_line1')} className="input" placeholder="123 Main Street" />
          </div>
          <div>
            <label className="label">City *</label>
            <input {...register('city')} className="input" placeholder="Tampa" />
            {errors.city && <p className="mt-1 text-xs text-coral-500">{errors.city.message}</p>}
          </div>
          <div>
            <label className="label">State *</label>
            <select {...register('state')} className="input">
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s.abbr} value={s.abbr}>{s.name}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-xs text-coral-500">{errors.state.message}</p>}
          </div>
          <div>
            <label className="label">ZIP Code</label>
            <input {...register('zip')} className="input" placeholder="33601" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">About You</h2>
        <div>
          <label className="label">Bio (up to 800 characters)</label>
          <textarea
            {...register('bio')}
            rows={5}
            className="input"
            placeholder="Tell patients about your background, approach, and what makes your practice unique..."
          />
          {errors.bio && <p className="mt-1 text-xs text-coral-500">{errors.bio.message}</p>}
        </div>
        <div className="mt-4">
          <label className="label">Languages Spoken (comma-separated)</label>
          <input {...register('languages_spoken')} className="input" placeholder="English, Spanish" />
        </div>
      </div>

      {/* Services */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">Services & Availability</h2>
        <div className="space-y-3">
          {[
            { name: 'accepts_telehealth' as const, label: 'I offer telehealth / virtual appointments' },
            { name: 'accepting_new_patients' as const, label: 'I am accepting new patients' },
            { name: 'home_visits' as const, label: 'I offer home visits' },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <input {...register(name)} type="checkbox" className="h-4 w-4 rounded border-cream-300 text-teal focus:ring-teal-200" />
              <span className="text-sm text-stone-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-2">Conditions You Treat</h2>
        <p className="text-sm text-stone-400 mb-5">Select all that apply.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => toggleArray('conditions_treated', c.value)}
              className={`rounded-xl px-3 py-2 text-xs text-left transition-colors font-medium ${
                conditionsValue.includes(c.value)
                  ? 'bg-coral-50 text-coral-600 border-2 border-coral-200'
                  : 'bg-cream-200 text-stone-500 border-2 border-transparent hover:border-cream-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">Certifications</h2>
        <div className="space-y-2">
          {CERTIFICATIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => toggleArray('certifications', c.value)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-left transition-colors ${
                certsValue.includes(c.value)
                  ? 'bg-teal-50 text-teal border-2 border-teal-200'
                  : 'bg-cream-200 text-stone-500 border-2 border-transparent hover:border-cream-300'
              }`}
            >
              {certsValue.includes(c.value) && <CheckCircle className="h-4 w-4 shrink-0 text-teal" />}
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insurance */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-stone-700 mb-5">Insurance Accepted</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INSURANCE_OPTIONS.map((ins) => (
            <button
              key={ins}
              type="button"
              onClick={() => toggleArray('insurance_accepted', ins)}
              className={`rounded-xl px-3 py-2 text-xs text-left transition-colors font-medium ${
                insuranceValue.includes(ins)
                  ? 'bg-sage-100 text-sage-600 border-2 border-sage-200'
                  : 'bg-cream-200 text-stone-500 border-2 border-transparent hover:border-cream-300'
              }`}
            >
              {ins}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full py-4 text-base"
      >
        {submitting ? 'Submitting...' : 'Submit My Listing — Free'}
      </button>
    </form>
  )
}
