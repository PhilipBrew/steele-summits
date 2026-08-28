import type { Metadata } from 'next';
import { CardGrid, Hero, Section } from '@/components/layout';
import { ServiceCard } from '@/components/cards';
import { services } from '@/lib/mock-data/services';

export const metadata: Metadata = {
  title: 'Services — Steele Summits',
  description: 'Guided mountain walks and outdoor yoga sessions.',
};

const ServicesPage = () => (
  <>
    <Hero
      eyebrow="Services"
      heading="Guided walks and yoga sessions"
      intro="Every route and every session is planned around the people taking part — from a first Wainwright to a multi-day expedition, from a single class to a regular practice."
      $scene="summit"
      $size="md"
    />

    <Section $background="elevated">
      <CardGrid>
        {services.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </CardGrid>
    </Section>
  </>
);

export default ServicesPage;
