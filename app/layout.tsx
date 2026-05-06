import type { Metadata, Viewport } from 'next'
import { Inter, Syne, Space_Grotesk, Playfair_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const syne = Syne({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700', '800'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-accent' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700', '800'] })

export const viewport: Viewport = {
  themeColor: '#0a0339',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Anmol - Freelance Web Developer',
  description: 'Build amazing web experiences with modern design and performance',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        <meta name="theme-color" content="#0a0339" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
