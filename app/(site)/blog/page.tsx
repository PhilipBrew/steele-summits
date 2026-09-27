import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { AsymmetricGrid, CTASection, Hero, Section } from '@/components/layout';
import { Reveal, Text } from '@/components/ui';
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
    fallbackImage: blogPage?.heroImage,
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
        {blogPosts.length > 0 ? (
          <AsymmetricGrid>
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 70}>
                <BlogPostCard post={post} />
              </Reveal>
            ))}
          </AsymmetricGrid>
        ) : (
          <Text $variant="bodyLg" $color="muted">
            No posts yet. Notes from recent days on the hill will appear here.
          </Text>
        )}
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
