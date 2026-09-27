'use client';

import styled from 'styled-components';
import { CardMedia, Stack, Text } from '@/components/ui';
import type { BlogPost } from '@/lib/sanity/types';
import { ReadMore } from './CardLink';
import Link from 'next/link';

export interface FeaturedPostCardProps {
  post: BlogPost;
  /** Mirrors the layout so consecutive cards alternate sides. */
  $flip?: boolean;
}

// The lead post in the editorial layout: media and copy side by side rather
// than the stacked card used for secondary posts, so the two roles read
// differently instead of repeating the same shape at different sizes.
const Wrapper = styled(Link)<{ $flip: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ $flip }) => ($flip ? '5fr 7fr' : '7fr 5fr')};
    gap: ${({ theme }) => theme.space[6]};
  }

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    transition: color 0.2s ease;
  }
`;

const Media = styled.div<{ $flip: boolean }>`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};

  /* The image scales rather than the whole card, so surrounding copy
     never shifts on hover. */
  img {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${Wrapper}:hover & img {
    transform: scale(1.03);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    order: ${({ $flip }) => ($flip ? 2 : 1)};
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }

    ${Wrapper}:hover & img {
      transform: none;
    }
  }
`;

const Copy = styled(Stack)<{ $flip: boolean }>`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    order: ${({ $flip }) => ($flip ? 1 : 2)};
  }
`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const FeaturedPostCard = ({
  post,
  $flip = false,
}: FeaturedPostCardProps) => (
  <Wrapper href={`/blog/${post.slug}`} $flip={$flip}>
    <Media $flip={$flip}>
      <CardMedia
        image={post.heroImage}
        fallbackLabel={post.title}
        $ratio="16 / 10"
      />
    </Media>
    <Copy $gap="3" $flip={$flip}>
      <Text $variant="caption" $color="muted">
        {formatDate(post.publishedAt)}
      </Text>
      <Text $variant="h3" as="h3">
        {post.title}
      </Text>
      <Text $variant="body" $color="muted">
        {post.excerpt}
      </Text>
      <ReadMore>Read more →</ReadMore>
    </Copy>
  </Wrapper>
);
