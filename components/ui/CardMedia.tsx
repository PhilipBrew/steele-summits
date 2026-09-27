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

// Width Sanity is asked to crop to. Generous enough for the widest card on
// a desktop container; Next then serves a smaller variant per `sizes`.
const CROP_WIDTH = 1200;

const parseRatio = (ratio: string) => {
  const [w, h] = ratio.split('/').map(part => Number(part.trim()));
  return Number.isFinite(w) && Number.isFinite(h) && h > 0 ? w / h : 4 / 3;
};

export const CardMedia = ({
  image,
  fallbackLabel,
  $ratio = '4 / 3',
}: CardMediaProps) => {
  if (!image?.asset) {
    return <ImagePlaceholder $ratio={$ratio} $label={fallbackLabel} />;
  }

  // Crop server-side at the frame's own ratio so the editor's focal point
  // decides what survives, rather than object-fit cropping from the centre.
  const cropTo = {
    width: CROP_WIDTH,
    height: Math.round(CROP_WIDTH / parseRatio($ratio)),
  };

  return (
    <Frame $ratio={$ratio}>
      <SanityImage
        image={image}
        cropTo={cropTo}
        fill
        sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </Frame>
  );
};
