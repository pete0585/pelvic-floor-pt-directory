import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const listingId = searchParams.get('listing_id')

  if (!token || !listingId) {
    return NextResponse.json({ error: 'Missing token or listing_id' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data: claim } = await supabase
    .from('pelvic_floor_pt_claims')
    .select('*')
    .eq('token', token)
    .eq('listing_id', listingId)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!claim) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  }

  const now = new Date().toISOString()

  await Promise.all([
    supabase
      .from('pelvic_floor_pt_claims')
      .update({ verified: true, verified_at: now })
      .eq('id', claim.id),

    supabase
      .from('pelvic_floor_pt_listings')
      .update({
        listing_tier: 'free',
        claimed_at: now,
        email: claim.email,
      })
      .eq('id', listingId),
  ])

  return NextResponse.json({ success: true })
}
