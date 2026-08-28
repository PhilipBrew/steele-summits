'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Label,
  Stack,
  Text,
  Textarea,
} from '@/components/ui';

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card>
        <Stack $gap="2">
          <Text $variant="h4" as="h2">
            Thanks — we&apos;ll be in touch.
          </Text>
          <Text $variant="bodySm" $color="muted">
            Expect a reply within one working day.
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Stack $gap="5">
          <Stack $gap="0">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" required />
          </Stack>
          <Stack $gap="0">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
            />
          </Stack>
          <Stack $gap="0">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="07123 456789"
            />
          </Stack>
          <Stack $gap="0">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us what you're planning..."
              required
            />
          </Stack>
          <Stack $direction="row" $gap="2" $align="center">
            <Checkbox id="consent" name="consent" required />
            <Label htmlFor="consent" style={{ marginBottom: 0 }}>
              I agree to be contacted about this enquiry
            </Label>
          </Stack>
          <Button $variant="primary" type="submit">
            Send message
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
