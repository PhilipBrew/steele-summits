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
import { services } from '@/lib/mock-data/services';
import { blogPosts } from '@/lib/mock-data/blog-posts';
import { testimonials } from '@/lib/mock-data/testimonials';

const HomePage = () => (
  <>
    <Hero
      eyebrow="Steele Summits"
      heading="Find your pace, on the hill and on the mat."
      intro="Guided mountain walking across the fells of the Lake District and the wild hills of Northumberland, paired with grounding yoga sessions designed to help you move, breathe, and recover — outdoors or in."
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
      eyebrow="What we offer"
      heading="Two ways to feel stronger outdoors"
      intro="Every route and every session is planned around the people taking part, not a fixed timetable."
    >
      <CardGrid>
        {services.slice(0, 3).map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </CardGrid>
      <Link href="/services">
        <Button $variant="outline">View all services</Button>
      </Link>
    </Section>

    <Section $background="default">
      <SplitContent
        eyebrow="Guiding"
        heading="Walking with someone who knows the mountain"
        body="A qualified Mountain Leader plans every route around the weather, the ground conditions, and the people on the day — so the walk always matches the group, not the other way around."
        actions={
          <Link href="/services">
            <Button $variant="primary">See guided walks</Button>
          </Link>
        }
        media={<ServiceCard service={services[0]} />}
      />
    </Section>

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
        {blogPosts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </CardGrid>
    </Section>

    <Section
      $background="accent"
      eyebrow="Words from walkers"
      heading="What people say"
      align="center"
    >
      <CardGrid>
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </CardGrid>
    </Section>

    <CTASection
      heading="Ready to get outdoors?"
      body="Book a guided walk or a yoga session and start moving at your own pace."
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

export default HomePage;
