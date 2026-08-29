import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'e.g. "Guided walk, 2026" or "Hill & Summit Yoga client".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedService',
      title: 'About this service',
      type: 'reference',
      to: [{ type: 'service' }],
      description:
        "Optional — if set, this testimonial can also appear on that service's page.",
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote', media: 'photo' },
  },
});
