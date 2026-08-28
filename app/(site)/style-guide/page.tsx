import type { Metadata } from 'next';
import { theme } from '@/styles/theme';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Input,
  Label,
  Stack,
  Text,
  Textarea,
} from '@/components/ui';
import { CardGrid } from '@/components/layout';
import { BlogPostCard, ServiceCard, TestimonialCard } from '@/components/cards';
import { services } from '@/lib/mock-data/services';
import { testimonials } from '@/lib/mock-data/testimonials';
import { blogPosts } from '@/lib/mock-data/blog-posts';

export const metadata: Metadata = {
  title: 'Style Guide — Steele Summits',
};

const colorEntries = Object.entries(theme.colors);

const StyleGuidePage = () => (
  <Container>
    <Stack $gap="9" style={{ paddingBlock: theme.space[8] }}>
      <Stack $gap="2">
        <Text $variant="eyebrow" $color="primary">
          Internal
        </Text>
        <Text $variant="display" as="h1">
          Style Guide
        </Text>
        <Text $variant="bodyLg" $color="muted">
          Reference for every shared component and token before we build the
          real pages.
        </Text>
      </Stack>

      {/* Colours */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Colours
        </Text>
        <Stack $direction="row" $wrap $gap="4">
          {colorEntries.map(([name, value]) => (
            <Stack key={name} $gap="2" style={{ width: 140 }}>
              <div
                style={{
                  width: '100%',
                  height: 80,
                  borderRadius: theme.radii.md,
                  background: value,
                  border: `1px solid ${theme.colors.border}`,
                }}
              />
              <Text $variant="bodySm">{name}</Text>
              <Text $variant="caption" $color="muted">
                {value}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Typography */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Typography
        </Text>
        <Stack $gap="4">
          <Text $variant="display" as="p">
            Display — Steele Summits
          </Text>
          <Text $variant="h1" as="p">
            Heading 1 — Guided Mountain Walks
          </Text>
          <Text $variant="h2" as="p">
            Heading 2 — Our Services
          </Text>
          <Text $variant="h3" as="p">
            Heading 3 — Hill & Summit Yoga
          </Text>
          <Text $variant="h4" as="p">
            Heading 4 — Route Notes
          </Text>
          <Text $variant="bodyLg">
            Body Large — used for intros and lead paragraphs.
          </Text>
          <Text $variant="body">
            Body — the default paragraph style for most page content across the
            site.
          </Text>
          <Text $variant="bodySm" $color="muted">
            Body Small — secondary/supporting copy.
          </Text>
          <Text $variant="caption" $color="muted">
            Caption — image credits, fine print.
          </Text>
          <Text $variant="eyebrow" $color="primary">
            Eyebrow label
          </Text>
        </Stack>
      </Stack>

      {/* Buttons */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Buttons
        </Text>
        <Stack $direction="row" $wrap $gap="4" $align="center">
          <Button $variant="primary">Primary</Button>
          <Button $variant="secondary">Secondary</Button>
          <Button $variant="outline">Outline</Button>
          <Button $variant="ghost">Ghost</Button>
          <Button $variant="primary" disabled>
            Disabled
          </Button>
        </Stack>
        <Stack $direction="row" $wrap $gap="4" $align="center">
          <Button $variant="primary" $size="sm">
            Small
          </Button>
          <Button $variant="primary" $size="md">
            Medium
          </Button>
          <Button $variant="primary" $size="lg">
            Large
          </Button>
        </Stack>
      </Stack>

      {/* Badges */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Badges
        </Text>
        <Stack $direction="row" $wrap $gap="3">
          <Badge $variant="primary">Primary</Badge>
          <Badge $variant="accent">Accent</Badge>
          <Badge $variant="success">Available</Badge>
          <Badge $variant="warning">Limited</Badge>
          <Badge $variant="danger">Cancelled</Badge>
          <Badge $variant="neutral">Neutral</Badge>
        </Stack>
      </Stack>

      {/* Cards */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Cards
        </Text>
        <Stack $direction="row" $wrap $gap="4">
          <Card $variant="default" style={{ width: 280 }}>
            <Stack $gap="2">
              <Badge $variant="accent">Walking</Badge>
              <Text $variant="h4" as="h3">
                Default Card Variant
              </Text>
              <Text $variant="bodySm" $color="muted">
                White background — the default variant, used on both surface and
                elevated section backgrounds.
              </Text>
            </Stack>
          </Card>
          <Card $variant="elevated" style={{ width: 280 }}>
            <Stack $gap="2">
              <Badge $variant="accent">Yoga</Badge>
              <Text $variant="h4" as="h3">
                Elevated Card Variant
              </Text>
              <Text $variant="bodySm" $color="muted">
                Parchment-toned background, for a subtler card treatment.
              </Text>
            </Stack>
          </Card>
          <Card $variant="accent" style={{ width: 280 }}>
            <Stack $gap="2">
              <Badge $variant="neutral">Featured</Badge>
              <Text $variant="h4" as="h3" $color="white">
                Accent Card Variant
              </Text>
              <Text $variant="bodySm" $color="white">
                Deep pine background for a single highlighted card.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Stack>

      {/* Content cards */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Content cards
        </Text>
        <Text $variant="bodySm" $color="muted">
          Domain cards in <code>components/cards/</code>, built on top of the{' '}
          <code>Card</code>/<code>Badge</code>/<code>ImagePlaceholder</code>{' '}
          primitives above. Layout building blocks (<code>Hero</code>,{' '}
          <code>Section</code>, <code>SplitContent</code>,{' '}
          <code>CTASection</code>) are full-width and shown in context on the
          real pages (Home, About) rather than here.
        </Text>
        <CardGrid>
          <ServiceCard service={services[0]} />
          <BlogPostCard post={blogPosts[0]} />
          <TestimonialCard testimonial={testimonials[0]} />
        </CardGrid>
      </Stack>

      {/* Forms */}
      <Stack $gap="4">
        <Text $variant="h2" as="h2">
          Form fields
        </Text>
        <Card style={{ maxWidth: 480 }}>
          <Stack $gap="5">
            <Stack $gap="0">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" />
            </Stack>
            <Stack $gap="0">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
              />
            </Stack>
            <Stack $gap="0">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us what you're planning..."
              />
            </Stack>
            <Stack $direction="row" $gap="2" $align="center">
              <Checkbox id="consent" name="consent" />
              <Label htmlFor="consent" style={{ marginBottom: 0 }}>
                I agree to be contacted about this enquiry
              </Label>
            </Stack>
            <Button $variant="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  </Container>
);

export default StyleGuidePage;
