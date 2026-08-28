import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge, ImagePlaceholder, Stack, Text } from '@/components/ui';
import { Section } from '@/components/layout';
import { blogPosts, getBlogPostBySlug } from '@/lib/mock-data/blog-posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  blogPosts.map(post => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return {
    title: post ? `${post.title} — Steele Summits` : 'Blog — Steele Summits',
    description: post?.excerpt,
  };
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section $background="default">
      <Stack $gap="6" style={{ maxWidth: 720, marginInline: 'auto' }}>
        <Stack $gap="3">
          <Badge $variant="accent">{post.category}</Badge>
          <Text $variant="h1" as="h1">
            {post.title}
          </Text>
          <Text $variant="caption" $color="muted">
            {formatDate(post.date)}
          </Text>
        </Stack>
        <ImagePlaceholder $ratio="16 / 9" $label={post.category} />
        <Text $variant="bodyLg" $color="muted">
          {post.body}
        </Text>
      </Stack>
    </Section>
  );
};

export default BlogPostPage;
