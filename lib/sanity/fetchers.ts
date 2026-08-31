import { client } from '@/lib/sanity/client';
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

export const getServices = () =>
  client.fetch<Service[]>(
    servicesQuery,
    {},
    { next: { tags: [TAGS.service], revalidate: REVALIDATE_SECONDS } },
  );

export const getServiceSlugs = () =>
  client.fetch<string[]>(
    serviceSlugsQuery,
    {},
    { next: { tags: [TAGS.service], revalidate: REVALIDATE_SECONDS } },
  );

export const getServiceBySlug = (slug: string) =>
  client.fetch<Service | null>(
    serviceBySlugQuery,
    { slug },
    { next: { tags: [TAGS.service], revalidate: REVALIDATE_SECONDS } },
  );

export const getBlogPosts = () =>
  client.fetch<BlogPost[]>(
    blogPostsQuery,
    {},
    { next: { tags: [TAGS.blogPost], revalidate: REVALIDATE_SECONDS } },
  );

export const getBlogPostSlugs = () =>
  client.fetch<string[]>(
    blogPostSlugsQuery,
    {},
    { next: { tags: [TAGS.blogPost], revalidate: REVALIDATE_SECONDS } },
  );

export const getBlogPostBySlug = (slug: string) =>
  client.fetch<BlogPost | null>(
    blogPostBySlugQuery,
    { slug },
    { next: { tags: [TAGS.blogPost], revalidate: REVALIDATE_SECONDS } },
  );

export const getTestimonials = () =>
  client.fetch<Testimonial[]>(
    testimonialsQuery,
    {},
    { next: { tags: [TAGS.testimonial], revalidate: REVALIDATE_SECONDS } },
  );

export const getHomePage = () =>
  client.fetch<HomePage | null>(
    homePageQuery,
    {},
    { next: { tags: [TAGS.homePage], revalidate: REVALIDATE_SECONDS } },
  );

export const getAboutPage = () =>
  client.fetch<AboutPage | null>(
    aboutPageQuery,
    {},
    { next: { tags: [TAGS.aboutPage], revalidate: REVALIDATE_SECONDS } },
  );

export const getServicesPage = () =>
  client.fetch<ServicesPage | null>(
    servicesPageQuery,
    {},
    { next: { tags: [TAGS.servicesPage], revalidate: REVALIDATE_SECONDS } },
  );

export const getBlogPage = () =>
  client.fetch<BlogPage | null>(
    blogPageQuery,
    {},
    { next: { tags: [TAGS.blogPage], revalidate: REVALIDATE_SECONDS } },
  );

export const getContactPage = () =>
  client.fetch<ContactPage | null>(
    contactPageQuery,
    {},
    { next: { tags: [TAGS.contactPage], revalidate: REVALIDATE_SECONDS } },
  );

export const getPrivacyPolicyPage = () =>
  client.fetch<PrivacyPolicyPage | null>(
    privacyPolicyPageQuery,
    {},
    {
      next: { tags: [TAGS.privacyPolicyPage], revalidate: REVALIDATE_SECONDS },
    },
  );

export const getTermsPage = () =>
  client.fetch<TermsPage | null>(
    termsPageQuery,
    {},
    { next: { tags: [TAGS.termsPage], revalidate: REVALIDATE_SECONDS } },
  );

export const getSiteSettings = () =>
  client.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    { next: { tags: [TAGS.siteSettings], revalidate: REVALIDATE_SECONDS } },
  );
