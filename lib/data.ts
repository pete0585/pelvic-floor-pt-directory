import { createClient } from './supabase/server'
import type { Listing, CityPage } from '@/types'

const TABLE = 'pelvic_floor_pt_listings'
const CITIES_TABLE = 'pelvic_floor_pt_cities'

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data
}

export async function getListings({
  state,
  city,
  condition,
  certification,
  insurance,
  telehealth,
  acceptingNew,
  homeVisits,
  search,
  page = 1,
  pageSize = 20,
}: {
  state?: string
  city?: string
  condition?: string
  certification?: string
  insurance?: string
  telehealth?: boolean
  acceptingNew?: boolean
  homeVisits?: boolean
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .order('full_name', { ascending: true })

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (condition) query = query.contains('conditions_treated', [condition])
  if (certification) query = query.contains('certifications', [certification])
  if (insurance) query = query.contains('insurance_accepted', [insurance])
  if (telehealth === true) query = query.eq('accepts_telehealth', true)
  if (acceptingNew === true) query = query.eq('accepting_new_patients', true)
  if (homeVisits === true) query = query.eq('home_visits', true)
  if (search) query = query.textSearch('search_vector', search, { type: 'websearch' })

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, count } = await query
  return { listings: data ?? [], total: count ?? 0 }
}

export async function getListingsByCondition(condition: string, limit = 20): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .contains('conditions_treated', [condition])
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getListingCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)
  return count ?? 0
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .in('listing_tier', ['verified', 'featured'])
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getCityPage(citySlug: string): Promise<CityPage | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(CITIES_TABLE)
    .select('*')
    .eq('slug', citySlug)
    .single()
  return data
}

export async function getListingsByCity(city: string, state: string, limit = 20): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .ilike('city', city)
    .ilike('state', state)
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return data ?? []
}

export async function getActiveCities(limit = 150): Promise<CityPage[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(CITIES_TABLE)
    .select('*')
    .gt('listing_count', 0)
    .order('listing_count', { ascending: false })
    .limit(limit)
  return data ?? []
}

export async function getActiveStates(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)
  const states = [...new Set((data ?? []).map((r: { state: string }) => r.state))].sort()
  return states
}
