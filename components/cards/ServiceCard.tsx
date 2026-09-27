'use client';

import { CardMedia, Stack, Text } from '@/components/ui';
import { formatPrice } from '@/lib/sanity/price';
import type { Service } from '@/lib/sanity/types';
import { CardLink, ReadMore, StretchCard } from './CardLink';

export interface ServiceCardProps {
  service: Service;
  showPrice?: boolean;
}

export const ServiceCard = ({
  service,
  showPrice = true,
}: ServiceCardProps) => (
  <CardLink href={`/services/${service.slug}`}>
    <StretchCard>
      <CardMedia image={service.heroImage} fallbackLabel={service.name} />
      <Stack $gap="2">
        {showPrice && formatPrice(service) && (
          <Text $variant="bodySm" $color="primary" style={{ fontWeight: 600 }}>
            {formatPrice(service)}
          </Text>
        )}
        <Text $variant="h3" as="h3">
          {service.name}
        </Text>
        <Text $variant="bodySm" $color="muted">
          {service.summary}
        </Text>
      </Stack>
      <ReadMore>View details →</ReadMore>
    </StretchCard>
  </CardLink>
);
