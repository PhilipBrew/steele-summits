import type { SchemaTypeDefinition } from 'sanity';

import { imageWithAlt } from './objects/imageWithAlt';
import { seo } from './objects/seo';
import { blockContent } from './objects/blockContent';
import { service } from './documents/service';
import { blogPost } from './documents/blogPost';
import { testimonial } from './documents/testimonial';
import { homePage } from './documents/homePage';
import { aboutPage } from './documents/aboutPage';
import { servicesPage } from './documents/servicesPage';
import { blogPage } from './documents/blogPage';
import { contactPage } from './documents/contactPage';
import { siteSettings } from './documents/siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  imageWithAlt,
  seo,
  blockContent,
  // collections
  service,
  blogPost,
  testimonial,
  // singleton pages
  homePage,
  aboutPage,
  servicesPage,
  blogPage,
  contactPage,
  siteSettings,
];
