import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'approachEyebrow',
      title: '"Our approach" eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'approachHeading',
      title: '"Our approach" heading',
      type: 'string',
    }),
    defineField({
      name: 'approachBody',
      title: '"Our approach" body',
      type: 'blockContent',
    }),
    defineField({
      name: 'approachImage',
      title: '"Our approach" image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'whyEyebrow',
      title: '"Why it matters" eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'whyHeading',
      title: '"Why it matters" heading',
      type: 'string',
    }),
    defineField({
      name: 'whyIntro',
      title: '"Why it matters" intro',
      type: 'text',
      rows: 3,
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
    prepare: () => ({ title: 'About Page' }),
  },
});
