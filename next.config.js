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
            value: `frame-src 'self' https://js.stripe.com https://checkout.stripe.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; connect-src 'self' https://api.stripe.com https://ynxbtvsbjzkcnkilnuts.supabase.co https://*.supabase.co wss://ynxbtvsbjzkcnkilnuts.supabase.co ${backendUrl};`,
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
