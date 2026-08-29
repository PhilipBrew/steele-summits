import type { Metadata } from 'next';
import { Hero, Section } from '@/components/layout';
import {
  getServices,
  getServicesPage,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { ServiceRows } from './ServiceRows';

export const generateMetadata = async (): Promise<Metadata> => {
  const [servicesPage, siteSettings] = await Promise.all([
    getServicesPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: servicesPage?.seo,
    fallbackTitle: 'Services',
    fallbackDescription: 'Guided mountain walks and outdoor yoga sessions.',
    path: '/services',
    siteSettings,
  });
};

const ServicesPage = async () => {
  const [services, servicesPage] = await Promise.all([
    getServices(),
    getServicesPage(),
  ]);
  const standardServices = services.filter(service => !service.specialised);
  const specialisedServices = services.filter(service => service.specialised);

  return (
    <>
      <Hero
        eyebrow={servicesPage?.heroEyebrow ?? 'Services'}
        heading={servicesPage?.heroHeading ?? 'Guided walks and yoga sessions'}
        intro={
          servicesPage?.heroIntro ??
          'Every route and every session is planned around the people taking part — from a first Wainwright to a multi-day expedition, from a single class to a regular practice.'
        }
        heroImage={servicesPage?.heroImage}
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
