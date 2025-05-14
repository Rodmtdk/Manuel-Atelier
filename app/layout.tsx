import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { SiteFooter } from "@/components/site-footer"
import { AIProvider } from "@/components/ai-provider"
import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading-screen"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "AtelierConnect Ultra | La plateforme d'atelier numérique nouvelle génération",
  description:
    "Transformez votre fabrication industrielle avec l'IA, la simulation d'usinage et la génération automatique de devis et de code CNC.",
  manifest: "/manifest.webmanifest",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#00bcd4" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, GeistMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AIProvider>
            <div className="relative flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                  <MainNav />
                  <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                  </div>
                </div>
              </header>
              <div className="flex-1">
                <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
              </div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
            <Toaster />
          </AIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
