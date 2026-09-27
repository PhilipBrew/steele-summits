import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  AsymmetricGrid,
  CTASection,
  Hero,
  Section,
  SecondaryRow,
  StaggeredGrid,
} from '@/components/layout';
import { Reveal, Stack } from '@/components/ui';
import {
  FeaturedPostCard,
  ServiceCard,
  TestimonialCard,
} from '@/components/cards';
import {
  getHomePage,
  getServices,
  getBlogPosts,
  getTestimonials,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { buildLocalBusinessSchema } from '@/lib/sanity/structuredData';
import { StructuredData } from '@/components/StructuredData';

export const generateMetadata = async (): Promise<Metadata> => {
  const [homePage, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: homePage?.seo,
    fallbackTitle: 'Steele Summit',
    fallbackDescription: siteSettings?.footerTagline,
    fallbackImage: homePage?.heroImage,
    path: '/',
    siteSettings,
  });
};

const HomePage = async () => {
  const [homePage, services, blogPosts, testimonials, siteSettings] =
    await Promise.all([
      getHomePage(),
      getServices(),
      getBlogPosts(),
      getTestimonials(),
      getSiteSettings(),
    ]);

  const standardServices = services.filter(service => !service.specialised);
  const specialisedServices = services.filter(service => service.specialised);
  const featuredBlogPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  // The blog section leads with one post and follows with the rest, rather
  // than three equal cards. Falls back to most-recent when nothing is
  // flagged as featured in the CMS.
  // Two posts, each given the full side-by-side treatment. More than that
  // and the section outweighs the services above it.
  const homepagePosts = (
    featuredBlogPosts.length ? featuredBlogPosts : blogPosts
  ).slice(0, 2);

  return (
    <>
      <StructuredData data={buildLocalBusinessSchema(siteSettings)} />
      <Hero
        eyebrow={homePage?.heroEyebrow}
        heading={
          homePage?.heroHeading ?? 'Find your pace, on the hill and on the mat.'
        }
        intro={homePage?.heroIntro}
        heroImage={homePage?.heroImage}
        $scene="fells"
        $size="lg"
        actions={
          <>
            <Link href="/services">
              <Button $variant="primary" $size="lg">
                Explore services
              </Button>
            </Link>
            <Link href="/blog">
              <Button $variant="secondary" $size="lg">
                Read the blog
              </Button>
            </Link>
          </>
        }
      />

      {standardServices.length > 0 && (
        <Section
          $background="elevated"
          heading={homePage?.offerHeading ?? 'Guided walks and yoga sessions'}
          intro={homePage?.offerIntro}
        >
          <AsymmetricGrid>
            {standardServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 70}>
                <ServiceCard service={service} showPrice={false} />
              </Reveal>
            ))}
          </AsymmetricGrid>
        </Section>
      )}

      {specialisedServices.length > 0 && (
        <Section $background="default" heading="Specialised services">
          <SecondaryRow>
            {specialisedServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 70}>
                <ServiceCard service={service} showPrice={false} />
              </Reveal>
            ))}
          </SecondaryRow>
        </Section>
      )}

      <Section
        $background="elevated"
        heading={homePage?.blogHeading ?? 'Notes from the trail and the mat'}
      >
        <Stack $gap="7">
          {homepagePosts.map((post, index) => (
            <Reveal key={post.slug}>
              {/* Same treatment for every post, mirrored on alternate rows
                  so the section has rhythm without a second card design. */}
              <FeaturedPostCard post={post} $flip={index % 2 === 1} />
            </Reveal>
          ))}
        </Stack>
        <Link href="/blog">
          <Button $variant="outline">Read the blog</Button>
        </Link>
      </Section>

      <Section
        $background="contrast"
        heading={homePage?.testimonialsHeading ?? 'What people say'}
        align="center"
      >
        <StaggeredGrid>
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial._id} delay={index * 70}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </StaggeredGrid>
      </Section>

      <CTASection
        heading={
          homePage?.ctaHeading ??
          siteSettings?.ctaHeading ??
          'Ready to get outdoors?'
        }
        body={
          homePage?.ctaBody ??
          siteSettings?.ctaBody ??
          'Book a guided walk or a yoga session and start moving at your own pace.'
        }
        actions={
          <Link href="/contact">
            <Button $variant="secondary" $size="lg">
              Get in touch
            </Button>
          </Link>
        }
      />
    </>
  );
};

export default HomePage;
