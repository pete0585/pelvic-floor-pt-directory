import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, Video, Home, ShieldCheck, Star,
  CheckCircle, Calendar, BookOpen, Award, ArrowRight,
} from 'lucide-react'
import type { Listing } from '@/types'
import { formatPhone, conditionLabel, certLabel } from '@/lib/utils'

interface ListingDetailProps {
  listing: Listing
  monthlyViews?: number
}

export default function ListingDetail({ listing, monthlyViews = 0 }: ListingDetailProps) {
  const isVerified = listing.listing_tier === 'verified'
  const isFeatured = listing.listing_tier === 'featured'
  const isPaid = isVerified || isFeatured
  const isClaimed = listing.listing_tier !== 'unclaimed' && listing.listing_tier != null

  const conditions = listing.conditions_treated ?? []
  const certifications = listing.certifications ?? []
  const insurance = listing.insurance_accepted ?? []
  const languages = listing.languages_spoken ?? []

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex gap-5">
              <div className="shrink-0">
                {listing.headshot_url ? (
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-cream-200">
                    <Image
                      src={listing.headshot_url}
                      alt={listing.full_name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-teal-50 text-teal font-bold text-3xl">
                    {listing.full_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-2">
                  <h1 className="text-2xl font-bold text-stone-800">
                    {listing.full_name}
                    {listing.credentials && (
                      <span className="font-normal text-stone-400 text-lg ml-2">{listing.credentials}</span>
                    )}
                  </h1>
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
                {listing.practice_name && (
                  <p className="text-stone-500 mt-1">{listing.practice_name}</p>
                )}
                <div className="mt-2 flex items-center gap-1.5 text-sm text-stone-400">
                  <MapPin className="h-4 w-4 text-coral-400" />
                  {listing.city}, {listing.state}
                  {listing.zip && ` ${listing.zip}`}
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  {listing.accepts_telehealth && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-teal-600">
                      <Video className="h-4 w-4" />
                      Telehealth available
                    </span>
                  )}
                  {listing.home_visits && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-stone-500">
                      <Home className="h-4 w-4" />
                      Home visits
                    </span>
                  )}
                  {listing.accepting_new_patients && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-sage-600">
                      <CheckCircle className="h-4 w-4" />
                      Accepting new patients
                    </span>
                  )}
                </div>
              </div>
            </div>

            {certifications.length > 0 && (
              <div className="mt-5 pt-5 border-t border-cream-300">
                <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  Certifications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <span key={cert} className="badge-verified">
                      <ShieldCheck className="h-3 w-3" />
                      {certLabel(cert)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gate: bio for unclaimed */}
          {!isClaimed && (
            <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-center'>
              <p className='text-sm text-gray-500'>
                Phone, website, and bio are only visible after this provider claims their listing.
              </p>
              <a
                href={`/claim/${listing.id}`}
                className='mt-2 inline-block text-sm font-medium text-blue-600 hover:underline'
              >
                Is this you? Claim your free profile →
              </a>
            </div>
          )}

          {isClaimed && listing.bio && (
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                About
              </h2>
              <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{listing.bio}</p>
            </div>
          )}

          {conditions.length > 0 && (
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                Conditions Treated
              </h2>
              <div className="flex flex-wrap gap-2">
                {conditions.map((c) => (
                  <Link
                    key={c}
                    href={`/conditions/${c}`}
                    className="rounded-full bg-coral-50 px-3 py-1.5 text-sm text-coral-600 hover:bg-coral-100 transition-colors"
                  >
                    {conditionLabel(c)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {insurance.length > 0 && (
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                Insurance Accepted
              </h2>
              <div className="flex flex-wrap gap-2">
                {insurance.map((ins) => (
                  <span key={ins} className="rounded-full bg-cream-200 px-3 py-1.5 text-sm text-stone-600">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact card */}
          <div className="card p-5">
            <h2 className="font-semibold text-stone-700 mb-4">Contact & Book</h2>

            {/* Stats block for claimed listings */}
            {isClaimed && (
              <div className='mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Profile Activity</p>
                <p className='mt-1 text-3xl font-bold text-blue-900'>{monthlyViews}</p>
                <p className='text-sm text-blue-700'>people viewed your profile this month</p>
                {listing.listing_tier === 'free' && (
                  <p className='mt-2 text-xs text-blue-600'>
                    0 could contact you.{' '}
                    <a href={`/claim/${listing.id}?upgrade=true`} className='underline font-medium'>
                      Upgrade to be reachable →
                    </a>
                  </p>
                )}
              </div>
            )}

            {isClaimed && listing.booking_url && (
              <a
                href={listing.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full mb-3"
              >
                <Calendar className="h-4 w-4" />
                Book Online
              </a>
            )}

            {isClaimed && listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="btn-secondary w-full mb-3 text-sm"
              >
                <Phone className="h-4 w-4" />
                {formatPhone(listing.phone)}
              </a>
            )}

            {isClaimed && listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-teal hover:text-teal-400 transition-colors mt-2"
              >
                <Globe className="h-4 w-4" />
                Visit website
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            )}

            {listing.address_line1 && (
              <div className="mt-4 pt-4 border-t border-cream-300 text-sm text-stone-500">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-coral-400 shrink-0" />
                  <div>
                    <p>{listing.address_line1}</p>
                    {listing.address_line2 && <p>{listing.address_line2}</p>}
                    <p>{listing.city}, {listing.state} {listing.zip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Languages */}
          {languages.length > 0 && languages.some((l) => l.toLowerCase() !== 'english') && (
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-stone-600 mb-3">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang} className="rounded-full bg-cream-200 px-3 py-1 text-xs text-stone-600">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Claim CTA */}
          {listing.listing_tier === 'unclaimed' && (
            <div className="card p-5 border-2 border-teal-100">
              <h2 className="font-semibold text-stone-700 mb-2">Is this your listing?</h2>
              <p className="text-sm text-stone-400 mb-4">
                Claim it free to add your bio, website, and booking link.
              </p>
              <Link href={`/claim/${listing.id}`} className="btn-primary w-full text-sm">
                Claim This Listing
              </Link>
            </div>
          )}

          {/* Upgrade CTA */}
          {listing.listing_tier === 'free' && (
            <div className="card p-5 border-2 border-coral-100">
              <h2 className="font-semibold text-stone-700 mb-2">Upgrade to Verified</h2>
              <p className="text-sm text-stone-400 mb-4">
                Get a verified badge, priority placement, and credential display for $99/year.
              </p>
              <Link href={`/listings/${listing.slug}?verified=true`} className="btn-coral w-full text-sm">
                Upgrade — $99/yr
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
