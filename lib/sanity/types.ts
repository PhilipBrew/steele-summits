import type { Image, PortableTextBlock } from 'sanity';

export interface SanityImageWithAlt extends Image {
  alt?: string;
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageWithAlt;
  noIndex?: boolean;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImageWithAlt;
  featured?: boolean;
  seo?: SanitySeo;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImageWithAlt;
  publishedAt: string;
  featured?: boolean;
  seo?: SanitySeo;
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  context?: string;
  photo?: SanityImageWithAlt;
  featured?: boolean;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeading: string;
  heroIntro?: string;
  heroImage?: SanityImageWithAlt;
  offerEyebrow?: string;
  offerHeading?: string;
  offerIntro?: string;
  guidingEyebrow?: string;
  guidingHeading?: string;
  guidingBody?: string;
  testimonialsEyebrow?: string;
  testimonialsHeading?: string;
  ctaHeading?: string;
  ctaBody?: string;
  seo?: SanitySeo;
}

export interface AboutPage {
  heroEyebrow?: string;
  heroHeading: string;
  heroIntro?: string;
  heroImage?: SanityImageWithAlt;
  approachEyebrow?: string;
  approachHeading?: string;
  approachBody?: PortableTextBlock[];
  approachImage?: SanityImageWithAlt;
  whyEyebrow?: string;
  whyHeading?: string;
  whyIntro?: string;
  ctaHeading?: string;
  ctaBody?: string;
  seo?: SanitySeo;
}

export interface ContactPage {
  heroEyebrow?: string;
  heroHeading: string;
  heroIntro?: string;
  heroImage?: SanityImageWithAlt;
  locationHeading?: string;
  locationBody?: string;
  availabilityHeading?: string;
  availabilityBody?: string;
  emailHeading?: string;
  contactEmail: string;
  seo?: SanitySeo;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  siteName: string;
  navLinks?: NavLink[];
  footerTagline?: string;
  contactEmail: string;
  instagramUrl?: string;
  defaultSeo?: SanitySeo;
}
