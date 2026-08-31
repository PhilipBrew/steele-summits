import type { SiteSettings } from '@/lib/sanity/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Schema.org LocalBusiness — deliberately omits address/telephone, since this
// is a mobile outdoor-activity business with no fixed public premises rather
// than a shop; areaServed covers where the business actually operates.
export const buildLocalBusinessSchema = (
  siteSettings?: SiteSettings | null,
) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteSettings?.siteName ?? 'Steele Summit',
  description:
    siteSettings?.footerTagline ??
    'Guided mountain walking and outdoor yoga across the Lake District and Northumberland.',
  url: SITE_URL,
  image: new URL('/logo/steele-summit-dp-05.svg', SITE_URL).toString(),
  email: siteSettings?.contactEmail ?? 'hello@steelesummit.co.uk',
  areaServed: ['Lake District', 'Northumberland'],
  ...(siteSettings?.instagramUrl
    ? { sameAs: [siteSettings.instagramUrl] }
    : {}),
});

export interface BreadcrumbSchemaItem {
  label: string;
  href?: string;
}

export const buildBreadcrumbSchema = (items: BreadcrumbSchemaItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
  })),
});
