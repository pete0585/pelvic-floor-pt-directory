'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Eye } from 'lucide-react'
import type { Listing } from '@/types'
import Link from 'next/link'

interface AdminTableProps {
  listings: Listing[]
}

export default function AdminTable({ listings }: AdminTableProps) {
  const [processing, setProcessing] = useState<string | null>(null)

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id)
    try {
      await fetch('/api/admin/listing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      })
      window.location.reload()
    } finally {
      setProcessing(null)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-cream-300 text-left">
            <th className="pb-3 pr-4 font-semibold text-stone-600">Name</th>
            <th className="pb-3 pr-4 font-semibold text-stone-600">Location</th>
            <th className="pb-3 pr-4 font-semibold text-stone-600">Tier</th>
            <th className="pb-3 pr-4 font-semibold text-stone-600">Status</th>
            <th className="pb-3 pr-4 font-semibold text-stone-600">Added</th>
            <th className="pb-3 font-semibold text-stone-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {listings.map((listing) => (
            <tr key={listing.id} className="hover:bg-cream-100 transition-colors">
              <td className="py-3 pr-4">
                <div className="font-medium text-stone-700">{listing.full_name}</div>
                {listing.practice_name && (
                  <div className="text-xs text-stone-400">{listing.practice_name}</div>
                )}
              </td>
              <td className="py-3 pr-4 text-stone-500">
                {listing.city}, {listing.state}
              </td>
              <td className="py-3 pr-4">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  listing.listing_tier === 'featured'
                    ? 'bg-coral-50 text-coral-500'
                    : listing.listing_tier === 'verified'
                    ? 'bg-teal-50 text-teal-500'
                    : listing.listing_tier === 'free'
                    ? 'bg-sage-100 text-sage-500'
                    : 'bg-cream-200 text-stone-400'
                }`}>
                  {listing.listing_tier}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                  listing.is_approved
                    ? 'bg-sage-100 text-sage-600'
                    : 'bg-cream-200 text-stone-400'
                }`}>
                  {listing.is_approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="py-3 pr-4 text-stone-400">
                {new Date(listing.created_at).toLocaleDateString()}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/listings/${listing.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-teal hover:bg-teal-50 transition-colors"
                    title="View listing"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  {!listing.is_approved && (
                    <button
                      onClick={() => handleAction(listing.id, 'approve')}
                      disabled={processing === listing.id}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-sage-500 hover:bg-sage-100 transition-colors disabled:opacity-50"
                      title="Approve"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(listing.id, 'reject')}
                    disabled={processing === listing.id}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-coral-500 hover:bg-coral-50 transition-colors disabled:opacity-50"
                    title="Reject / Deactivate"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {listings.length === 0 && (
        <div className="py-12 text-center text-stone-400 text-sm">No listings found.</div>
      )}
    </div>
  )
}
