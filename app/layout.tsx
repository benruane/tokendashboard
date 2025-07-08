import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SEDA Tokenomics Dashboard',
  description: 'Interactive dashboard for SEDA tokenomics analysis with real-time data visualization',
  keywords: 'SEDA, tokenomics, dashboard, blockchain, analytics',
  authors: [{ name: 'SEDA Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 