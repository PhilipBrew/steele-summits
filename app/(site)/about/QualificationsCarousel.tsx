'use client';

import styled, { keyframes } from 'styled-components';
import { SanityImage } from '@/components/ui';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(
    90deg,
    transparent,
    black ${({ theme }) => theme.space[7]},
    black calc(100% - ${({ theme }) => theme.space[7]}),
    transparent
  );
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
  width: max-content;
  animation: ${scroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Frame = styled.div`
  position: relative;
  width: 140px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export interface QualificationsCarouselProps {
  qualifications: SanityImageWithAlt[];
}

export const QualificationsCarousel = ({
  qualifications,
}: QualificationsCarouselProps) => {
  const withImages = qualifications.filter(
    qualification => qualification.asset,
  );

  if (withImages.length === 0) {
    return null;
  }

  const looped = [...withImages, ...withImages];

  return (
    <Viewport>
      <Track>
        {looped.map((qualification, index) => (
          <Frame
            key={`${qualification.asset?._ref}-${index}`}
            aria-hidden={index >= withImages.length}
          >
            <SanityImage
              image={qualification}
              fill
              sizes="140px"
              style={{ objectFit: 'contain', padding: '1rem' }}
            />
          </Frame>
        ))}
      </Track>
    </Viewport>
  );
};
