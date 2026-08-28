import type { MetadataRoute } from 'next';

import { getServiceSlugs, getBlogPostSlugs } from '@/lib/sanity/fetchers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const STATIC_ROUTES = ['/', '/about', '/services', '/blog', '/contact'];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const [serviceSlugs, blogPostSlugs] = await Promise.all([
    getServiceSlugs(),
    getBlogPostSlugs(),
  ]);

  const staticEntries = STATIC_ROUTES.map(path => ({
    url: new URL(path, SITE_URL).toString(),
  }));

  const serviceEntries = serviceSlugs.map(slug => ({
    url: new URL(`/services/${slug}`, SITE_URL).toString(),
  }));

  const blogEntries = blogPostSlugs.map(slug => ({
    url: new URL(`/blog/${slug}`, SITE_URL).toString(),
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
};

export default sitemap;
