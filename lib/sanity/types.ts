import type { Image, PortableTextBlock } from 'sanity';

export interface SanityImageWithAlt extends Image {
  alt?: string;
}

// Shape produced by the @sanity/table Studio plugin (registered in
// sanity.config.ts, used as a blockContent array member). Cells are plain
// text only — the plugin doesn't support rich text or merged cells.
export interface SanityTableRow {
  _key: string;
  cells: string[];
}

export interface SanityTable {
  rows?: SanityTableRow[];
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
  summary: string;
  body?: PortableTextBlock[];
  heroImage?: SanityImageWithAlt;
  price?: number;
  priceUnit?: 'flat' | 'per_day';
  specialised?: boolean;
  relatedBlogPosts?: BlogPost[];
  relatedTestimonials?: Testimonial[];
  enquiryHeading?: string;
  seo?: SanitySeo;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
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
  blogEyebrow?: string;
  blogHeading?: string;
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

export interface ServicesPage {
  heroEyebrow?: string;
  heroHeading: string;
  heroIntro?: string;
  heroImage?: SanityImageWithAlt;
  seo?: SanitySeo;
}

export interface BlogPage {
  heroEyebrow?: string;
  heroHeading: string;
  heroIntro?: string;
  heroImage?: SanityImageWithAlt;
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

export interface PrivacyPolicyPage {
  title: string;
  lastUpdated?: string;
  body: PortableTextBlock[];
  seo?: SanitySeo;
}

export interface TermsPage {
  title: string;
  lastUpdated?: string;
  body: PortableTextBlock[];
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
  qualifications?: SanityImageWithAlt[];
  testimonialsEyebrow?: string;
  testimonialsHeading?: string;
  ctaHeading?: string;
  ctaBody?: string;
  instagramUrl?: string;
  defaultSeo?: SanitySeo;
}
