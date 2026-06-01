import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { email, directory } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    await supabase.from('email_subscribers').upsert(
      { email: email.toLowerCase(), directory: directory ?? 'pelvic-floor-pt' },
      { onConflict: 'email,directory', ignoreDuplicates: true },
    )

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'hello@mail.pelvicfloordirectory.com'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'curl/8.5.0',
      },
      body: JSON.stringify({
        from: `PelvicFloorPT Directory <${fromEmail}>`,
        to: [email],
        subject: 'You\'re subscribed to PelvicFloorPTDirectory.com',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
            <h2 style="color: #1A6B6B; margin-bottom: 8px;">You're in!</h2>
            <p style="color: #3D3830;">
              Thanks for subscribing to PelvicFloorPTDirectory.com. You'll get occasional pelvic health tips and updates on new therapists in your area.
            </p>
            <p style="color: #908980; font-size: 13px; margin-top: 24px;">
              To unsubscribe, reply "unsubscribe" to this email.
            </p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
