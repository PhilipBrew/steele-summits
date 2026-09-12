import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
  // The production deployment is reachable at both the custom domain and
  // Vercel's auto-generated alias, which would otherwise be crawlable as a
  // duplicate of the real site — send it to the canonical domain instead.
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'steele-summit.vercel.app' }],
      destination: 'https://steelesummit.co.uk/:path*',
      permanent: true,
    },
  ],
  // Content-Security-Policy deliberately isn't set here yet — it needs
  // careful tuning against Sanity Studio's own script/style requirements
  // at /studio before it's safe to turn on.
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ],
};

export default nextConfig;
