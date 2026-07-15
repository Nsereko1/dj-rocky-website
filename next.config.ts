/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.spotify.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
    ],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Generate ETags
  generateEtags: true,
  
  // swcMinify is now default - REMOVE THIS LINE
  
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/videos',
        destination: '/video',
        permanent: true,
      },
      {
        source: '/tours',
        destination: '/tour',
        permanent: true,
      },
      {
        source: '/biography',
        destination: '/bio',
        permanent: true,
      },
      {
        source: '/booking',
        destination: '/bio',
        permanent: true,
      },
    ]
  },

  // 🆕 Rewrites for Tickets (/tickets shows /events content)
  async rewrites() {
    return [
      {
        source: '/tickets',
        destination: '/events',
      },
      {
        source: '/tickets/:path*',
        destination: '/events/:path*',
      },
    ];
  },
}

module.exports = nextConfig