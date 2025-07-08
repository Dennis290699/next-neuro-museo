import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://next-neuro-museo.vercel.app'),
  title: {
    default: 'Neuro-Museo: Restaurador de Arte con IA',
    template: '%s | Neuro-Museo',
  },
  description:
    'Modelo de inteligencia artificial para la detección de objetos y reconstrucción en 2D de arte histórico',
  keywords: ['IA', 'Arte', 'Restauración', 'Inteligencia Artificial', 'Detección de Objetos'],
  generator: 'Neuro-Museo',
  applicationName: 'NeuroMuseo',
  authors: [{ name: 'Neuro-Museo', url: 'https://github.com/dennis290699' }],
  creator: 'Neuro-Museo',
  icons: {
    icon: '/brain.png',
    shortcut: '/brain.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Neuro-Museo: Restaurador de Arte con IA',
    description:
      'Modelo de inteligencia artificial para la detección de objetos y reconstrucción en 2D de arte histórico',
    url: 'https://next-neuro-museo.vercel.app/',
    siteName: 'NeuroMuseo',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/97d0a45e-9657-451f-b418-a8b588098f69.png?token=_KQvciYu0Qc6Iw1OOFUVf-HrLAVMpDAaO-IdLIhA8zI&height=800&width=1200&expires=33287957130',
        width: 1200,
        height: 800,
        alt: 'NeuroMuseo Cover',
      },
    ],
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuro-Museo: Restaurador de Arte con IA',
    description:
      'Modelo de inteligencia artificial para la detección de objetos y reconstrucción en 2D de arte histórico',
    images: [
      'https://opengraph.b-cdn.net/production/images/97d0a45e-9657-451f-b418-a8b588098f69.png?token=_KQvciYu0Qc6Iw1OOFUVf-HrLAVMpDAaO-IdLIhA8zI&height=800&width=1200&expires=33287957130',
    ],
  },
  category: 'technology',
  themeColor: '#0a1128',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
