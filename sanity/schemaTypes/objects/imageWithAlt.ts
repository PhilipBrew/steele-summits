import { defineType, defineField } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for screen readers and search engines.',
      validation: Rule =>
        Rule.custom((alt, context) => {
          const hasImage = Boolean(
            (context.parent as { asset?: unknown })?.asset,
          );
          if (hasImage && !alt) {
            return 'Alt text is required when an image is set';
          }
          return true;
        }),
    }),
  ],
});
