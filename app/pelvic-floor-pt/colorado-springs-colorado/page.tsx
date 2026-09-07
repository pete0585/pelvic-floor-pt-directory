import type { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pelvicfloordirectory.com"

export const metadata: Metadata = {
  title: "Best Pelvic Floor PT in Colorado Springs, Colorado | Pelvic Floor PT Directory",
  description: "Find pelvic floor pt in Colorado Springs, Colorado. 20+ listed. Filter by city and compare providers.",
  alternates: { canonical: `${BASE}/pelvic-floor-pt/colorado-springs-colorado` },
}

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("pelvic_floor_pt_listings")
    .select("*")
    .eq("city", "Colorado Springs")
    .eq("state", "Colorado")
    .eq("is_active", true)
    .limit(24)
  return data ?? []
}

function listingName(row: Record<string, unknown>) {
  return (
    (row["full_name"] as string) ||
    (row.name as string) ||
    (row.full_name as string) ||
    (row.clinic_name as string) ||
    "Listing"
  )
}

function listingHref(row: Record<string, unknown>) {
  const slug = String(row.slug || "")
  return "/listings/SLUG".replace("SLUG", slug)
}

export default async function CityPage() {
  const listings = await getListings()
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many pelvic floor pt are in Colorado Springs, Colorado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pelvic Floor PT Directory lists 20+ pelvic floor pt in Colorado Springs, Colorado. Counts change as new listings are seeded.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find pelvic floor pt in Colorado Springs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search pelvicfloordirectory.com and filter by Colorado Springs. Compare listed providers, then contact the one that fits.",
        },
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">Colorado Springs, Colorado</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Pelvic Floor PT in Colorado Springs, Colorado
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          20+ listed pelvic floor pt in the Colorado Springs area. Pages are generated from live directory listings — not outreach.
        </p>
        <p className="mt-2 text-sm text-neutral-500">{listings.length} shown on this page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {listings.map((row: Record<string, unknown>, i: number) => (
            <li key={String(row.id || row.slug || i)} className="rounded-xl border border-neutral-200 p-4">
              <Link href={listingHref(row)} className="font-semibold hover:underline">
                {listingName(row)}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">
                {String(row.city || "Colorado Springs")}, {String(row.state || "Colorado")}
              </p>
            </li>
          ))}
        </ul>
        {listings.length === 0 && (
          <p className="mt-8 text-neutral-500">Listings for this city are still being seeded.</p>
        )}
      </main>
    </>
  )
}
