'use client';

import { Card, Stack, Text } from '@/components/ui';
import type { Testimonial } from '@/lib/sanity/types';

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card>
    <Stack $gap="4">
      <Text $variant="bodyLg">“{testimonial.quote}”</Text>
      <Stack $gap="0">
        <Text $variant="bodySm">{testimonial.name}</Text>
        <Text $variant="caption" $color="muted">
          {testimonial.context}
        </Text>
      </Stack>
    </Stack>
  </Card>
);
