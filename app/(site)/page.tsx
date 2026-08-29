import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { CardGrid, CTASection, Hero, Section } from '@/components/layout';
import { BlogPostCard, ServiceCard, TestimonialCard } from '@/components/cards';
import {
  getHomePage,
  getServices,
  getBlogPosts,
  getTestimonials,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const [homePage, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: homePage?.seo,
    fallbackTitle: 'Steele Summits',
    fallbackDescription: siteSettings?.footerTagline,
    path: '/',
    siteSettings,
    suffix: '',
  });
};

const HomePage = async () => {
  const [homePage, services, blogPosts, testimonials] = await Promise.all([
    getHomePage(),
    getServices(),
    getBlogPosts(),
    getTestimonials(),
  ]);

  const standardServices = services.filter(service => !service.specialised);
  const specialisedServices = services.filter(service => service.specialised);
  const featuredBlogPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <>
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
          eyebrow={homePage?.offerEyebrow ?? 'Services'}
          heading={homePage?.offerHeading ?? 'Guided walks and yoga sessions'}
          intro={homePage?.offerIntro}
        >
          <CardGrid>
            {standardServices.map(service => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </CardGrid>
          <Link href="/services">
            <Button $variant="outline">View all services</Button>
          </Link>
        </Section>
      )}

      {specialisedServices.length > 0 && (
        <Section
          $background="default"
          eyebrow="Specialised"
          heading="Specialised services"
        >
          <CardGrid>
            {specialisedServices.map(service => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </CardGrid>
        </Section>
      )}

      <Section
        $background="elevated"
        eyebrow="From the blog"
        heading="Notes from the trail and the mat"
      >
        <CardGrid>
          {(featuredBlogPosts.length
            ? featuredBlogPosts
            : blogPosts.slice(0, 3)
          ).map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </CardGrid>
        <Link href="/blog">
          <Button $variant="outline">Read the blog</Button>
        </Link>
      </Section>

      <Section
        $background="accent"
        eyebrow={homePage?.testimonialsEyebrow}
        heading={homePage?.testimonialsHeading ?? 'What people say'}
        align="center"
      >
        <CardGrid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </CardGrid>
      </Section>

      <CTASection
        heading={homePage?.ctaHeading ?? 'Ready to get outdoors?'}
        body={homePage?.ctaBody ?? ''}
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
