import { existsSync, readdirSync } from 'fs'
import { basename, dirname, join } from 'path'
import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pelvicfloordirectory.com'

function globStaticCityPages(): string[] {
  const patternRoot = join(process.cwd(), 'app', 'pelvic-floor-pt')
  if (!existsSync(patternRoot)) return []

  return readdirSync(patternRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('['))
    .map((entry) => join(patternRoot, entry.name, 'page.tsx'))
    .filter((file) => existsSync(file))
}

function getStaticCityUrls(): MetadataRoute.Sitemap {
  return globStaticCityPages()
    .map((file) => basename(dirname(file)))
    .map((folder) => ({
      url: `${BASE_URL}/pelvic-floor-pt/${folder}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
}

const CONDITIONS = [
  'postpartum', 'pregnancy', 'urinary_incontinence', 'prolapse',
  'pelvic_pain', 'endometriosis', 'painful_sex', 'vaginismus',
  'male_pelvic_health', 'diastasis_recti', 'menopause', 'sports',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('pelvic_floor_pt_listings')
    .select('slug, updated_at')
    .eq('is_active', true)
    .eq('is_approved', true)

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${BASE_URL}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const conditionUrls: MetadataRoute.Sitemap = CONDITIONS.map((c) => ({
    url: `${BASE_URL}/conditions/${c}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...getStaticCityUrls(),
    ...conditionUrls,
    ...listingUrls,
  ]
}
