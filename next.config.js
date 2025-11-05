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
      {
        // Legacy URL redirect - market-spy-home was the old landing page
        // New structure: /market-spy (landing) and /market-spy/analyze (tool)
        source: '/market-spy-home',
        destination: '/market-spy',
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
        // Legacy URL redirect - properties/assess-property/single was the old tool
        // New structure: /feedback-genius/analyze (tool)
        source: '/properties/assess-property/single',
        destination: '/feedback-genius/analyze',
        permanent: true, // 301 redirect
      },
    ]
  },
}

module.exports = nextConfig
