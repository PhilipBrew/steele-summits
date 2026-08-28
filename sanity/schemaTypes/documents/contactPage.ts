import { defineType, defineField } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
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
      name: 'locationHeading',
      title: '"Based near" heading',
      type: 'string',
    }),
    defineField({
      name: 'locationBody',
      title: '"Based near" body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'availabilityHeading',
      title: 'Availability heading',
      type: 'string',
    }),
    defineField({
      name: 'availabilityBody',
      title: 'Availability body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'emailHeading',
      title: 'Email heading',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
