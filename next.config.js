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
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3002/api';
    const backendUrl = apiEndpoint.replace('/api', ''); // Remove /api suffix to get base URL
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://vercel.live; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://vercel.live; connect-src 'self' https://api.stripe.com https://api.geoapify.com https://ynxbtvsbjzkcnkilnuts.supabase.co https://*.supabase.co wss://ynxbtvsbjzkcnkilnuts.supabase.co ${backendUrl} http://localhost:8000 https://syncnanny-ai-dev-production.up.railway.app;`,
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
