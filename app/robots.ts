import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

const robots = (): MetadataRoute.Robots =>
  isIndexable
    ? {
        rules: {
          userAgent: '*',
          allow: '/',
          disallow: '/studio',
        },
        sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
      }
    : {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
      };

export default robots;
