import type { Metadata } from 'next';
import { Stack, Text } from '@/components/ui';
import { Hero, Section, TwoColumnGrid } from '@/components/layout';
import {
  getContactPage,
  getServices,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { ContactForm } from './ContactForm';

export const generateMetadata = async (): Promise<Metadata> => {
  const [contactPage, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: contactPage?.seo,
    fallbackTitle: 'Contact',
    fallbackDescription:
      'Enquire about a guided walk, a yoga session, or a trip.',
    path: '/contact',
    siteSettings,
  });
};

const ContactPage = async () => {
  const [contactPage, services] = await Promise.all([
    getContactPage(),
    getServices(),
  ]);

  return (
    <>
      <Hero
        eyebrow={contactPage?.heroEyebrow}
        heading={
          contactPage?.heroHeading ?? "Let's plan your next day outdoors."
        }
        intro={contactPage?.heroIntro}
        heroImage={contactPage?.heroImage}
        $scene="fells"
        $size="md"
      />

      <Section $background="default">
        <TwoColumnGrid>
          <ContactForm services={services} />
          <Stack $gap="4">
            <Stack $gap="1">
              <Text $variant="h4" as="h2">
                {contactPage?.locationHeading ?? 'Based near'}
              </Text>
              <Text
                $variant="bodySm"
                $color="muted"
                style={{ whiteSpace: 'pre-line' }}
              >
                {contactPage?.locationBody ??
                  'Keswick, Lake District\nwith trips into Northumberland'}
              </Text>
            </Stack>
            <Stack $gap="1">
              <Text $variant="h4" as="h2">
                {contactPage?.availabilityHeading ?? 'Availability'}
              </Text>
              <Text
                $variant="bodySm"
                $color="muted"
                style={{ whiteSpace: 'pre-line' }}
              >
                {contactPage?.availabilityBody ??
                  'Walks and sessions run year-round\nsubject to conditions.'}
              </Text>
            </Stack>
            <Stack $gap="1">
              <Text $variant="h4" as="h2">
                {contactPage?.emailHeading ?? 'Email'}
              </Text>
              <Text $variant="bodySm" $color="muted">
                {contactPage?.contactEmail ?? 'hello@steelesummit.co.uk'}
              </Text>
            </Stack>
          </Stack>
        </TwoColumnGrid>
      </Section>
    </>
  );
};

export default ContactPage;
