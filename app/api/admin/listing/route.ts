import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim())
  if (!adminEmails.includes(user.email ?? '')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id, action } = await req.json()

  const serviceClient = await createServiceClient()

  if (action === 'approve') {
    await serviceClient
      .from('pelvic_floor_pt_listings')
      .update({ is_approved: true })
      .eq('id', id)
  } else if (action === 'reject') {
    await serviceClient
      .from('pelvic_floor_pt_listings')
      .update({ is_active: false, is_approved: false })
      .eq('id', id)
  }

  return NextResponse.json({ success: true })
}
