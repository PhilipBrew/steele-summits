import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, ImagePlaceholder } from '@/components/ui';
import { CTASection, Hero, Section, SplitContent } from '@/components/layout';

export const metadata: Metadata = {
  title: 'About — Steele Summits',
  description:
    'Why Steele Summits exists, how routes and sessions are planned, and what makes it different.',
};

const AboutPage = () => (
  <>
    <Hero
      eyebrow="About"
      heading="Mountains and mats, taken at your own pace."
      intro="Steele Summits started from a simple belief: that time on the hill and time on the mat both work best when the pace matches the person, not a fixed itinerary."
      align="center"
      $scene="valley"
      $size="lg"
    />

    <Section $background="elevated">
      <SplitContent
        eyebrow="Our approach"
        heading="Qualified, and built around the group"
        body="Every guided walk is led by a qualified Mountain Leader, with routes chosen the week of the walk based on conditions and group experience — not booked months in advance and run regardless of the weather. Yoga sessions follow the same principle: a practice that fits how the body feels that day, not a fixed sequence."
        media={<ImagePlaceholder $label="Steele Summits" />}
      />
    </Section>

    <Section
      $background="default"
      eyebrow="Why it matters"
      heading="Getting outdoors should feel achievable"
      intro="Whether it's a first hillwalk or a fourth Wainwright season, the aim is the same: build confidence on the ground, one well-paced day at a time."
      align="center"
    />

    <CTASection
      heading="Come and see for yourself"
      body="Get in touch to talk through a route, a session, or a multi-day trip — no obligation, no hard sell."
      actions={
        <Link href="/contact">
          <Button $variant="secondary" $size="lg">
            Get in touch
          </Button>
        </Link>
      }
    />
  </>
);

export default AboutPage;
