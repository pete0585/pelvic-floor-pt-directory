import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { listing_id, tier } = session.metadata ?? {}

        if (!listing_id || !tier) break

        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id

        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()

        await supabase
          .from('pelvic_floor_pt_listings')
          .update({
            listing_tier: tier,
            is_verified: tier === 'verified' || tier === 'featured',
            stripe_subscription_id: subscriptionId ?? null,
            subscription_expires_at: expiresAt,
          })
          .eq('id', listing_id)

        await supabase.from('pelvic_floor_pt_payments').insert({
          listing_id,
          stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          stripe_subscription_id: subscriptionId ?? null,
          amount_cents: session.amount_total ?? 0,
          currency: session.currency ?? 'usd',
          tier,
          status: 'succeeded',
          period_start: new Date().toISOString(),
          period_end: expiresAt,
        })

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const { listing_id } = subscription.metadata ?? {}

        if (!listing_id) break

        await supabase
          .from('pelvic_floor_pt_listings')
          .update({
            listing_tier: 'free',
            is_verified: false,
            stripe_subscription_id: null,
            subscription_expires_at: null,
          })
          .eq('id', listing_id)
          .eq('stripe_subscription_id', subscription.id)

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id

        if (subscriptionId) {
          await supabase.from('pelvic_floor_pt_payments').insert({
            listing_id: null,
            stripe_subscription_id: subscriptionId,
            amount_cents: invoice.amount_due,
            currency: invoice.currency,
            tier: 'unknown',
            status: 'failed',
          })
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('Webhook processing error:', err)
    return NextResponse.json({ error: 'Processing error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
