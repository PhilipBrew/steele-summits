import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { CardGrid, CTASection, Hero, Section } from '@/components/layout';
import { BlogPostCard } from '@/components/cards';
import {
  getBlogPosts,
  getBlogPage,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const [blogPage, siteSettings] = await Promise.all([
    getBlogPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: blogPage?.seo,
    fallbackTitle: 'Blog',
    fallbackDescription: 'Notes on mountain walking, navigation, and yoga.',
    path: '/blog',
    siteSettings,
  });
};

const BlogPage = async () => {
  const [blogPosts, blogPage, siteSettings] = await Promise.all([
    getBlogPosts(),
    getBlogPage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero
        eyebrow={blogPage?.heroEyebrow ?? 'Blog'}
        heading={blogPage?.heroHeading ?? 'Notes from the trail and the mat'}
        intro={
          blogPage?.heroIntro ??
          'Walking skills, route notes, and the occasional word on why yoga and hillwalking make such a good pair.'
        }
        heroImage={blogPage?.heroImage}
        $scene="coast"
        $size="md"
      />

      <Section $background="default">
        <CardGrid>
          {blogPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </CardGrid>
      </Section>

      <CTASection
        heading={siteSettings?.ctaHeading ?? 'Ready to get outdoors?'}
        body={
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

export default BlogPage;
