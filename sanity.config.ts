import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { projectId, dataset, apiVersion } from '@/lib/sanity/env';
import { schemaTypes } from '@/sanity/schemaTypes';
import { structure, SINGLETON_TYPES } from '@/sanity/structure';

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
  ],
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(action => action.action !== 'duplicate')
        : input,
  },
});
