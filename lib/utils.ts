import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

export function formatPhone(phone: string | null): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return phone
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function stateAbbr(state: string): string {
  const map: Record<string, string> = {
    Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
    Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
    Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA',
    Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
    Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO',
    Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
    'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND',
    Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI',
    'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX',
    Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV',
    Wisconsin: 'WI', Wyoming: 'WY', 'District of Columbia': 'DC',
  }
  if (state.length === 2) return state.toUpperCase()
  return map[state] ?? state
}

export function conditionLabel(slug: string): string {
  const map: Record<string, string> = {
    postpartum: 'Postpartum Recovery',
    pregnancy: 'Pregnancy & Birth Prep',
    urinary_incontinence: 'Urinary Incontinence',
    prolapse: 'Pelvic Organ Prolapse',
    pelvic_pain: 'Chronic Pelvic Pain',
    endometriosis: 'Endometriosis',
    painful_sex: 'Painful Sex',
    vaginismus: 'Vaginismus',
    male_pelvic_health: 'Male Pelvic Health',
    pediatric: 'Pediatric Pelvic Health',
    diastasis_recti: 'Diastasis Recti',
    constipation: 'Constipation & Bowel Issues',
    sexual_dysfunction: 'Sexual Dysfunction',
    interstitial_cystitis: 'Interstitial Cystitis',
    menopause: 'Menopause & GSM',
    cancer_recovery: 'Cancer Recovery',
    sports: 'Sports & Athletes',
    other: 'Other',
  }
  return map[slug] ?? slug
}

export function certLabel(cert: string): string {
  const map: Record<string, string> = {
    capp: 'CAPP',
    wcs: 'WCS',
    bcb_pmd: 'BCB-PMD',
    prpc: 'PRPC',
    other: 'Certified',
  }
  return map[cert] ?? cert.toUpperCase()
}
