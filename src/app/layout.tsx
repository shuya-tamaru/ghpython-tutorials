import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GhPython Tutorials | STUDIO TAMA',
  description: 'Learn Grasshopper Python with daily modeling challenges',
  keywords: 'Grasshopper, Python, 3D modeling, parametric design, tutorial',
  authors: [{ name: 'STUDIO TAMA' }],
  openGraph: {
    title: 'GhPython Tutorials | STUDIO TAMA',
    description: 'Learn Grasshopper Python with daily modeling challenges',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}