'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface SearchBarProps {
  size?: 'default' | 'large'
  defaultLocation?: string
  defaultCondition?: string
}

const CONDITIONS = [
  { value: '', label: 'Any condition' },
  { value: 'postpartum', label: 'Postpartum Recovery' },
  { value: 'pregnancy', label: 'Pregnancy & Birth Prep' },
  { value: 'urinary_incontinence', label: 'Urinary Incontinence' },
  { value: 'prolapse', label: 'Pelvic Organ Prolapse' },
  { value: 'pelvic_pain', label: 'Chronic Pelvic Pain' },
  { value: 'endometriosis', label: 'Endometriosis' },
  { value: 'painful_sex', label: 'Painful Sex / Vaginismus' },
  { value: 'vaginismus', label: 'Vaginismus' },
  { value: 'male_pelvic_health', label: 'Male Pelvic Health' },
  { value: 'diastasis_recti', label: 'Diastasis Recti' },
  { value: 'menopause', label: 'Menopause & GSM' },
  { value: 'sports', label: 'Sports & Athletes' },
]

export default function SearchBar({ size = 'default', defaultLocation = '', defaultCondition = '' }: SearchBarProps) {
  const router = useRouter()
  const [location, setLocation] = useState(defaultLocation)
  const [condition, setCondition] = useState(defaultCondition)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set('location', location.trim())
    if (condition) params.set('condition', condition)
    router.push(`/listings?${params.toString()}`)
  }

  const isLarge = size === 'large'

  return (
    <form onSubmit={handleSearch} className={`w-full max-w-2xl ${isLarge ? '' : 'max-w-xl'}`}>
      <div className={`flex flex-col sm:flex-row gap-2 rounded-2xl bg-white p-2 shadow-card ${isLarge ? 'sm:rounded-full' : 'sm:rounded-xl'}`}>
        <div className="flex flex-1 items-center gap-2 px-3">
          <MapPin className="h-4 w-4 shrink-0 text-teal-300" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, state, or zip code"
            className="flex-1 bg-transparent text-sm text-stone placeholder:text-stone-400 focus:outline-none"
          />
        </div>

        <div className="h-px sm:h-auto sm:w-px bg-cream-300 mx-1 my-1 sm:mx-0 sm:my-0" />

        <div className="flex flex-1 items-center gap-2 px-3">
          <Search className="h-4 w-4 shrink-0 text-teal-300" />
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="flex-1 bg-transparent text-sm text-stone focus:outline-none cursor-pointer"
          >
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`btn-primary shrink-0 ${isLarge ? 'px-8 py-3' : 'px-6 py-2.5'}`}
        >
          Search
        </button>
      </div>
    </form>
  )
}
