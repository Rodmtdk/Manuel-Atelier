import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    {
      name: "AtelierConnect Ultra",
      short_name: "AtelierConnect",
      description: "La plateforme d'atelier numérique nouvelle génération",
      start_url: "/",
      display: "standalone",
      background_color: "#111827",
      theme_color: "#00bcd4",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/manifest+json",
      },
    },
  )
}
