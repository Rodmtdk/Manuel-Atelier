import type { Metadata, Viewport } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { HeaderNav } from "@/components/header-nav"
import { Footer } from "@/components/footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Manuel d'Atelier - Usinage & Rectification",
  description:
    "Encyclopédie complète d'usinage et rectification. Fraisage, tournage, rectification, calculateur de vitesses de coupe et guides professionnels.",
}

export const viewport: Viewport = {
  themeColor: "#00D972",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        <HeaderNav />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
