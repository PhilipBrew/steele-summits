import type { Metadata } from 'next';
import { CardGrid, Hero, Section } from '@/components/layout';
import { BlogPostCard } from '@/components/cards';
import { blogPosts } from '@/lib/mock-data/blog-posts';

export const metadata: Metadata = {
  title: 'Blog — Steele Summits',
  description: 'Notes on mountain walking, navigation, and yoga.',
};

const BlogPage = () => (
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

export default BlogPage;
