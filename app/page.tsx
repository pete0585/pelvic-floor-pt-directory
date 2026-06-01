import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Search, ArrowRight, Video, Home, CheckCircle, Heart, Award, Users } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getListingCount } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Find a Pelvic Floor Physical Therapist Near You | PelvicFloorPTDirectory.com',
  description:
    'Find a pelvic floor PT who specializes in postpartum recovery, incontinence, prolapse, pelvic pain, and more. Search by condition and location.',
}

const CONDITIONS = [
  { label: 'Postpartum Recovery', slug: 'postpartum', emoji: '🤱' },
  { label: 'Urinary Incontinence', slug: 'urinary_incontinence', emoji: '💧' },
  { label: 'Pelvic Organ Prolapse', slug: 'prolapse', emoji: '🩺' },
  { label: 'Chronic Pelvic Pain', slug: 'pelvic_pain', emoji: '🌿' },
  { label: 'Endometriosis', slug: 'endometriosis', emoji: '💛' },
  { label: 'Vaginismus', slug: 'vaginismus', emoji: '🌸' },
  { label: 'Pregnancy & Birth Prep', slug: 'pregnancy', emoji: '✨' },
  { label: 'Male Pelvic Health', slug: 'male_pelvic_health', emoji: '⚕️' },
  { label: 'Diastasis Recti', slug: 'diastasis_recti', emoji: '🔄' },
  { label: 'Sports & Athletes', slug: 'sports', emoji: '🏃' },
]

const TOP_CITIES = [
  { name: 'New York', state: 'NY' },
  { name: 'Los Angeles', state: 'CA' },
  { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' },
  { name: 'Phoenix', state: 'AZ' },
  { name: 'Austin', state: 'TX' },
  { name: 'Denver', state: 'CO' },
  { name: 'Seattle', state: 'WA' },
  { name: 'Miami', state: 'FL' },
  { name: 'Atlanta', state: 'GA' },
  { name: 'Boston', state: 'MA' },
  { name: 'San Diego', state: 'CA' },
]

export default async function HomePage() {
  const [featured, listingCount] = await Promise.all([
    getFeaturedListings(6).catch(() => []),
    getListingCount().catch(() => 0),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-4 py-2 text-sm text-teal-600 mb-6">
            <Heart className="h-4 w-4 fill-teal-200 text-teal-300" />
            <span>
              {listingCount > 0
                ? `${listingCount.toLocaleString()} pelvic floor PTs in our directory`
                : 'The first directory built exclusively for pelvic floor PTs'}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-stone-800 leading-tight sm:text-5xl md:text-6xl text-balance tracking-tight">
            Find a pelvic floor PT{' '}
            <span className="text-teal">who gets it</span>
          </h1>

          <p className="mt-5 text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            You shouldn&apos;t have to explain your symptoms to a generalist. Find a pelvic floor
            specialist who treats exactly what you&apos;re dealing with — and actually has availability.
          </p>

          <div className="mt-8 flex justify-center">
            <SearchBar size="large" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-stone-400">
            <span className="flex items-center gap-1.5">
              <Video className="h-4 w-4 text-teal-300" />
              Telehealth options
            </span>
            <span className="flex items-center gap-1.5">
              <Home className="h-4 w-4 text-teal-300" />
              Home visits
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-teal-300" />
              Insurance filters
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-coral-400" />
              Verified credentials
            </span>
          </div>
        </div>
      </section>

      {/* Why pelvic floor PT is different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 mx-auto mb-4">
                <ShieldCheck className="h-7 w-7 text-teal" />
              </div>
              <h3 className="text-xl font-bold text-stone-700 mb-2">
                Specialists Only
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Every listing is a physical therapist with specific pelvic floor training —
                not a general PT who occasionally treats pelvic floor. You need someone who does
                this every day.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-50 mx-auto mb-4">
                <Search className="h-7 w-7 text-coral-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-700 mb-2">
                Search by Condition
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Filter by the specific condition you&apos;re dealing with — postpartum, prolapse,
                vaginismus, sports. Find someone who&apos;s treated hundreds of patients exactly like you.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 mx-auto mb-4">
                <Award className="h-7 w-7 text-sage-500" />
              </div>
              <h3 className="text-xl font-bold text-stone-700 mb-2">
                Credential Verified
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Look for CAPP, WCS, BCB-PMD, and PRPC certification badges — advanced credentials
                that prove a PT has gone beyond general licensure to specialize in pelvic health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by condition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">What brings you here?</h2>
            <p className="section-subheading">
              Find a pelvic floor PT who specializes in your specific situation.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CONDITIONS.map((c) => (
              <Link
                key={c.slug}
                href={`/conditions/${c.slug}`}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 text-center shadow-soft hover:shadow-card transition-shadow group"
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-xs font-semibold text-stone-600 group-hover:text-teal transition-colors leading-tight">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="section-heading">Featured Pelvic Floor PTs</h2>
                <p className="section-subheading">Verified, credentialed, and accepting patients.</p>
              </div>
              <Link
                href="/listings"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-400"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/listings" className="btn-secondary">
                View all PTs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Browse by city */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cream-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-heading">Search by City</h2>
            <p className="section-subheading">Pelvic floor PTs serving patients across the country.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES.map((city) => (
              <Link
                key={`${city.name}-${city.state}`}
                href={`/listings?location=${encodeURIComponent(city.name + ', ' + city.state)}`}
                className="rounded-xl bg-white px-3 py-3 text-center shadow-soft hover:shadow-card transition-shadow group"
              >
                <p className="text-sm font-semibold text-stone-700 group-hover:text-teal transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">{city.state}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/listings" className="btn-secondary">
              Browse all cities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For practitioners CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-teal">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white/80 mb-6">
            <Users className="h-4 w-4" />
            <span>For pelvic floor PTs</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Are you a pelvic floor PT in private practice?
          </h2>
          <p className="text-teal-100 text-lg mb-8 leading-relaxed">
            Get found by patients who are actively searching for your specialty.
            Free listing included. One new patient covers your annual upgrade cost 10x over.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-teal hover:bg-cream-100 transition-colors"
            >
              Get Listed Free
            </Link>
            <Link
              href="/submit#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-base font-semibold text-white hover:border-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-10 px-4 bg-white border-t border-cream-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-stone-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-teal-300" />
              Free to search, always
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-coral-400" />
              Credential-verified listings
            </span>
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-teal-300" />
              Filter by condition, insurance, and more
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
