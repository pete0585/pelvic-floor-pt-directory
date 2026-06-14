import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'

export const metadata: Metadata = {
  title: {
    default: 'Find a Pelvic Floor Physical Therapist Near You | PelvicFloorPTDirectory.com',
    template: '%s | PelvicFloorPTDirectory.com',
  },
  description:
    'Find a pelvic floor physical therapist near you. Search by condition, location, and insurance. Specialists in postpartum recovery, incontinence, prolapse, pelvic pain, and more.',
  keywords: [
    'pelvic floor physical therapist',
    'pelvic floor PT',
    'pelvic floor therapy',
    'pelvic floor PT near me',
    'postpartum physical therapist',
    'pelvic pain therapist',
    'incontinence physical therapy',
  ],
  authors: [{ name: 'PelvicFloorPTDirectory.com' }],
  creator: 'PelvicFloorPTDirectory.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pelvicfloordirectory.com',
    siteName: 'PelvicFloorPTDirectory.com',
    title: 'Find a Pelvic Floor Physical Therapist Near You',
    description:
      'Search by condition, location, and insurance. Find a pelvic floor PT who specializes in exactly what you\'re dealing with.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pelvicfloordirectory.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'PelvicFloorPTDirectory.com — Find a Pelvic Floor PT Near You',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Pelvic Floor Physical Therapist Near You',
    description: 'Search by condition, location, and insurance.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pelvicfloordirectory.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <NewsletterFooterBar />
      </body>
    </html>
  )
}
