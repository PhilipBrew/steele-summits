import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Button, ImagePlaceholder, Stack, Text } from '@/components/ui';
import { Section, TwoColumnGrid } from '@/components/layout';
import { services, getServiceBySlug } from '@/lib/mock-data/services';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  services.map(service => ({ slug: service.slug }));

export const generateMetadata = async ({
  params,
}: ServicePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  return {
    title: service
      ? `${service.name} — Steele Summits`
      : 'Service — Steele Summits',
    description: service?.summary,
  };
};

const ServicePage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

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
          <Text $variant="body" $color="muted">
            {service.description}
          </Text>
          <Link href="/contact">
            <Button $variant="primary">Enquire about this</Button>
          </Link>
        </Stack>
        <ImagePlaceholder $ratio="1 / 1" $label={service.name} />
      </TwoColumnGrid>
    </Section>
  );
};

export default ServicePage;
