import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { table } from '@sanity/table';

import { projectId, dataset, apiVersion } from '@/lib/sanity/env';
import { schemaTypes } from '@/sanity/schemaTypes';
import { structure, SINGLETON_TYPES } from '@/sanity/structure';
import { PreviewAction } from '@/sanity/actions/PreviewAction';

export default defineConfig({
  name: 'default',
  title: 'Steele Summit',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    // Registers the global 'table' object type, used as a blockContent
    // array member (see sanity/schemaTypes/objects/blockContent.ts).
    table(),
  ],
  document: {
    actions: (input, context) => {
      const actions = SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(action => action.action !== 'duplicate')
        : input;

      // Appended for every type — PreviewAction hides itself (returns
      // null) for types with no previewable frontend page, or when there's
      // nothing unpublished to preview.
      return [...actions, PreviewAction];
    },
  },
});
