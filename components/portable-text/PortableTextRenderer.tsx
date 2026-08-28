'use client';

import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from 'sanity';
import Link from 'next/link';
import styled from 'styled-components';

import { Text, SanityImage } from '@/components/ui';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

const List = styled.ul`
  margin: 0.75em 0;
  padding-left: 1.25em;
  display: flex;
  flex-direction: column;
  gap: 0.35em;
`;

const Blockquote = styled(Text).attrs({
  as: 'blockquote',
  $variant: 'bodyLg',
  $color: 'muted',
})`
  margin: 1.5em 0;
  padding-left: ${({ theme }) => theme.space[5]};
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  font-style: italic;
`;

// Custom component map is the extension point for future custom blocks
// (galleries, callouts, etc.) without a content-model migration.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text $variant="body" style={{ marginBlock: '1em' }}>
        {children}
      </Text>
    ),
    h2: ({ children }) => (
      <Text $variant="h2" as="h2" style={{ marginBlockStart: '1.5em' }}>
        {children}
      </Text>
    ),
    h3: ({ children }) => (
      <Text $variant="h3" as="h3" style={{ marginBlockStart: '1.25em' }}>
        {children}
      </Text>
    ),
    h4: ({ children }) => (
      <Text $variant="h4" as="h4" style={{ marginBlockStart: '1em' }}>
        {children}
      </Text>
    ),
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  },
  list: {
    bullet: ({ children }) => <List>{children}</List>,
    number: ({ children }) => (
      <List as="ol" style={{ listStyleType: 'decimal' }}>
        {children}
      </List>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <Text as="li" $variant="body" style={{ margin: 0 }}>
        {children}
      </Text>
    ),
    number: ({ children }) => (
      <Text as="li" $variant="body" style={{ margin: 0 }}>
        {children}
      </Text>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <Link href={value?.href ?? '#'}>{children}</Link>
    ),
  },
  types: {
    imageWithAlt: ({ value }: { value: SanityImageWithAlt }) => (
      <SanityImage
        image={value}
        width={800}
        height={600}
        style={{ width: '100%', height: 'auto' }}
      />
    ),
  },
};

export interface PortableTextRendererProps {
  value?: PortableTextBlock[];
}

export const PortableTextRenderer = ({ value }: PortableTextRendererProps) =>
  value ? <PortableText value={value} components={components} /> : null;
