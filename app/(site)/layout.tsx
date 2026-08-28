import { AppProviders } from '@/components/providers/AppProviders';
import { Header, Footer } from '@/components/layout';
import { getSiteSettings } from '@/lib/sanity/fetchers';

const FALLBACK_NAV_LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

const SiteLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const siteSettings = await getSiteSettings();

  return (
    <AppProviders>
      <Header
        siteName={siteSettings?.siteName ?? 'Steele Summits'}
        navLinks={siteSettings?.navLinks ?? FALLBACK_NAV_LINKS}
        instagramUrl={siteSettings?.instagramUrl}
      />
      <main>{children}</main>
      <Footer
        siteName={siteSettings?.siteName ?? 'Steele Summits'}
        footerTagline={siteSettings?.footerTagline}
        navLinks={siteSettings?.navLinks ?? FALLBACK_NAV_LINKS}
        contactEmail={siteSettings?.contactEmail ?? 'hello@steelesummits.co.uk'}
        instagramUrl={siteSettings?.instagramUrl}
      />
    </AppProviders>
  );
};

export default SiteLayout;
