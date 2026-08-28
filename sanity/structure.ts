import type { StructureResolver } from 'sanity/structure';

// Singleton document types — one fixed document each, no "create new"/duplicate.
export const SINGLETON_TYPES = new Set([
  'homePage',
  'aboutPage',
  'contactPage',
  'siteSettings',
]);

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export const structure: StructureResolver = S =>
  S.list()
    .title('Content')
    .items([
      singletonListItem(S, 'homePage', 'Home Page'),
      singletonListItem(S, 'aboutPage', 'About Page'),
      singletonListItem(S, 'contactPage', 'Contact Page'),
      singletonListItem(S, 'siteSettings', 'Site Settings'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item => !SINGLETON_TYPES.has(item.getId() ?? ''),
      ),
    ]);
