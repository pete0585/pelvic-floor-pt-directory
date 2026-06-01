import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Video, Home, ShieldCheck, Star, CheckCircle } from 'lucide-react'
import type { Listing } from '@/types'
import { truncate, formatPhone, certLabel, conditionLabel } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
  featured?: boolean
}

export default function ListingCard({ listing, featured = false }: ListingCardProps) {
  const isVerified = listing.listing_tier === 'verified'
  const isFeatured = listing.listing_tier === 'featured'
  const isPaid = isVerified || isFeatured

  const conditions = (listing.conditions_treated ?? [])
  const certifications = (listing.certifications ?? [])

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={`card block p-5 group ${featured || isFeatured ? 'border-2 border-teal-100' : ''}`}
    >
      <div className="flex gap-4">
        <div className="shrink-0">
          {listing.headshot_url ? (
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-cream-200">
              <Image
                src={listing.headshot_url}
                alt={listing.full_name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal font-bold text-xl">
              {listing.full_name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-stone-700 group-hover:text-teal transition-colors truncate">
                {listing.full_name}
                {listing.credentials && (
                  <span className="font-normal text-stone-400 ml-1 text-sm">{listing.credentials}</span>
                )}
              </h3>
              {listing.practice_name && (
                <p className="text-xs text-stone-400 mt-0.5 truncate">{listing.practice_name}</p>
              )}
            </div>
            <div className="shrink-0 flex flex-col gap-1 items-end">
              {isFeatured && (
                <span className="badge-featured">
                  <Star className="h-3 w-3" />
                  Featured
                </span>
              )}
              {isVerified && !isFeatured && (
                <span className="badge-verified">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1 text-xs text-stone-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-coral-400" />
            <span>{listing.city}, {listing.state}</span>
          </div>

          {listing.bio && (
            <p className="mt-2 text-xs text-stone-500 leading-relaxed line-clamp-2">
              {truncate(listing.bio, 120)}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {listing.accepts_telehealth && (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-600">
                <Video className="h-3 w-3" />
                Telehealth
              </span>
            )}
            {listing.home_visits && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2 py-0.5 text-xs text-stone-500">
                <Home className="h-3 w-3" />
                Home visits
              </span>
            )}
            {listing.accepting_new_patients && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-2 py-0.5 text-xs text-sage-600">
                <CheckCircle className="h-3 w-3" />
                Accepting patients
              </span>
            )}
            {(listing.insurance_accepted ?? []).length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-200 px-2 py-0.5 text-xs text-stone-500">
                Insurance accepted
              </span>
            )}
          </div>

          {conditions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {conditions.slice(0, 3).map((c) => (
                <span key={c} className="rounded-full bg-coral-50 px-2 py-0.5 text-xs text-coral-500">
                  {conditionLabel(c)}
                </span>
              ))}
              {conditions.length > 3 && (
                <span className="rounded-full bg-cream-200 px-2 py-0.5 text-xs text-stone-400">
                  +{conditions.length - 3} more
                </span>
              )}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {certifications.slice(0, 2).map((cert) => (
                <span key={cert} className="rounded-full border border-teal-200 px-2 py-0.5 text-xs text-teal-600 font-medium">
                  {certLabel(cert)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
