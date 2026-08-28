import type { Metadata } from 'next';
import { CardGrid, Hero, Section } from '@/components/layout';
import { ServiceCard } from '@/components/cards';
import { getServices, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const siteSettings = await getSiteSettings();
  return buildMetadata({
    fallbackTitle: 'Services',
    fallbackDescription: 'Guided mountain walks and outdoor yoga sessions.',
    path: '/services',
    siteSettings,
  });
};

const ServicesPage = async () => {
  const services = await getServices();

  return (
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
};

export default ServicesPage;
