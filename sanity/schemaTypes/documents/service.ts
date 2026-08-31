import { defineType, defineField } from 'sanity';
import { orderRankField } from '@sanity/orderable-document-list';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    orderRankField({ type: 'service', hidden: true }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short teaser shown on cards and listing pages.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'price',
      title: 'Price (£)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'priceUnit',
      title: 'Price type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Flat rate', value: 'flat' },
          { title: 'Per day', value: 'per_day' },
        ],
      },
      initialValue: 'flat',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'specialised',
      title: 'Specialised',
      type: 'boolean',
      initialValue: false,
      description:
        'Specialised services appear in the "Specialised Services" section on both the homepage and the Services page.',
    }),
    defineField({
      name: 'relatedBlogPosts',
      title: 'Related blog posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      description:
        'Optional — shown as a "From the blog" section on this service\'s page. Leave empty to hide.',
    }),
    defineField({
      name: 'enquiryHeading',
      title: 'Enquiry form heading',
      type: 'string',
      description:
        'Heading above the contact form on this service\'s page. Defaults to "Enquire about {Service name}" if left blank.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'heroImage' },
  },
});
