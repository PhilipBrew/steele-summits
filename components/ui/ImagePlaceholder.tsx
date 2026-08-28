'use client';

import styled from 'styled-components';

export interface ImagePlaceholderProps {
  $ratio?: string;
  $label?: string;
}

const Wrapper = styled.div<{ $ratio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surfaceElevated} 0%,
    ${({ theme }) => theme.colors.primaryLight} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.white};
`;

export const ImagePlaceholder = ({
  $ratio = '4 / 3',
  $label,
}: ImagePlaceholderProps) => (
  <Wrapper $ratio={$ratio}>{$label && <Label>{$label}</Label>}</Wrapper>
);
