import { defineType, defineArrayMember } from 'sanity';

// Shared rich-text body type for service/blog/page copy — the extension point
// for future custom blocks (galleries, callouts, etc.) without a data migration.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: Rule =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'imageWithAlt' }),
    // Registered globally by the `table()` plugin in sanity.config.ts.
    // Cells are plain text only — no bold/links inside a cell.
    defineArrayMember({ type: 'table' }),
  ],
});
