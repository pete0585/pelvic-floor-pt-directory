import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const STRIPE_VERIFIED_PRICE_ID = process.env.STRIPE_VERIFIED_PRICE_ID!
export const STRIPE_FEATURED_PRICE_ID = process.env.STRIPE_FEATURED_PRICE_ID!

export const PRICING = {
  verified: {
    priceId: STRIPE_VERIFIED_PRICE_ID,
    amount: 99,
    label: 'Verified',
    description: 'Verified badge, priority placement, full profile',
  },
  featured: {
    priceId: STRIPE_FEATURED_PRICE_ID,
    amount: 199,
    label: 'Featured',
    description: 'Everything in Verified + Featured placement + Top Provider badge',
  },
} as const

export async function createCheckoutSession({
  listingId,
  tier,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  listingId: string
  tier: 'verified' | 'featured'
  customerEmail?: string
  successUrl: string
  cancelUrl: string
}) {
  const priceId = tier === 'featured' ? STRIPE_FEATURED_PRICE_ID : STRIPE_VERIFIED_PRICE_ID

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    customer_email: customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
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

  return session
}
