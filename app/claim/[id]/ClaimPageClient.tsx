'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Mail, CheckCircle, Activity } from 'lucide-react'

interface ClaimProps {
  listing: {
    id: string
    full_name: string
    city: string
    state: string
    listing_tier: string
    claimed_at: string | null
  }
}

export default function ClaimPageClient({ listing }: ClaimProps) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [verified, setVerified] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)

  const alreadyClaimed = !!listing.claimed_at && listing.listing_tier !== 'unclaimed'

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listing.id, email }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // Auto-verify if token param is present
  if (token && !verified && verifyError === null) {
    fetch(`/api/claim/verify?token=${token}&listing_id=${listing.id}`)
      .then((r) => {
        if (r.ok) {
          setVerified(true)
        } else {
          setVerifyError('This verification link has expired or is invalid. Please re-submit your email below.')
        }
      })
      .catch(() => setVerifyError('Verification failed. Please try again.'))
  }

  if (verified) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full card p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <CheckCircle className="h-8 w-8 text-teal" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-stone-700 mb-3">
            Listing claimed!
          </h1>
          <p className="text-stone-400 mb-6">
            You&apos;ve verified ownership of <strong>{listing.full_name}</strong>&apos;s listing.
            You can now update your profile and upgrade to a Verified listing.
          </p>
          <Link
            href={`/listings/${listing.id}?verified=true`}
            className="btn-primary w-full"
          >
            View & Upgrade My Listing
          </Link>
        </div>
      </div>
    )
  }

  if (alreadyClaimed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full card p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
              <ShieldCheck className="h-8 w-8 text-sage-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-stone-700 mb-3">
            This listing is already claimed
          </h1>
          <p className="text-stone-400 mb-6">
            {listing.full_name} in {listing.city}, {listing.state} has already been claimed.
          </p>
          <Link href="/listings" className="btn-secondary w-full">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <Activity className="h-8 w-8 text-teal" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-stone-700 mb-2">
            Claim Your Listing
          </h1>
          <p className="text-stone-400">
            Claiming <strong>{listing.full_name}</strong> in {listing.city}, {listing.state}.
            Enter your professional email to verify ownership.
          </p>
        </div>

        {verifyError && (
          <div className="mb-4 rounded-xl bg-coral-50 border border-coral-200 p-4 text-sm text-coral-600">
            {verifyError}
          </div>
        )}

        {status === 'sent' ? (
          <div className="card p-8 text-center">
            <Mail className="h-8 w-8 text-teal mx-auto mb-4" />
            <h2 className="text-lg font-bold text-stone-700 mb-2">Check your email</h2>
            <p className="text-stone-400 text-sm">
              We sent a verification link to <strong>{email}</strong>. Click the link to complete
              your claim. It expires in 72 hours.
            </p>
          </div>
        ) : (
          <div className="card p-8">
            <form onSubmit={handleSendToken} className="space-y-4">
              <div>
                <label className="label">Your professional email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="you@yourpractice.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
              >
                {status === 'loading' ? 'Sending...' : 'Send Verification Email'}
              </button>
              {status === 'error' && (
                <p className="text-xs text-coral-500 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-cream-300">
              <p className="text-xs text-stone-400 text-center">
                By claiming this listing, you confirm that you are the practitioner or authorized
                representative. Free to claim — no credit card required.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
