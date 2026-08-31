'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Label,
  Select,
  Stack,
  Text,
  Textarea,
} from '@/components/ui';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const GENERAL_ENQUIRY = 'General Enquiry';

export interface ContactFormProps {
  // Service names for the dropdown — pass this on the /contact page only.
  services?: { name: string }[];
  // Fixed service context when the form is embedded on a service's own
  // page — no dropdown shown, this value is sent silently instead.
  fixedService?: string;
}

export const ContactForm = ({ services, fixedService }: ContactFormProps) => {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const formData = new FormData(event.currentTarget);
    const service = fixedService ?? formData.get('service') ?? undefined;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || undefined,
          message: formData.get('message'),
          consent: formData.get('consent') === 'on',
          company: formData.get('company'),
          service,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
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
            <Input
              id="name"
              name="name"
              placeholder="Jane Doe"
              maxLength={100}
              required
            />
          </Stack>
          <Stack $gap="0">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              maxLength={254}
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
              maxLength={30}
            />
          </Stack>
          {services && services.length > 0 && (
            <Stack $gap="0">
              <Label htmlFor="service">
                What&apos;s this about? (optional)
              </Label>
              <Select
                id="service"
                name="service"
                defaultValue={GENERAL_ENQUIRY}
              >
                <option value={GENERAL_ENQUIRY}>{GENERAL_ENQUIRY}</option>
                {services.map(service => (
                  <option key={service.name} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </Stack>
          )}
          <Stack $gap="0">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us what you're planning..."
              maxLength={5000}
              required
            />
          </Stack>
          <Stack $direction="row" $gap="2" $align="center">
            <Checkbox id="consent" name="consent" required />
            <Label htmlFor="consent" style={{ marginBottom: 0 }}>
              I agree to be contacted about this enquiry
            </Label>
          </Stack>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px' }}
          />
          {status === 'error' && (
            <Text $variant="bodySm" $color="danger">
              Something went wrong sending your message — please try again, or
              email us directly.
            </Text>
          )}
          <Button
            $variant="primary"
            type="submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
