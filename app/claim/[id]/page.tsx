import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ClaimPageClient from './ClaimPageClient'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Claim Your Listing',
  description: 'Claim and verify your pelvic floor PT listing on PelvicFloorPTDirectory.com.',
}

export default async function ClaimPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createServiceClient()
  const { data: listing } = await supabase
    .from('pelvic_floor_pt_listings')
    .select('id, full_name, city, state, listing_tier, claimed_at')
    .eq('id', id)
    .single()

  if (!listing) notFound()

  return <ClaimPageClient listing={listing} />
}
