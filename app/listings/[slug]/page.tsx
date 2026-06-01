import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, ShieldCheck } from 'lucide-react'
import ListingDetail from '@/components/ListingDetail'
import { getListingBySlug } from '@/lib/data'
import { createCheckoutSession } from './actions'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ verified?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return { title: 'Listing Not Found' }

  const title = `${listing.full_name}${listing.credentials ? `, ${listing.credentials}` : ''} — Pelvic Floor PT in ${listing.city}, ${listing.state}`
  const description = listing.bio
    ? listing.bio.slice(0, 160)
    : `Pelvic floor physical therapist in ${listing.city}, ${listing.state}. ${listing.conditions_treated?.slice(0, 3).join(', ')}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
  }
}

export default async function ListingPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { verified } = await searchParams
  const listing = await getListingBySlug(slug)

  if (!listing) notFound()

  const isUpgraded = verified === 'true'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: listing.full_name,
    description: listing.bio ?? undefined,
    address: listing.city
      ? {
          '@type': 'PostalAddress',
          addressLocality: listing.city,
          addressRegion: listing.state,
          postalCode: listing.zip ?? undefined,
        }
      : undefined,
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    medicalSpecialty: 'PhysicalTherapy',
    availableService: (listing.conditions_treated ?? []).map((c) => ({
      '@type': 'MedicalTherapy',
      name: c,
    })),
    hasCredential: (listing.certifications ?? []).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.toUpperCase(),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-teal transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to directory
          </Link>

          {isUpgraded && (
            <div className="mb-6 rounded-2xl bg-teal-50 border border-teal-200 p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-teal shrink-0" />
              <div>
                <p className="font-semibold text-teal-700">Your listing has been upgraded!</p>
                <p className="text-sm text-teal-600">
                  Your verified badge and priority placement are now active. Thank you.
                </p>
              </div>
            </div>
          )}

          <ListingDetail listing={listing} />

          {/* Upgrade section for claimed free listings */}
          {isUpgraded && listing.listing_tier === 'free' && (
            <div className="mt-8 card p-8 text-center border-2 border-teal-100">
              <h2 className="text-2xl font-bold text-stone-700 mb-3">
                Upgrade to get more patients
              </h2>
              <p className="text-stone-400 mb-8 max-w-lg mx-auto">
                A Verified listing gets you priority placement in search results, a credential badge,
                and a direct booking CTA — for $99/year. One new patient pays for it 10x over.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="rounded-2xl bg-cream-100 border-2 border-teal-200 p-6 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="h-5 w-5 text-teal" />
                    <span className="font-bold text-stone-700">Verified</span>
                  </div>
                  <div className="text-2xl font-bold text-teal mb-1">$99/yr</div>
                  <ul className="text-sm text-stone-500 space-y-1 mb-5">
                    <li>✓ Verified badge</li>
                    <li>✓ Priority placement</li>
                    <li>✓ Full profile display</li>
                    <li>✓ Credential badges</li>
                    <li>✓ Direct booking CTA</li>
                  </ul>
                  <form action={createCheckoutSession.bind(null, listing.id, listing.slug, 'verified')}>
                    <button type="submit" className="btn-primary w-full">
                      Upgrade to Verified
                    </button>
                  </form>
                </div>

                <div className="rounded-2xl bg-coral-50 border-2 border-coral-200 p-6 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-coral-500" />
                    <span className="font-bold text-stone-700">Featured</span>
                  </div>
                  <div className="text-2xl font-bold text-coral-500 mb-1">$199/yr</div>
                  <ul className="text-sm text-stone-500 space-y-1 mb-5">
                    <li>✓ Everything in Verified</li>
                    <li>✓ Featured placement</li>
                    <li>✓ Top Provider badge</li>
                    <li>✓ City page spotlight</li>
                    <li>✓ Condition page feature</li>
                  </ul>
                  <form action={createCheckoutSession.bind(null, listing.id, listing.slug, 'featured')}>
                    <button type="submit" className="btn-coral w-full">
                      Upgrade to Featured
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
