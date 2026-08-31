import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { getSiteSettings } from '@/lib/sanity/fetchers';

const FALLBACK_NAV_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

// Shared Header/Footer chrome, used both by the (site) route group's own
// layout and by the root not-found page — a genuinely unmatched URL falls
// outside the (site) group entirely, so it can't rely on that layout for
// navigation, but should still look like the rest of the site.
export const SiteChrome = async ({ children }: { children: ReactNode }) => {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <Header
        siteName={siteSettings?.siteName ?? 'Steele Summit'}
        navLinks={siteSettings?.navLinks ?? FALLBACK_NAV_LINKS}
        instagramUrl={siteSettings?.instagramUrl}
      />
      <main>{children}</main>
      <Footer
        siteName={siteSettings?.siteName ?? 'Steele Summit'}
        footerTagline={siteSettings?.footerTagline}
        navLinks={siteSettings?.navLinks ?? FALLBACK_NAV_LINKS}
        contactEmail={siteSettings?.contactEmail ?? 'hello@steelesummit.co.uk'}
        qualifications={siteSettings?.qualifications}
        instagramUrl={siteSettings?.instagramUrl}
      />
    </>
  );
};
