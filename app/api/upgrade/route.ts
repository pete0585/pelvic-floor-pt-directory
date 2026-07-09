import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { stripe, STRIPE_VERIFIED_PRICE_ID, STRIPE_FEATURED_PRICE_ID } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  let listingId: string | undefined
  let tier: string | undefined

  try {
    const body = await request.json()
    listingId = body?.listingId
    tier = body?.tier
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!listingId || !['verified', 'featured'].includes(tier ?? '')) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const supabase = await createServiceClient()

    const { data: listing, error } = await supabase
      .from('pelvic_floor_pt_listings')
      .select('id, full_name, email')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pelvicfloordirectory.com'
    const priceId = tier === 'featured' ? STRIPE_FEATURED_PRICE_ID : STRIPE_VERIFIED_PRICE_ID

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      customer_email: listing.email ?? undefined,
      success_url: `${siteUrl}/claim/${listingId}?upgraded=true&tier=${tier}`,
      cancel_url: `${siteUrl}/claim/${listingId}`,
      metadata: {
        listing_id: listingId,
        plan_tier: tier,
      },
      subscription_data: {
        metadata: {
          listing_id: listingId,
          plan_tier: tier,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Upgrade error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
