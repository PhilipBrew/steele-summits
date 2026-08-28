'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Container, Stack, Text } from '@/components/ui';
import { navLinks } from './navLinks';

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

export const Footer = () => (
  <Wrapper>
    <Container>
      <Grid>
        <Stack $gap="3" style={{ maxWidth: 360 }}>
          <Text $variant="h4" as="p">
            Steele Summits
          </Text>
          <Text $variant="bodySm" $color="muted">
            Guided mountain walking and outdoor yoga across the Lake District
            and Northumberland — routes and sessions built around you, not a
            timetable.
          </Text>
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
              hello@steelesummits.co.uk
            </Text>
          </Stack>
        </Stack>
      </Grid>

      <BottomBar>
        <Text $variant="caption" $color="muted">
          © {currentYear} Steele Summits. All rights reserved.
        </Text>
      </BottomBar>
    </Container>
  </Wrapper>
);
