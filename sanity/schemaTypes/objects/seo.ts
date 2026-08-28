import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description:
        'Shown in search results and browser tabs. Falls back to the page heading if left blank.',
      validation: Rule =>
        Rule.max(60).warning(
          'Longer titles may be truncated in search results',
        ),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description:
        'Shown in search results. Falls back to the page summary/excerpt if left blank.',
      validation: Rule =>
        Rule.max(160).warning(
          'Longer descriptions may be truncated in search results',
        ),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'imageWithAlt',
      description:
        'Shown when this page is shared on social media. Falls back to the page hero image if left blank.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
