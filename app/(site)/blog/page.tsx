import type { Metadata } from 'next';
import { CardGrid, Hero, Section } from '@/components/layout';
import { BlogPostCard } from '@/components/cards';
import { getBlogPosts, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const siteSettings = await getSiteSettings();
  return buildMetadata({
    fallbackTitle: 'Blog',
    fallbackDescription: 'Notes on mountain walking, navigation, and yoga.',
    path: '/blog',
    siteSettings,
  });
};

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <Hero
        eyebrow="Blog"
        heading="Notes from the trail and the mat"
        intro="Walking skills, route notes, and the occasional word on why yoga and hillwalking make such a good pair."
        $scene="coast"
        $size="md"
      />

      <Section $background="elevated">
        <CardGrid>
          {blogPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
};

export default BlogPage;
