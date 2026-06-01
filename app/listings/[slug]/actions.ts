'use server'

import { redirect } from 'next/navigation'
import { stripe, PRICING } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function createCheckoutSession(
  listingId: string,
  listingSlug: string,
  tier: 'verified' | 'featured',
) {
  const pricing = PRICING[tier]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pelvicfloordirectory.com'

  const supabase = await createServiceClient()
  const { data: listing } = await supabase
    .from('pelvic_floor_pt_listings')
    .select('full_name, email, stripe_customer_id')
    .eq('id', listingId)
    .single()

  let customerId = listing?.stripe_customer_id

  if (!customerId && listing?.email) {
    const customer = await stripe.customers.create({
      email: listing.email,
      name: listing.full_name,
      metadata: { listing_id: listingId, directory: 'pelvic-floor-pt' },
    })
    customerId = customer.id
    await supabase
      .from('pelvic_floor_pt_listings')
      .update({ stripe_customer_id: customerId })
      .eq('id', listingId)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId ?? undefined,
    line_items: [{ price: pricing.priceId, quantity: 1 }],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: `${siteUrl}/listings/${listingSlug}?verified=true`,
    cancel_url: `${siteUrl}/listings/${listingSlug}`,
    metadata: { listing_id: listingId, listing_slug: listingSlug, tier, directory: 'pelvic-floor-pt' },
  })

  redirect(session.url!)
}
