'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Button, CardMedia, Stack, Text } from '@/components/ui';
import { SplitContent } from '@/components/layout';
import type { Service } from '@/lib/sanity/types';

const Row = styled.div`
  padding-top: ${({ theme }) => theme.space[8]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-top: 0;
    border-top: none;
  }
`;

export interface ServiceRowsProps {
  services: Service[];
}

export const ServiceRows = ({ services }: ServiceRowsProps) => (
  <Stack $gap="8">
    {services.map((service, index) => (
      <Row key={service.slug}>
        <SplitContent
          heading={service.name}
          $reverse={index % 2 === 1}
          body={
            <Text $variant="bodyLg" $color="muted">
              {service.summary}
            </Text>
          }
          actions={
            <Link href={`/services/${service.slug}`}>
              <Button $variant="primary">View details</Button>
            </Link>
          }
          media={
            <CardMedia
              image={service.heroImage}
              fallbackLabel={service.name}
              $ratio="4 / 3"
            />
          }
        />
      </Row>
    ))}
  </Stack>
);
