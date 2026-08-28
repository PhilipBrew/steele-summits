import type { Metadata } from 'next';
import { Stack, Text } from '@/components/ui';
import { Hero, Section, TwoColumnGrid } from '@/components/layout';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Steele Summits',
  description: 'Enquire about a guided walk, a yoga session, or a trip.',
};

const ContactPage = () => (
  <>
    <Hero
      eyebrow="Contact"
      heading="Let's plan your next day outdoors."
      intro="Ask about a guided walk, a yoga session, or a multi-day trip — or just get in touch to see what fits."
      $scene="fells"
      $size="md"
    />

    <Section $background="elevated">
      <TwoColumnGrid>
        <ContactForm />
        <Stack $gap="4">
          <Stack $gap="1">
            <Text $variant="h4" as="h2">
              Based near
            </Text>
            <Text $variant="bodySm" $color="muted">
              Keswick, Lake District
              <br />
              with trips into Northumberland
            </Text>
          </Stack>
          <Stack $gap="1">
            <Text $variant="h4" as="h2">
              Availability
            </Text>
            <Text $variant="bodySm" $color="muted">
              Walks and sessions run year-round
              <br />
              subject to conditions.
            </Text>
          </Stack>
          <Stack $gap="1">
            <Text $variant="h4" as="h2">
              Email
            </Text>
            <Text $variant="bodySm" $color="muted">
              hello@steelesummits.co.uk
            </Text>
          </Stack>
        </Stack>
      </TwoColumnGrid>
    </Section>
  </>
);

export default ContactPage;
