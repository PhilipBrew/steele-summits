'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Stack } from './Stack';
import { Text } from './Text';

const CrumbLink = styled(Text).attrs({ $variant: 'bodySm', as: 'span' })`
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <Stack
    as="nav"
    $direction="row"
    $gap="2"
    $align="center"
    $wrap
    aria-label="Breadcrumb"
  >
    {items.map((item, index) => (
      <Stack key={item.label} $direction="row" $gap="2" $align="center">
        {item.href ? (
          <Link href={item.href}>
            <CrumbLink>{item.label}</CrumbLink>
          </Link>
        ) : (
          <Text $variant="bodySm" $color="ink" as="span">
            {item.label}
          </Text>
        )}
        {index < items.length - 1 && (
          <Text $variant="bodySm" $color="muted" as="span">
            /
          </Text>
        )}
      </Stack>
    ))}
  </Stack>
);
