import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Button, CardMedia, Stack, Text } from '@/components/ui';
import { Section, TwoColumnGrid } from '@/components/layout';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import {
  getServiceSlugs,
  getServiceBySlug,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const slugs = await getServiceSlugs();
  return slugs.map(slug => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: ServicePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const [service, siteSettings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: service?.seo,
    fallbackTitle: service?.name ?? 'Service',
    fallbackDescription: service?.summary,
    path: `/services/${slug}`,
    siteSettings,
  });
};

const ServicePage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <Section $background="default">
      <TwoColumnGrid>
        <Stack $gap="4">
          <Badge $variant="accent">{service.category}</Badge>
          <Text $variant="h1" as="h1">
            {service.name}
          </Text>
          <Text $variant="bodyLg" $color="muted">
            {service.summary}
          </Text>
          <PortableTextRenderer value={service.body} />
          <Link href="/contact">
            <Button $variant="primary">Enquire about this</Button>
          </Link>
        </Stack>
        <CardMedia
          image={service.heroImage}
          fallbackLabel={service.name}
          $ratio="1 / 1"
        />
      </TwoColumnGrid>
    </Section>
  );
};

export default ServicePage;
