import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { getAllTags, getAllTutorials } from '@/lib/tutorials'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GhPython Tutorials | STUDIO TAMA',
  description: 'Learn Grasshopper Python with daily modeling challenges',
  keywords: 'Grasshopper, Python, 3D modeling, parametric design, tutorial',
  authors: [{ name: 'STUDIO TAMA' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL('https://ghpython-tutorials.vercel.app'),
  openGraph: {
    title: 'GhPython Tutorials | STUDIO TAMA',
    description: 'Learn Grasshopper Python with daily modeling challenges',
    type: 'website',
    url: 'https://ghpython-tutorials.vercel.app',
    siteName: 'GhPython Tutorials',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'GhPython Tutorials - Learn Grasshopper Python with daily modeling challenges',
      },
    ],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tama20013',
    creator: '@tama20013',
    title: 'GhPython Tutorials | STUDIO TAMA',
    description: 'Learn Grasshopper Python with daily modeling challenges',
    images: ['/image.png'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [availableTags, tutorials] = await Promise.all([
    getAllTags(),
    getAllTutorials()
  ])
  
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalytics />
        <MainLayout availableTags={availableTags} totalTutorialsCount={tutorials.length}>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}