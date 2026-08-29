'use client';

import Link from 'next/link';
import { Card, CardMedia, Stack, Text } from '@/components/ui';
import { formatPrice } from '@/lib/sanity/price';
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
          {formatPrice(service) && (
            <Text
              $variant="bodySm"
              $color="primary"
              style={{ fontWeight: 600 }}
            >
              {formatPrice(service)}
            </Text>
          )}
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
