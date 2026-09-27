import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, CardMedia } from '@/components/ui';
import { CTASection, Hero, Section, SplitContent } from '@/components/layout';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import { getAboutPage, getSiteSettings } from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';
import { QualificationsCarousel } from './QualificationsCarousel';

export const generateMetadata = async (): Promise<Metadata> => {
  const [aboutPage, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: aboutPage?.seo,
    fallbackTitle: 'About',
    fallbackDescription:
      'Why Steele Summit exists, how routes and sessions are planned, and what makes it different.',
    fallbackImage: aboutPage?.heroImage,
    path: '/about',
    siteSettings,
  });
};

const AboutPage = async () => {
  const [aboutPage, siteSettings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);
  const qualifications = (siteSettings?.qualifications ?? []).filter(
    qualification => qualification.asset,
  );

  return (
    <>
      <Hero
        eyebrow={aboutPage?.heroEyebrow}
        heading={
          aboutPage?.heroHeading ??
          'Mountains and mats, taken at your own pace.'
        }
        intro={aboutPage?.heroIntro}
        heroImage={aboutPage?.heroImage}
        align="center"
        $scene="valley"
        $size="lg"
      />

      <Section $background="elevated">
        <SplitContent
          heading={
            aboutPage?.approachHeading ??
            'Qualified, and built around the group'
          }
          body={<PortableTextRenderer value={aboutPage?.approachBody} />}
          media={
            <CardMedia
              image={aboutPage?.approachImage}
              fallbackLabel="Steele Summit"
              $ratio="4 / 3"
            />
          }
        />
      </Section>

      {qualifications.length > 0 && (
        <Section $background="default" heading="Qualifications">
          <QualificationsCarousel qualifications={qualifications} />
        </Section>
      )}

      <Section
        $background="elevated"
        heading={aboutPage?.whyHeading}
        intro={aboutPage?.whyIntro}
        align="center"
      />

      <CTASection
        heading={
          aboutPage?.ctaHeading ??
          siteSettings?.ctaHeading ??
          'Come and see for yourself'
        }
        body={
          aboutPage?.ctaBody ??
          siteSettings?.ctaBody ??
          'Get in touch to talk through a route, a session, or a multi-day trip. No obligation, no hard sell.'
        }
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
};

export default AboutPage;
