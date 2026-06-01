import type { Metadata } from 'next'
import AdminTable from '@/components/AdminTable'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Admin — PelvicFloorPT Directory',
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const [pending, recent, stats] = await Promise.all([
    supabase
      .from('pelvic_floor_pt_listings')
      .select('*')
      .eq('is_approved', false)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),

    supabase
      .from('pelvic_floor_pt_listings')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(20),

    supabase
      .from('pelvic_floor_pt_listings')
      .select('listing_tier, is_approved', { count: 'exact' }),
  ])

  const listings = stats.data ?? []
  const totalListings = listings.length
  const pendingCount = (pending.data ?? []).length
  const paidCount = listings.filter((l) => ['verified', 'featured'].includes(l.listing_tier)).length
  const claimedCount = listings.filter((l) => l.listing_tier !== 'unclaimed').length

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight mb-8">Admin Panel</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Listings', value: totalListings },
            { label: 'Pending Approval', value: pendingCount },
            { label: 'Claimed', value: claimedCount },
            { label: 'Paid', value: paidCount },
          ].map(({ label, value }) => (
            <div key={label} className="card p-5 text-center">
              <div className="text-3xl font-bold text-teal">{value}</div>
              <div className="text-sm text-stone-400 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Pending approvals */}
        {pendingCount > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-stone-700 mb-4">
              Pending Approval ({pendingCount})
            </h2>
            <div className="card p-5">
              <AdminTable listings={pending.data ?? []} />
            </div>
          </div>
        )}

        {/* Recent listings */}
        <div>
          <h2 className="text-xl font-bold text-stone-700 mb-4">Recent Listings</h2>
          <div className="card p-5">
            <AdminTable listings={recent.data ?? []} />
          </div>
        </div>
      </div>
    </div>
  )
}
