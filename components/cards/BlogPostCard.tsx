'use client';

import { CardMedia, Stack, Text } from '@/components/ui';
import type { BlogPost } from '@/lib/sanity/types';
import { CardLink, ReadMore, StretchCard } from './CardLink';

export interface BlogPostCardProps {
  post: BlogPost;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const BlogPostCard = ({ post }: BlogPostCardProps) => (
  <CardLink href={`/blog/${post.slug}`}>
    <StretchCard>
      <CardMedia image={post.heroImage} fallbackLabel={post.title} />
      <Stack $gap="2">
        <Text $variant="h4" as="h3">
          {post.title}
        </Text>
        <Text $variant="bodySm" $color="muted">
          {post.excerpt}
        </Text>
        <Text $variant="caption" $color="muted">
          {formatDate(post.publishedAt)}
        </Text>
      </Stack>
      <ReadMore>Read more →</ReadMore>
    </StretchCard>
  </CardLink>
);
