'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { CONDITIONS, CERTIFICATIONS, INSURANCE_OPTIONS, US_STATES } from '@/types'

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/listings?${params.toString()}`)
    },
    [router, searchParams],
  )

  const toggleBool = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (params.get(key) === 'true') {
        params.delete(key)
      } else {
        params.set(key, 'true')
      }
      params.delete('page')
      router.push(`/listings?${params.toString()}`)
    },
    [router, searchParams],
  )

  const clearAll = useCallback(() => {
    const search = searchParams.get('search') ?? ''
    const location = searchParams.get('location') ?? ''
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (location) params.set('location', location)
    router.push(`/listings?${params.toString()}`)
  }, [router, searchParams])

  const hasFilters = [
    'state', 'condition', 'certification', 'insurance',
    'telehealth', 'accepting_new', 'home_visits',
  ].some((k) => searchParams.has(k))

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-2xl bg-white shadow-soft p-5 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-teal" />
            <span className="font-semibold text-stone-700 text-sm">Filters</span>
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-stone-400 hover:text-coral transition-colors"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-5">
          {/* State */}
          <div>
            <label className="label">State</label>
            <select
              value={searchParams.get('state') ?? ''}
              onChange={(e) => updateFilter('state', e.target.value || null)}
              className="input text-sm"
            >
              <option value="">All states</option>
              {US_STATES.map((s) => (
                <option key={s.abbr} value={s.abbr}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="label">Condition</label>
            <select
              value={searchParams.get('condition') ?? ''}
              onChange={(e) => updateFilter('condition', e.target.value || null)}
              className="input text-sm"
            >
              <option value="">Any condition</option>
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Certification */}
          <div>
            <label className="label">Certification</label>
            <select
              value={searchParams.get('certification') ?? ''}
              onChange={(e) => updateFilter('certification', e.target.value || null)}
              className="input text-sm"
            >
              <option value="">Any certification</option>
              {CERTIFICATIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Insurance */}
          <div>
            <label className="label">Insurance</label>
            <select
              value={searchParams.get('insurance') ?? ''}
              onChange={(e) => updateFilter('insurance', e.target.value || null)}
              className="input text-sm"
            >
              <option value="">Any insurance</option>
              {INSURANCE_OPTIONS.map((ins) => (
                <option key={ins} value={ins}>
                  {ins}
                </option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-1">
            <label className="label mb-2">Options</label>
            {[
              { key: 'telehealth', label: 'Telehealth available' },
              { key: 'accepting_new', label: 'Accepting new patients' },
              { key: 'home_visits', label: 'Home visits available' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleBool(key)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  searchParams.get(key) === 'true'
                    ? 'bg-teal-50 text-teal font-semibold'
                    : 'text-stone-500 hover:bg-cream-200'
                }`}
              >
                {label}
                <div
                  className={`h-4 w-7 rounded-full transition-colors ${
                    searchParams.get(key) === 'true' ? 'bg-teal' : 'bg-stone-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
