/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a0.muscache.com',
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  async redirects() {
    return [
      // Force www subdomain for SEO canonicalization
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'strsage.com',
          },
        ],
        destination: 'https://www.strsage.com/:path*',
        permanent: true,
      },
      {
        // Legacy URL redirect - market-spy-home was the old landing page
        // New structure: /market-spy (landing) and /market-spy/analyze (tool)
        source: '/market-spy-home',
        destination: '/market-spy',
        permanent: true, // 301 redirect
      },
      {
        // Legacy URL redirect specifically for non-www domain
        // Handles Google Search Console tests of strsage.com/market-spy-home
        source: '/market-spy-home',
        has: [
          {
            type: 'host',
            value: 'strsage.com',
          },
        ],
        destination: 'https://www.strsage.com/market-spy',
        permanent: true, // 301 redirect
      },
      {
        // Legacy URL redirect - str-feedback-genius was the old landing page
        // New structure: /feedback-genius (landing) and /feedback-genius/analyze (tool)
        source: '/str-feedback-genius',
        destination: '/feedback-genius',
        permanent: true, // 301 redirect
      },
      {
        // Legacy URL redirect specifically for non-www domain
        // Handles Google Search Console tests of strsage.com/str-feedback-genius
        source: '/str-feedback-genius',
        has: [
          {
            type: 'host',
            value: 'strsage.com',
          },
        ],
        destination: 'https://www.strsage.com/feedback-genius',
        permanent: true, // 301 redirect
      },
      {
        // Legacy URL redirect - properties/assess-property/single was the old tool
        // New structure: /feedback-genius/analyze (tool)
        source: '/properties/assess-property/single',
        destination: '/feedback-genius/analyze',
        permanent: true, // 301 redirect
      },
      {
        // Legacy URL redirect specifically for non-www domain
        // Handles Google Search Console tests of strsage.com/properties/assess-property/single
        source: '/properties/assess-property/single',
        has: [
          {
            type: 'host',
            value: 'strsage.com',
          },
        ],
        destination: 'https://www.strsage.com/feedback-genius/analyze',
        permanent: true, // 301 redirect
      },
    ]
  },
}

module.exports = nextConfig
