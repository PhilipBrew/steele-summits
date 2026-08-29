import type { Metadata } from 'next';
import { Hero, Section } from '@/components/layout';
import { getServices, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { ServiceRows } from './ServiceRows';

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
  const standardServices = services.filter(service => !service.specialised);
  const specialisedServices = services.filter(service => service.specialised);

  return (
    <>
      <Hero
        eyebrow="Services"
        heading="Guided walks and yoga sessions"
        intro="Every route and every session is planned around the people taking part — from a first Wainwright to a multi-day expedition, from a single class to a regular practice."
        $scene="summit"
        $size="md"
      />

      {standardServices.length > 0 && (
        <Section $background="elevated">
          <ServiceRows services={standardServices} />
        </Section>
      )}

      {specialisedServices.length > 0 && (
        <Section $background="default" heading="Specialised">
          <ServiceRows services={specialisedServices} />
        </Section>
      )}
    </>
  );
};

export default ServicesPage;
