import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';

import { projectId, dataset } from '@/lib/sanity/env';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: Image) => builder.image(source);

/**
 * Pulls the real pixel dimensions out of a Sanity asset reference.
 *
 * Refs are shaped `image-<id>-<width>x<height>-<format>`, so the intrinsic
 * size is available without dereferencing the asset. That matters for
 * images inside Portable Text: the body field is projected raw, so there is
 * no `asset->metadata.dimensions` to read, and hardcoding a size means
 * portrait images reserve a landscape box and shove the page down when they
 * load.
 *
 * Returns null for anything that does not match, so callers fall back.
 */
export const dimensionsFromRef = (
  source?: Image,
): { width: number; height: number } | null => {
  const ref = source?.asset?._ref;
  if (!ref) return null;

  const match = /-(\d+)x(\d+)-[a-z]+$/i.exec(ref);
  if (!match) return null;

  const width = Number(match[1]);
  const height = Number(match[2]);
  return Number.isFinite(width) && Number.isFinite(height) && width > 0
    ? { width, height }
    : null;
};
