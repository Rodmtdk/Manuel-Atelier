import type { MetadataRoute } from "next"

// Add this line to fix the static export error
export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AtelierConnect",
    short_name: "AtelierConnect",
    description: "L'atelier numérique nouvelle génération – Tout l'usinage, une seule plateforme.",
    start_url: "/",
    display: "standalone",
    background_color: "#1f2937",
    theme_color: "#3b82f6",
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
  }
}
