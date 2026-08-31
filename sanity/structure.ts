import type { StructureResolver } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// Singleton document types — one fixed document each, no "create new"/duplicate.
export const SINGLETON_TYPES = new Set([
  'homePage',
  'aboutPage',
  'servicesPage',
  'blogPage',
  'contactPage',
  'privacyPolicyPage',
  'termsPage',
  'siteSettings',
]);

// Document types with their own dedicated, drag-orderable list item below —
// excluded from the generic catch-all list so they don't show up twice.
const ORDERABLE_TYPES = new Set(['service']);

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      singletonListItem(S, 'homePage', 'Home Page'),
      singletonListItem(S, 'aboutPage', 'About Page'),
      singletonListItem(S, 'servicesPage', 'Services Page'),
      singletonListItem(S, 'blogPage', 'Blog Page'),
      singletonListItem(S, 'contactPage', 'Contact Page'),
      singletonListItem(S, 'privacyPolicyPage', 'Privacy Policy Page'),
      singletonListItem(S, 'termsPage', 'Terms & Conditions Page'),
      singletonListItem(S, 'siteSettings', 'Site Settings'),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'service',
        title: 'Services',
        S,
        context,
      }),
      S.divider(),
      ...S.documentTypeListItems().filter(
        item =>
          !SINGLETON_TYPES.has(item.getId() ?? '') &&
          !ORDERABLE_TYPES.has(item.getId() ?? ''),
      ),
    ]);
