import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const description =
  'Software developer and network engineer. Helped run and secure a 100-site enterprise network on Fortinet, Aruba and Cisco; builds Python APIs, computer vision pipelines and Flutter apps. Open to roles in the UAE, Saudi Arabia and Qatar.'

export const metadata: Metadata = {
  metadataBase: new URL('https://mohammadyassin.vercel.app'),
  title: 'Mohammad Yassin | Software Developer & Network Engineer',
  description,
  openGraph: {
    title: 'Mohammad Yassin | Software Developer & Network Engineer',
    description,
    url: '/',
    type: 'profile',
    images: [{ url: '/3d/rack-fallback.webp', width: 1280, height: 800, alt: 'A 3D network rack with FortiGate, FortiSwitch, Cisco Catalyst and HPE servers' }],
  },
  twitter: { card: 'summary_large_image', images: ['/3d/rack-fallback.webp'] },
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
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
