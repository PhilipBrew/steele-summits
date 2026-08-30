import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, CardMedia, ShareButtons, Stack, Text } from '@/components/ui';
import { CardGrid, Section, TwoColumnGrid } from '@/components/layout';
import { BlogPostCard, TestimonialCard } from '@/components/cards';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import {
  getServiceSlugs,
  getServiceBySlug,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { formatPrice } from '@/lib/sanity/price';

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

  return (
    <>
      <Section $background="default">
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
            <Link href="/contact">
              <Button $variant="primary">Enquire about this</Button>
            </Link>
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
      </Section>

      {relatedTestimonials.length > 0 && (
        <Section
          $background="accent"
          eyebrow={siteSettings?.testimonialsEyebrow ?? 'Words from walkers'}
          heading={siteSettings?.testimonialsHeading ?? 'What people say'}
          align="center"
        >
          <CardGrid>
            {relatedTestimonials.map(testimonial => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </CardGrid>
        </Section>
      )}

      {relatedBlogPosts.length > 0 && (
        <Section
          $background="elevated"
          eyebrow="From the blog"
          heading="Related reading"
        >
          <CardGrid>
            {relatedBlogPosts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </CardGrid>
        </Section>
      )}
    </>
  );
};

export default ServicePage;
