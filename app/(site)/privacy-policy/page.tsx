import type { Metadata } from 'next';
import { Stack, Text } from '@/components/ui';
import { Section } from '@/components/layout';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import { getPrivacyPolicyPage, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const [privacyPolicyPage, siteSettings] = await Promise.all([
    getPrivacyPolicyPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: privacyPolicyPage?.seo,
    fallbackTitle: privacyPolicyPage?.title ?? 'Privacy Policy',
    fallbackDescription: 'How Steele Summit collects and uses your data.',
    path: '/privacy-policy',
    siteSettings,
  });
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const PrivacyPolicyPage = async () => {
  const privacyPolicyPage = await getPrivacyPolicyPage();

  return (
    <Section $background="default">
      <Stack $gap="6" style={{ maxWidth: 720, marginInline: 'auto' }}>
        <Stack $gap="3">
          <Text $variant="h1" as="h1">
            {privacyPolicyPage?.title ?? 'Privacy Policy'}
          </Text>
          {privacyPolicyPage?.lastUpdated && (
            <Text $variant="caption" $color="muted">
              Last updated {formatDate(privacyPolicyPage.lastUpdated)}
            </Text>
          )}
        </Stack>
        <PortableTextRenderer value={privacyPolicyPage?.body} />
      </Stack>
    </Section>
  );
};

export default PrivacyPolicyPage;
