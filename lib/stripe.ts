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
