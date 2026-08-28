import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  CardGrid,
  CTASection,
  Hero,
  Section,
  SplitContent,
} from '@/components/layout';
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

  const featuredServices = services
    .filter(service => service.featured)
    .slice(0, 3);
  const featuredBlogPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  const guidingMedia = services[0];

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
              <Button $variant="outline" $size="lg">
                Read the blog
              </Button>
            </Link>
          </>
        }
      />

      <Section
        $background="elevated"
        eyebrow={homePage?.offerEyebrow}
        heading={homePage?.offerHeading}
        intro={homePage?.offerIntro}
      >
        <CardGrid>
          {(featuredServices.length
            ? featuredServices
            : services.slice(0, 3)
          ).map(service => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </CardGrid>
        <Link href="/services">
          <Button $variant="outline">View all services</Button>
        </Link>
      </Section>

      {guidingMedia && (
        <Section $background="default">
          <SplitContent
            eyebrow={homePage?.guidingEyebrow}
            heading={
              homePage?.guidingHeading ??
              'Walking with someone who knows the mountain'
            }
            body={homePage?.guidingBody ?? ''}
            actions={
              <Link href="/services">
                <Button $variant="primary">See guided walks</Button>
              </Link>
            }
            media={<ServiceCard service={guidingMedia} />}
          />
        </Section>
      )}

      <Section
        $background="elevated"
        eyebrow="Services"
        heading="Guided walks and yoga sessions"
      >
        <CardGrid>
          {services.map(service => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </CardGrid>
      </Section>

      <Section
        $background="default"
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
