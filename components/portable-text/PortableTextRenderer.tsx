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

// Rich-text links from the WYSIWYG editor otherwise inherit the global
// `a { color: inherit; text-decoration: none }` reset and read as plain
// text — style them so they're recognisable as links inline with prose.
const RichTextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-underline-offset: 0.15em;
  text-decoration-color: ${({ theme }) => theme.colors.primaryLight};
  cursor: pointer;
  transition:
    color 0.15s ease,
    text-decoration-color 0.15s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration-color: currentColor;
  }
`;

// SITE_URL mirrors the pattern used across the app (e.g. lib/sanity/seo.ts)
// rather than a shared constant — kept local since this is the only place
// editor-authored links need to be classified as internal vs external.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

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
    link: ({ value, children }) => {
      const href = value?.href ?? '#';
      // mailto: links and links back to this site open in the same tab;
      // other external links open in a new tab, matching how outbound
      // links elsewhere on the site (header, footer, share buttons) behave.
      const isExternal =
        /^https?:\/\//i.test(href) && !href.startsWith(SITE_URL);

      return (
        <RichTextLink
          href={href}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </RichTextLink>
      );
    },
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
