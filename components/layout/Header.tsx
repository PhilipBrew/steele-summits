'use client';

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, Container, InstagramIcon, Stack, Text } from '@/components/ui';
import type { NavLink } from '@/lib/sanity/types';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  padding-block: ${({ theme }) => theme.space[3]};
`;

const DesktopNav = styled.nav`
  display: none;
  gap: ${({ theme }) => theme.space[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const NavLinkText = styled(Text).attrs({ as: 'span' })`
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  padding-block: ${({ theme }) => theme.space[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  padding-block: ${({ theme }) => theme.space[2]};
`;

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.ink};
  transition:
    color 0.15s ease,
    background 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceElevated};
  }
`;

export interface HeaderProps {
  siteName: string;
  navLinks: NavLink[];
  instagramUrl?: string;
}

export const Header = ({ siteName, navLinks, instagramUrl }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Bar>
      <Container>
        <Row>
          <Link href="/" aria-label={`${siteName} home`}>
            <Text $variant="h4" as="span">
              {siteName}
            </Text>
          </Link>

          <DesktopNav aria-label="Primary">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <NavLinkText $variant="bodySm" $color="ink">
                  {link.label}
                </NavLinkText>
              </Link>
            ))}
          </DesktopNav>

          <Stack $direction="row" $gap="3" $align="center">
            {instagramUrl && (
              <InstagramLink
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteName} on Instagram`}
              >
                <InstagramIcon />
              </InstagramLink>
            )}
            <Link href="/contact">
              <Button $variant="primary" $size="sm">
                Get in touch
              </Button>
            </Link>
            <MenuToggle
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(open => !open)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </MenuToggle>
          </Stack>
        </Row>

        {isMenuOpen && (
          <MobileNav aria-label="Primary mobile">
            {navLinks.map(link => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <Text $variant="body" as="span">
                  {link.label}
                </Text>
              </MobileNavLink>
            ))}
          </MobileNav>
        )}
      </Container>
    </Bar>
  );
};
