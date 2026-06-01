import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchBar from '@/components/SearchBar'
import { getListings } from '@/lib/data'

interface SearchParams {
  location?: string
  state?: string
  condition?: string
  certification?: string
  insurance?: string
  telehealth?: string
  accepting_new?: string
  home_visits?: string
  search?: string
  page?: string
}

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor Physical Therapist',
  description:
    'Browse pelvic floor physical therapists by location, condition, certifications, and insurance. Filter for telehealth, home visits, and accepting new patients.',
}

async function ListingsContent({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page ?? '1', 10)
  const pageSize = 20

  const { listings, total } = await getListings({
    state: searchParams.state,
    condition: searchParams.condition,
    certification: searchParams.certification,
    insurance: searchParams.insurance,
    telehealth: searchParams.telehealth === 'true',
    acceptingNew: searchParams.accepting_new === 'true',
    homeVisits: searchParams.home_visits === 'true',
    search: searchParams.search,
    page,
    pageSize,
  }).catch(() => ({ listings: [], total: 0 }))

  const totalPages = Math.ceil(total / pageSize)

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== 'page') params.set(k, v)
    })
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return `/listings${qs ? '?' + qs : ''}`
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-stone-400">
          {total === 0
            ? 'No results found'
            : `${total.toLocaleString()} pelvic floor PT${total === 1 ? '' : 's'} found`}
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-stone-400 text-lg mb-4">No pelvic floor PTs match your current filters.</p>
          <Link href="/listings" className="btn-secondary">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link href={buildPageUrl(page - 1)} className="btn-secondary py-2 px-4 text-xs">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Link>
          )}
          <span className="text-sm text-stone-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={buildPageUrl(page + 1)} className="btn-secondary py-2 px-4 text-xs">
              Next
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-3">
            Find a Pelvic Floor Physical Therapist
          </h1>
          <div className="mt-4">
            <SearchBar defaultLocation={params.location ?? ''} defaultCondition={params.condition ?? ''} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <Suspense fallback={null}>
            <FilterSidebar />
          </Suspense>
          <div className="flex-1 min-w-0">
            <Suspense
              key={JSON.stringify(params)}
              fallback={
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="card h-40 animate-pulse bg-cream-200" />
                  ))}
                </div>
              }
            >
              <ListingsContent searchParams={params} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
