#!/usr/bin/env node
/**
 * Pelvic Floor PT Directory — Initial Seed Script
 *
 * Queries DataForSEO Google Maps for "pelvic floor physical therapist" across
 * the top 50 US metros and inserts results into pelvic_floor_pt_listings via
 * the Supabase REST API.
 *
 * Usage:
 *   DATAFORSEO_LOGIN=... DATAFORSEO_PASSWORD=... DIRECTORY_SUPABASE_SERVICE_KEY=... \
 *     npx ts-node scripts/seed.ts
 *
 * Or after build:
 *   node scripts/seed.js
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://fbuqrnzofktepkzyfmhy.supabase.co'
const SUPABASE_KEY = process.env.DIRECTORY_SUPABASE_SERVICE_KEY ?? ''
const DFS_LOGIN = process.env.DATAFORSEO_LOGIN ?? ''
const DFS_PASSWORD = process.env.DATAFORSEO_PASSWORD ?? ''

const TABLE = 'pelvic_floor_pt_listings'

// Top 50 metros — full state names required by DataForSEO (no abbreviations)
// Skipping known DFS Invalid Field cities (Saint Louis, Stockton, Saint Petersburg, McKinney, Springfield OH)
const METROS = [
  'New York,New York,United States',
  'Los Angeles,California,United States',
  'Chicago,Illinois,United States',
  'Houston,Texas,United States',
  'Phoenix,Arizona,United States',
  'Philadelphia,Pennsylvania,United States',
  'San Antonio,Texas,United States',
  'San Diego,California,United States',
  'Dallas,Texas,United States',
  'San Jose,California,United States',
  'Austin,Texas,United States',
  'Jacksonville,Florida,United States',
  'Columbus,Ohio,United States',
  'Indianapolis,Indiana,United States',
  'Charlotte,North Carolina,United States',
  'San Francisco,California,United States',
  'Seattle,Washington,United States',
  'Denver,Colorado,United States',
  'Nashville,Tennessee,United States',
  'Oklahoma City,Oklahoma,United States',
  'Washington,District of Columbia,United States',
  'Las Vegas,Nevada,United States',
  'Louisville,Kentucky,United States',
  'Memphis,Tennessee,United States',
  'Portland,Oregon,United States',
  'Baltimore,Maryland,United States',
  'Milwaukee,Wisconsin,United States',
  'Albuquerque,New Mexico,United States',
  'Tucson,Arizona,United States',
  'Fresno,California,United States',
  'Sacramento,California,United States',
  'Kansas City,Missouri,United States',
  'Atlanta,Georgia,United States',
  'Omaha,Nebraska,United States',
  'Colorado Springs,Colorado,United States',
  'Raleigh,North Carolina,United States',
  'Virginia Beach,Virginia,United States',
  'Minneapolis,Minnesota,United States',
  'Tampa,Florida,United States',
  'New Orleans,Louisiana,United States',
  'Wichita,Kansas,United States',
  'Cleveland,Ohio,United States',
  'Aurora,Colorado,United States',
  'Miami,Florida,United States',
  'Oakland,California,United States',
  'Tulsa,Oklahoma,United States',
  'Pittsburgh,Pennsylvania,United States',
  'Cincinnati,Ohio,United States',
  'Salt Lake City,Utah,United States',
  'Richmond,Virginia,United States',
]

const KEYWORDS = ['pelvic floor physical therapist', 'pelvic floor PT', 'pelvic floor therapy']

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildSlug(name: string, city: string, state: string): string {
  return `${slugify(name)}-${slugify(city)}-${slugify(state)}`
}

async function fetchExistingSlugs(): Promise<Set<string>> {
  const slugs = new Set<string>()
  let offset = 0
  const batchSize = 1000

  while (true) {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/${TABLE}?select=slug&order=id&limit=${batchSize}&offset=${offset}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'User-Agent': 'curl/8.5.0',
        },
      }
    )

    // HTTP 416 = Range Not Satisfiable = end of data
    if (res.status === 416) break

    if (!res.ok) {
      console.error(`Failed to fetch slugs (offset ${offset}): ${res.status}`)
      break
    }

    const rows: Array<{ slug: string }> = await res.json()
    if (!rows.length) break

    rows.forEach((r) => r.slug && slugs.add(r.slug))

    if (rows.length < batchSize) break
    offset += batchSize
  }

  return slugs
}

async function queryDataForSEO(keyword: string, location: string): Promise<unknown[]> {
  const auth = Buffer.from(`${DFS_LOGIN}:${DFS_PASSWORD}`).toString('base64')

  const res = await fetch('https://api.dataforseo.com/v3/serp/google/maps/live/advanced', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      'User-Agent': 'curl/8.5.0',
    },
    body: JSON.stringify([
      {
        keyword,
        location_name: location,
        language_name: 'English',
        depth: 20,
      },
    ]),
  })

  if (!res.ok) {
    console.error(`DFS HTTP error ${res.status} for ${keyword} in ${location}`)
    return []
  }

  const data = await res.json()
  const task = data?.tasks?.[0]

  if (!task) return []

  const statusCode = task.status_code
  // 40501 = Invalid Field (city not in DFS), 40102 = No Search Results
  if (statusCode === 40501 || statusCode === 40102) {
    console.log(`  DFS skip (${statusCode}): ${location}`)
    return []
  }

  if (statusCode !== 20000) {
    console.error(`  DFS error ${statusCode}: ${task.status_message} for ${keyword} in ${location}`)
    return []
  }

  const items: unknown[] = task.result?.[0]?.items ?? []
  // DFS returns type='maps_search', not 'maps_search_result' — use 'maps' in type check
  return items.filter((item: unknown) => {
    const i = item as Record<string, unknown>
    return typeof i.type === 'string' && i.type.includes('maps')
  })
}

function extractStateFromAddress(address: string | null): string {
  if (!address) return ''
  // Try to extract 2-letter state from end of address
  const match = address?.match(/,\s*([A-Z]{2})\s+\d{5}/)
  return match ? match[1] : ''
}

function buildRecord(
  item: Record<string, unknown>,
  existingSlugs: Set<string>
): Record<string, unknown> | null {
  const title = (item.title as string) ?? ''
  const addressInfo = (item.address_info as Record<string, unknown>) ?? {}
  const city = (addressInfo.city as string) ?? ''
  const stateAbbr = (addressInfo.region as string) ?? extractStateFromAddress(item.address as string)
  const zip = (addressInfo.zip as string) ?? null

  if (!title || !city || !stateAbbr) return null

  // Build dedup-safe slug
  let slug = buildSlug(title, city, stateAbbr)
  let suffix = 1
  while (existingSlugs.has(slug)) {
    slug = `${buildSlug(title, city, stateAbbr)}-${suffix}`
    suffix++
  }
  existingSlugs.add(slug)

  const phone = (item.phone as string) ?? null
  const website = (item.url as string) ?? null

  return {
    slug,
    full_name: title,
    credentials: null,
    practice_name: title,
    bio: null,
    headshot_url: null,
    phone,
    website,
    booking_url: null,
    email: null,
    do_not_email: false,
    address_line1: (item.address as string) ?? null,
    address_line2: null,
    city,
    state: stateAbbr,
    zip,
    latitude: null,
    longitude: null,
    conditions_treated: [],
    certifications: [],
    insurance_accepted: [],
    languages_spoken: ['English'],
    accepts_telehealth: false,
    accepting_new_patients: true,
    home_visits: false,
    listing_tier: 'unclaimed',
    is_verified: false,
    is_active: true,
    is_approved: true,
    source: 'dataforseo',
    email_source: null,
  }
}

async function batchInsert(records: Array<Record<string, unknown>>): Promise<number> {
  if (!records.length) return 0

  // Try batch first
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      'User-Agent': 'curl/8.5.0',
    },
    body: JSON.stringify(records),
  })

  if (res.ok) return records.length

  if (res.status === 409) {
    // Fall back to individual inserts
    let inserted = 0
    for (const record of records) {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
          'User-Agent': 'curl/8.5.0',
        },
        body: JSON.stringify(record),
      })
      if (r.ok) inserted++
      else if (r.status !== 409) {
        const body = await r.text()
        console.error(`  Insert error ${r.status}: ${body.slice(0, 200)}`)
      }
    }
    return inserted
  }

  const body = await res.text()
  console.error(`  Batch insert error ${res.status}: ${body.slice(0, 200)}`)
  return 0
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  console.log('=== Pelvic Floor PT Directory — Seed Script ===')
  console.log(`Supabase: ${SUPABASE_URL}`)
  console.log(`Table: ${TABLE}`)
  console.log(`Metros: ${METROS.length}`)
  console.log(`Keywords: ${KEYWORDS.length}`)
  console.log()

  if (!SUPABASE_KEY) {
    console.error('DIRECTORY_SUPABASE_SERVICE_KEY is required')
    process.exit(1)
  }

  if (!DFS_LOGIN || !DFS_PASSWORD) {
    console.error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD are required')
    process.exit(1)
  }

  console.log('Loading existing slugs...')
  const existingSlugs = await fetchExistingSlugs()
  console.log(`  ${existingSlugs.size} existing slugs loaded`)
  console.log()

  let totalInserted = 0
  let totalFound = 0

  for (const metro of METROS) {
    const cityDisplay = metro.split(',')[0]
    console.log(`\n--- ${cityDisplay} ---`)

    const seenThisCity = new Set<string>()
    const toInsert: Array<Record<string, unknown>> = []

    for (const keyword of KEYWORDS) {
      await sleep(1500) // Rate limit: ~40 req/min
      const items = await queryDataForSEO(keyword, metro)

      for (const item of items) {
        const record = buildRecord(item as Record<string, unknown>, existingSlugs)
        if (!record) continue

        // Dedup within this city batch
        if (seenThisCity.has(record.slug as string)) continue
        seenThisCity.add(record.slug as string)

        toInsert.push(record)
        totalFound++
      }
    }

    if (toInsert.length === 0) {
      console.log(`  No new listings`)
      continue
    }

    console.log(`  Inserting ${toInsert.length} listings...`)
    const inserted = await batchInsert(toInsert)
    totalInserted += inserted
    console.log(`  ✓ ${inserted} inserted`)
  }

  console.log('\n=== Seed Complete ===')
  console.log(`Found: ${totalFound}`)
  console.log(`Inserted: ${totalInserted}`)
  console.log(`Skipped (duplicates): ${totalFound - totalInserted}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
