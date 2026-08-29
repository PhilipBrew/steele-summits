'use client';

import Link from 'next/link';
import styled from 'styled-components';
import {
  Container,
  InstagramIcon,
  SanityImage,
  Stack,
  Text,
} from '@/components/ui';
import type { NavLink, SanityImageWithAlt } from '@/lib/sanity/types';

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-block: ${({ theme }) => theme.space[8]};
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[7]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const BottomBar = styled.div`
  margin-top: ${({ theme }) => theme.space[8]};
  padding-top: ${({ theme }) => theme.space[5]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  align-items: center;
  justify-content: space-between;
`;

const currentYear = new Date().getFullYear();

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.ink};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[5]};
`;

const BadgeFrame = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
`;

export interface FooterProps {
  siteName: string;
  footerTagline?: string;
  navLinks: NavLink[];
  contactEmail: string;
  qualifications?: SanityImageWithAlt[];
  instagramUrl?: string;
}

export const Footer = ({
  siteName,
  footerTagline,
  navLinks,
  contactEmail,
  qualifications,
  instagramUrl,
}: FooterProps) => (
  <Wrapper>
    <Container>
      <Grid>
        <Stack $gap="3" style={{ maxWidth: 360 }}>
          <Text $variant="h4" as="p">
            {siteName}
          </Text>
          {footerTagline && (
            <Text $variant="bodySm" $color="muted">
              {footerTagline}
            </Text>
          )}
        </Stack>

        <Stack $gap="3">
          <Text $variant="eyebrow" $color="muted">
            Site
          </Text>
          <Stack $gap="2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <Text $variant="bodySm" as="span">
                  {link.label}
                </Text>
              </Link>
            ))}
          </Stack>
        </Stack>

        <Stack $gap="3">
          <Text $variant="eyebrow" $color="muted">
            Get in touch
          </Text>
          <Stack $gap="2">
            <Link href="/contact">
              <Text $variant="bodySm" as="span">
                Contact us
              </Text>
            </Link>
            <Text $variant="bodySm" $color="muted">
              {contactEmail}
            </Text>
            {instagramUrl && (
              <InstagramLink
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={16} />
                <Text $variant="bodySm" as="span">
                  Instagram
                </Text>
              </InstagramLink>
            )}
          </Stack>
        </Stack>
      </Grid>

      {qualifications && qualifications.some(q => q.asset) && (
        <Badges>
          {qualifications
            .filter(qualification => qualification.asset)
            .map(qualification => (
              <BadgeFrame key={qualification.asset?._ref}>
                <SanityImage
                  image={qualification}
                  fill
                  sizes="48px"
                  style={{ objectFit: 'contain' }}
                />
              </BadgeFrame>
            ))}
        </Badges>
      )}

      <BottomBar>
        <Text $variant="caption" $color="muted">
          © {currentYear} {siteName}. All rights reserved.
        </Text>
      </BottomBar>
    </Container>
  </Wrapper>
);
