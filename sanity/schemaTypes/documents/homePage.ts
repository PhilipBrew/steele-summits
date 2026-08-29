import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroIntro',
      title: 'Hero intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAlt',
      description: 'Falls back to an illustrated banner when left blank.',
    }),
    defineField({
      name: 'offerEyebrow',
      title: '"What we offer" eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'offerHeading',
      title: '"What we offer" heading',
      type: 'string',
    }),
    defineField({
      name: 'offerIntro',
      title: '"What we offer" intro',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'testimonialsEyebrow',
      title: 'Testimonials eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Closing CTA heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaBody',
      title: 'Closing CTA body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
