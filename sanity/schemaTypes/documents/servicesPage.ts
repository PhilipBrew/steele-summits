import { defineType, defineField } from 'sanity';

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
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
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Services Page' }),
  },
});
