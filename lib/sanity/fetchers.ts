import { client, getSanityClient } from '@/lib/sanity/client';
import { TAGS } from '@/lib/sanity/tags';
import type {
  Service,
  BlogPost,
  Testimonial,
  HomePage,
  AboutPage,
  ServicesPage,
  BlogPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsPage,
  SiteSettings,
} from '@/lib/sanity/types';
import {
  servicesQuery,
  serviceSlugsQuery,
  serviceBySlugQuery,
  blogPostsQuery,
  blogPostSlugsQuery,
  blogPostBySlugQuery,
  testimonialsQuery,
  homePageQuery,
  aboutPageQuery,
  servicesPageQuery,
  blogPageQuery,
  contactPageQuery,
  privacyPolicyPageQuery,
  termsPageQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';

const REVALIDATE_SECONDS = 3600;

// Cache options for a fetch: normally tagged + time-revalidated so
// on-demand revalidation (see app/api/revalidate) and ISR both work: in
// Draft Mode, uncached so an editor always sees the latest draft — Draft
// Mode already forces the page itself to render dynamically, this just
// makes sure the underlying fetch doesn't serve a stale cached response.
const fetchOptions = (
  preview: boolean,
  tag: string,
): { cache: 'no-store' } | { next: { tags: string[]; revalidate: number } } =>
  preview
    ? { cache: 'no-store' }
    : { next: { tags: [tag], revalidate: REVALIDATE_SECONDS } };

export const getServices = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<Service[]>(
    servicesQuery,
    {},
    fetchOptions(preview, TAGS.service),
  );
};

// Deliberately always the plain published client, never getSanityClient():
// this feeds generateStaticParams (build time, no request/cookie context —
// calling draftMode() there throws) and the sitemap, neither of which
// should include unpublished slugs anyway.
export const getServiceSlugs = () =>
  client.fetch<string[]>(
    serviceSlugsQuery,
    {},
    fetchOptions(false, TAGS.service),
  );

export const getServiceBySlug = async (slug: string) => {
  const { client, preview } = await getSanityClient();
  return client.fetch<Service | null>(
    serviceBySlugQuery,
    { slug },
    fetchOptions(preview, TAGS.service),
  );
};

export const getBlogPosts = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<BlogPost[]>(
    blogPostsQuery,
    {},
    fetchOptions(preview, TAGS.blogPost),
  );
};

// See getServiceSlugs above — same reasoning applies here.
export const getBlogPostSlugs = () =>
  client.fetch<string[]>(
    blogPostSlugsQuery,
    {},
    fetchOptions(false, TAGS.blogPost),
  );

export const getBlogPostBySlug = async (slug: string) => {
  const { client, preview } = await getSanityClient();
  return client.fetch<BlogPost | null>(
    blogPostBySlugQuery,
    { slug },
    fetchOptions(preview, TAGS.blogPost),
  );
};

export const getTestimonials = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<Testimonial[]>(
    testimonialsQuery,
    {},
    fetchOptions(preview, TAGS.testimonial),
  );
};

export const getHomePage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<HomePage | null>(
    homePageQuery,
    {},
    fetchOptions(preview, TAGS.homePage),
  );
};

export const getAboutPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<AboutPage | null>(
    aboutPageQuery,
    {},
    fetchOptions(preview, TAGS.aboutPage),
  );
};

export const getServicesPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<ServicesPage | null>(
    servicesPageQuery,
    {},
    fetchOptions(preview, TAGS.servicesPage),
  );
};

export const getBlogPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<BlogPage | null>(
    blogPageQuery,
    {},
    fetchOptions(preview, TAGS.blogPage),
  );
};

export const getContactPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<ContactPage | null>(
    contactPageQuery,
    {},
    fetchOptions(preview, TAGS.contactPage),
  );
};

export const getPrivacyPolicyPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<PrivacyPolicyPage | null>(
    privacyPolicyPageQuery,
    {},
    fetchOptions(preview, TAGS.privacyPolicyPage),
  );
};

export const getTermsPage = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<TermsPage | null>(
    termsPageQuery,
    {},
    fetchOptions(preview, TAGS.termsPage),
  );
};

export const getSiteSettings = async () => {
  const { client, preview } = await getSanityClient();
  return client.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    fetchOptions(preview, TAGS.siteSettings),
  );
};
