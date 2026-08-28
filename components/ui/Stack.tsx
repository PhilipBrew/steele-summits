'use client';

import styled, { css } from 'styled-components';
import type { Theme } from '@/styles/theme';

type SpaceKey = keyof Theme['space'];

export interface StackProps {
  $direction?: 'row' | 'column';
  $gap?: SpaceKey;
  $align?: 'start' | 'center' | 'end' | 'stretch';
  $justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  $wrap?: boolean;
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ $direction = 'column' }) => $direction};
  align-items: ${({ $align = 'stretch' }) => $align};
  justify-content: ${({ $justify = 'start' }) =>
    $justify === 'start' || $justify === 'end' ? `flex-${$justify}` : $justify};
  gap: ${({ theme, $gap = '4' }) => theme.space[$gap]};

  ${({ $wrap }) =>
    $wrap &&
    css`
      flex-wrap: wrap;
    `}
`;
