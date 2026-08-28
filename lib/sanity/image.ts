import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';

import { projectId, dataset } from '@/lib/sanity/env';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: Image) => builder.image(source);
