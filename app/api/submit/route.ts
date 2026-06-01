import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      full_name, credentials, practice_name, email, phone, website, booking_url,
      address_line1, city, state, zip, bio, accepts_telehealth, accepting_new_patients,
      home_visits, conditions_treated, certifications, insurance_accepted, languages_spoken,
    } = body

    if (!full_name || !email || !city || !state) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const baseSlug = slugify(`${full_name} ${city} ${state}`)
    const { data: existing } = await supabase
      .from('pelvic_floor_pt_listings')
      .select('slug')
      .like('slug', `${baseSlug}%`)

    let slug = baseSlug
    if (existing && existing.length > 0) {
      slug = `${baseSlug}-${existing.length + 1}`
    }

    const { error } = await supabase.from('pelvic_floor_pt_listings').insert({
      slug,
      full_name,
      credentials: credentials || null,
      practice_name: practice_name || null,
      email: email.toLowerCase(),
      phone: phone || null,
      website: website || null,
      booking_url: booking_url || null,
      address_line1: address_line1 || null,
      city,
      state,
      zip: zip || null,
      bio: bio || null,
      accepts_telehealth: accepts_telehealth ?? false,
      accepting_new_patients: accepting_new_patients ?? true,
      home_visits: home_visits ?? false,
      conditions_treated: conditions_treated ?? [],
      certifications: certifications ?? [],
      insurance_accepted: insurance_accepted ?? [],
      languages_spoken: languages_spoken?.length ? languages_spoken : ['English'],
      listing_tier: 'unclaimed',
      is_verified: false,
      is_active: true,
      is_approved: false,
      source: 'self_submitted',
      email_source: 'manual',
    })

    if (error) {
      console.error('Submit error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
