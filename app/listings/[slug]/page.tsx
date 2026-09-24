import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, ShieldCheck } from 'lucide-react';
import ListingDetail from '@/components/ListingDetail';
import { ViewTracker } from '@/components/ViewTracker';
import { getListingBySlug } from '@/lib/data';
import { createServiceClient } from '@/lib/supabase/server';
interface Props {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        verified?: string;
    }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const listing = await getListingBySlug(slug);
    if (!listing)
        return { title: 'Listing Not Found' };
    const title = `${listing.full_name}${listing.credentials ? `, ${listing.credentials}` : ''} — Pelvic Floor PT in ${listing.city}, ${listing.state}`;
    const description = listing.bio
        ? listing.bio.slice(0, 160)
        : `Pelvic floor physical therapist in ${listing.city}, ${listing.state}. ${listing.conditions_treated?.slice(0, 3).join(', ')}.`;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'profile',
        },
    };
}
export default async function ListingPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { verified } = await searchParams;
    const listing = await getListingBySlug(slug);
    if (!listing)
        notFound();
    const isUpgraded = verified === 'true';
    const supabase = await createServiceClient();
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { count: viewCount } = await supabase
        .from('listing_views')
        .select('*', { count: 'exact', head: true })
        .eq('directory_slug', 'pelvic-floor-pt')
        .eq('listing_id', String(listing.id))
        .gte('viewed_at', monthStart);
    const monthlyViews = viewCount ?? 0;
    const isClaimed = listing.listing_tier !== 'unclaimed' && listing.listing_tier != null;
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
        telephone: (listing.phone ?? undefined),
        url: (listing.website ?? undefined),
        medicalSpecialty: 'PhysicalTherapy',
        availableService: (listing.conditions_treated ?? []).map((c) => ({
            '@type': 'MedicalTherapy',
            name: c,
        })),
        hasCredential: (listing.certifications ?? []).map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.toUpperCase(),
        })),
    };
    return (<>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <ViewTracker listingId={String(listing.id)} directorySlug='pelvic-floor-pt'/>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/listings" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-teal transition-colors mb-6">
            <ArrowLeft className="h-4 w-4"/>
            Back to directory
          </Link>

          {isUpgraded && (<div className="mb-6 rounded-2xl bg-teal-50 border border-teal-200 p-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-teal shrink-0"/>
              <div>
                <p className="font-semibold text-teal-700"> Listings are free. Public contact details are available without payment. </p>
                <p className="text-sm text-teal-600">
                  Your verified badge and priority placement are now active. Thank you.
                </p>
              </div>
            </div>)}

          <ListingDetail listing={listing} monthlyViews={monthlyViews}/>


      {/* Studio Zero provider callout */}
      <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-5">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Are you a provider listed here?</span>{' '}
          <a href={`/claim/${listing.id}`} className="underline hover:opacity-80">Claim your free listing</a>
          {' '}to add your contact details and bio.{' '}
          <a href="https://studiozerohq.com" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Studio Zero</a>
          {' '}helps healthcare providers grow their practice with AI-powered marketing.
        </p>
      </div>
          {/* Claim CTA for unclaimed listings */}
          {!isClaimed && !isUpgraded && (<div className="mt-8 rounded-2xl bg-teal-50 border border-teal-200 p-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-teal-700">Is this your practice?</p>
                <p className="text-sm text-teal-600 mt-1">
                  Claim your free listing to add contact info, get a verified badge, and be found by more patients.
                </p>
              </div>
              <Link href={`/claim/${listing.id}`} className="btn-primary shrink-0">
                Claim Listing
              </Link>
            </div>)}
        </div>
      </div>
    </>);
}
