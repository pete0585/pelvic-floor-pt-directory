'use client'

import { useState, useEffect } from 'react'
import { X, Mail } from 'lucide-react'

export default function NewsletterFooterBar() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const dismissed = localStorage.getItem('pfpt_newsletter_dismissed')
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('pfpt_newsletter_dismissed', '1')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, directory: 'pelvic-floor-pt' }),
      })
      if (res.ok) {
        setStatus('success')
        setTimeout(dismiss, 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-teal text-white shadow-teal animate-in slide-in-from-bottom-4 duration-500">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Mail className="h-5 w-5 shrink-0 text-teal-200" />
          <p className="text-sm font-medium truncate">
            Get pelvic health tips + new therapists in your city — free newsletter.
          </p>
        </div>
        {status === 'success' ? (
          <p className="text-sm font-semibold text-teal-200 shrink-0">You&apos;re in!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="rounded-full bg-white/20 border border-white/30 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 w-44 sm:w-56"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal hover:bg-teal-50 transition-colors disabled:opacity-70"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
        )}
        <button
          onClick={dismiss}
          className="p-1.5 rounded-full hover:bg-teal-400 transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
