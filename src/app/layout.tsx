import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { CartSidebar } from '@/components/shop/CartSidebar'
import { Toaster } from '@/components/ui/Toaster'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: {
    default: "De' Needs Hyper Bazzar | Premium Supermarket in Jalahalli, Bangalore",
    template: "%s | De' Needs Hyper Bazzar",
  },
  description:
    "Bangalore's best supermarket in Jalahalli. Shop fresh groceries, meat & fish, home decor and more. Fast delivery across Bangalore. De' Needs Hyper Bazzar — your one-stop shop.",
  keywords: [
    'supermarket Bangalore', 'grocery store Jalahalli', 'online grocery Bangalore',
    'fresh vegetables Bangalore', 'meat fish Bangalore', 'hypermarket Jalahalli',
    'De Needs Hyper Bazzar', 'best supermarket Bangalore', 'grocery delivery Bangalore',
  ],
  openGraph: {
    title: "De' Needs Hyper Bazzar — Jalahalli's One-Stop Shop",
    description: 'Premium supermarket in Jalahalli, Bangalore. Fresh groceries, meat, fish, home decor & more.',
    url: 'https://deneeds.in',
    siteName: "De' Needs Hyper Bazzar",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://deneeds.in' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <CartSidebar />
        <Toaster />
      </body>
    </html>
  )
}
