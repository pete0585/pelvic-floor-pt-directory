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
  // Accept either UUID id or slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
  const { data: listing } = await supabase
    .from('pelvic_floor_pt_listings')
    .select('id, slug, full_name, city, state, listing_tier, claimed_at')
    .eq(isUUID ? 'id' : 'slug', id)
    .single()

  if (!listing) notFound()

  return <ClaimPageClient listing={listing} />
}
