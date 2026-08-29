import type { Metadata } from 'next';

import { urlFor } from '@/lib/sanity/image';
import type { SanitySeo, SiteSettings } from '@/lib/sanity/types';

export interface BuildMetadataArgs {
  seo?: SanitySeo | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path: string;
  siteSettings?: SiteSettings | null;
  /** Appended after the page title — pass '' for the homepage, which is already just the site name. */
  suffix?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

export const buildMetadata = ({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
  siteSettings,
  suffix = ' — Steele Summits',
}: BuildMetadataArgs): Metadata => {
  const title = `${seo?.metaTitle || fallbackTitle}${suffix}`;
  const description =
    seo?.metaDescription ||
    fallbackDescription ||
    siteSettings?.defaultSeo?.metaDescription;
  const ogImageSource = seo?.ogImage?.asset
    ? seo.ogImage
    : siteSettings?.defaultSeo?.ogImage;
  const ogImageUrl = ogImageSource?.asset
    ? urlFor(ogImageSource).width(1200).height(630).url()
    : undefined;
  const canonical = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical },
    // A global pre-launch block (env-gated) always wins over a page's own SEO
    // settings — no individual page can accidentally re-enable indexing while
    // the whole site is meant to be hidden.
    robots: !isIndexable
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : seo?.noIndex
        ? { index: false, follow: false }
        : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: ogImageSource?.alt ?? '',
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
};
