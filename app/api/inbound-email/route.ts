import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const secret = process.env.INBOUND_WEBHOOK_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const fromEmail = (payload.from as string) ?? ''
  const fromName = (payload.from_name as string) ?? ''
  const subject = (payload.subject as string) ?? ''
  const bodyText = (payload.text as string) ?? (payload.body_text as string) ?? ''
  const bodyHtml = (payload.html as string) ?? (payload.body_html as string) ?? ''

  const supabase = await createServiceClient()

  let listingId: string | null = null
  let listingSlug: string | null = null

  if (fromEmail) {
    const { data: listing } = await supabase
      .from('pelvic_floor_pt_listings')
      .select('id, slug')
      .eq('email', fromEmail.toLowerCase())
      .single()

    if (listing) {
      listingId = listing.id
      listingSlug = listing.slug
    }
  }

  await supabase.from('inbound_emails').insert({
    directory: 'pelvic-floor-pt',
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    listing_id: listingId,
    listing_slug: listingSlug,
    processed: false,
  })

  return NextResponse.json({ received: true })
}
