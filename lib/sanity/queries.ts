import { groq } from 'next-sanity';

const serviceFields = groq`
  _id,
  name,
  "slug": slug.current,
  summary,
  body,
  heroImage,
  price,
  priceUnit,
  specialised,
  seo
`;

const blogPostFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  heroImage,
  publishedAt,
  featured,
  seo
`;

export const servicesQuery = groq`*[_type == "service"] | order(orderRank asc) { ${serviceFields} }`;

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] { ${serviceFields} }`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) { ${blogPostFields} }`;

export const blogPostSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)][].slug.current`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] { ${blogPostFields} }`;

export const testimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(_createdAt asc)`;

export const homePageQuery = groq`*[_type == "homePage"][0]`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;
