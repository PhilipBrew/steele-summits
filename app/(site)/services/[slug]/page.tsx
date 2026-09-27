import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Breadcrumbs,
  CardMedia,
  Reveal,
  ShareButtons,
  Stack,
  Text,
} from '@/components/ui';
import {
  SecondaryRow,
  Section,
  StaggeredGrid,
  TwoColumnGrid,
} from '@/components/layout';
import { BlogPostCard, TestimonialCard } from '@/components/cards';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import { ContactForm } from '@/app/(site)/contact/ContactForm';
import {
  getServiceSlugs,
  getServiceBySlug,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { buildBreadcrumbSchema } from '@/lib/sanity/structuredData';
import { formatPrice } from '@/lib/sanity/price';
import { StructuredData } from '@/components/StructuredData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
  const [service, siteSettings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!service) {
    notFound();
  }

  const relatedBlogPosts = service.relatedBlogPosts ?? [];
  const relatedTestimonials = service.relatedTestimonials ?? [];
  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: service.name },
  ];

  return (
    <>
      <StructuredData data={buildBreadcrumbSchema(breadcrumbItems)} />
      <Section $background="default">
        <Stack $gap="6">
          <Breadcrumbs items={breadcrumbItems} />
          <TwoColumnGrid>
            <Stack $gap="4">
              <Text $variant="h1" as="h1">
                {service.name}
              </Text>
              {formatPrice(service) && (
                <Text $variant="h3" as="span" $color="primary">
                  {formatPrice(service)}
                </Text>
              )}
              <Text $variant="bodyLg" $color="muted">
                {service.summary}
              </Text>
              <PortableTextRenderer value={service.body} />
              <Stack $gap="3">
                <Text $variant="h3" as="h2">
                  {service.enquiryHeading || `Enquire about ${service.name}`}
                </Text>
                <ContactForm fixedService={service.name} />
              </Stack>
              <ShareButtons
                url={new URL(`/services/${slug}`, SITE_URL).toString()}
                title={service.name}
              />
            </Stack>
            <CardMedia
              image={service.heroImage}
              fallbackLabel={service.name}
              $ratio="1 / 1"
            />
          </TwoColumnGrid>
        </Stack>
      </Section>

      {relatedBlogPosts.length > 0 && (
        <Section $background="contrast" heading="Related reading">
          <SecondaryRow>
            {relatedBlogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 70}>
                <BlogPostCard post={post} />
              </Reveal>
            ))}
          </SecondaryRow>
        </Section>
      )}

      {relatedTestimonials.length > 0 && (
        <Section
          $background="contrast"
          heading={siteSettings?.testimonialsHeading ?? 'What people say'}
          align="center"
        >
          <StaggeredGrid>
            {relatedTestimonials.map((testimonial, index) => (
              <Reveal key={testimonial._id} delay={index * 70}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </StaggeredGrid>
        </Section>
      )}
    </>
  );
};

export default ServicePage;
