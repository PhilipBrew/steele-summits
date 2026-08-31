import type { Metadata } from 'next';
import { Stack, Text } from '@/components/ui';
import { Section } from '@/components/layout';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import { getTermsPage, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const [termsPage, siteSettings] = await Promise.all([
    getTermsPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: termsPage?.seo,
    fallbackTitle: termsPage?.title ?? 'Terms & Conditions',
    fallbackDescription:
      'The terms that apply when you book with Steele Summit.',
    path: '/terms-conditions',
    siteSettings,
  });
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const TermsPage = async () => {
  const termsPage = await getTermsPage();

  return (
    <Section $background="default">
      <Stack $gap="6" style={{ maxWidth: 720, marginInline: 'auto' }}>
        <Stack $gap="3">
          <Text $variant="h1" as="h1">
            {termsPage?.title ?? 'Terms & Conditions'}
          </Text>
          {termsPage?.lastUpdated && (
            <Text $variant="caption" $color="muted">
              Last updated {formatDate(termsPage.lastUpdated)}
            </Text>
          )}
        </Stack>
        <PortableTextRenderer value={termsPage?.body} />
      </Stack>
    </Section>
  );
};

export default TermsPage;
