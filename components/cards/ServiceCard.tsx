'use client';

import Link from 'next/link';
import { Badge, Card, CardMedia, Stack, Text } from '@/components/ui';
import type { Service } from '@/lib/sanity/types';

export interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => (
  <Link href={`/services/${service.slug}`}>
    <Card>
      <Stack $gap="4">
        <CardMedia image={service.heroImage} fallbackLabel={service.name} />
        <Stack $gap="2">
          <Badge $variant="accent">{service.category}</Badge>
          <Text $variant="h4" as="h3">
            {service.name}
          </Text>
          <Text $variant="bodySm" $color="muted">
            {service.summary}
          </Text>
        </Stack>
      </Stack>
    </Card>
  </Link>
);
