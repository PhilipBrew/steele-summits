import { createClient } from '@sanity/client';

import { projectId, dataset, apiVersion } from '@/lib/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
