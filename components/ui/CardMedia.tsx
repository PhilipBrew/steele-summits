'use client';

import styled from 'styled-components';
import { SanityImage } from './SanityImage';
import { ImagePlaceholder } from './ImagePlaceholder';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

export interface CardMediaProps {
  image?: SanityImageWithAlt | null;
  fallbackLabel?: string;
  $ratio?: string;
}

const Frame = styled.div<{ $ratio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardMedia = ({
  image,
  fallbackLabel,
  $ratio = '4 / 3',
}: CardMediaProps) =>
  image?.asset ? (
    <Frame $ratio={$ratio}>
      <SanityImage
        image={image}
        fill
        sizes="(min-width: 768px) 400px, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </Frame>
  ) : (
    <ImagePlaceholder $ratio={$ratio} $label={fallbackLabel} />
  );
