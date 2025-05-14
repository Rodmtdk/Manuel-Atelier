/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Ajout des configurations demandées
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure all routes are properly handled for static export
  experimental: {
    // This helps with static export
    appDocumentPreloading: false,
  },
  // Ajout des redirections pour les URLs propres
  async redirects() {
    return [
      {
        source: '/introfraisage',
        destination: '/fraisage/introduction',
        permanent: true,
      },
      {
        source: '/introtournage',
        destination: '/tournage/introduction',
        permanent: true,
      },
      {
        source: '/fraisageconv',
        destination: '/fraisage/conventionnel',
        permanent: true,
      },
      {
        source: '/fraisagecnc',
        destination: '/fraisage/cnc',
        permanent: true,
      },
      {
        source: '/tournageconv',
        destination: '/tournage/conventionnel',
        permanent: true,
      },
      {
        source: '/tournagecnc',
        destination: '/tournage/cnc',
        permanent: true,
      },
      {
        source: '/secuatelier',
        destination: '/securite',
        permanent: true,
      },
      {
        source: '/calc',
        destination: '/calculateur',
        permanent: true,
      },
      {
        source: '/commande',
        destination: '/devis',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
