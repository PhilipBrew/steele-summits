import type { StructureResolver } from 'sanity/structure';

// Default document-type list for now — singleton pages get pinned here in Phase 3.
export const structure: StructureResolver = S =>
  S.list().title('Content').items(S.documentTypeListItems());
