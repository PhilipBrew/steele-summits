'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Stack } from './Stack';
import { Text } from './Text';
import { InstagramIcon } from './InstagramIcon';
import {
  XIcon,
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  EmailIcon,
} from './ShareIcons';

export interface ShareButtonsProps {
  url: string;
  title: string;
}

const IconButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in this browser — nothing more we can do.
    }
  };

  return (
    <Stack $gap="3">
      <Text $variant="eyebrow" $color="muted">
        Share this
      </Text>
      <Stack $direction="row" $gap="2" $align="center" $wrap>
        <IconButton
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <XIcon />
        </IconButton>
        <IconButton
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon />
        </IconButton>
        <IconButton
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
          aria-label="Share by email"
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          as="button"
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy link to share on Instagram"
        >
          <InstagramIcon />
        </IconButton>
        {copied && (
          <Text $variant="caption" $color="primary">
            Link copied — paste it into your Instagram bio or story!
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
