import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { projectId, dataset, apiVersion } from '@/lib/sanity/env';
import { schemaTypes } from '@/sanity/schemaTypes';
import { structure } from '@/sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Steele Summits',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
