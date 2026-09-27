import NextImage, { type ImageProps as NextImageProps } from 'next/image';

import { urlFor } from '@/lib/sanity/image';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

export interface SanityImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
  image: SanityImageWithAlt;
  alt?: string;
  /**
   * Ask Sanity for a crop at these dimensions instead of the full image.
   *
   * This is what makes the focal point set in Studio actually count. The
   * image schema has `hotspot: true`, but the hotspot is only applied when
   * the URL requests explicit dimensions. Without it the full frame comes
   * back and CSS `object-fit: cover` centre-crops, so a portrait photo in a
   * landscape frame loses the top and bottom regardless of where the editor
   * placed the focal point.
   */
  cropTo?: { width: number; height: number };
}

export const SanityImage = ({
  image,
  alt,
  cropTo,
  ...props
}: SanityImageProps) => {
  const builder = urlFor(image).auto('format');
  const src = cropTo
    ? builder.width(cropTo.width).height(cropTo.height).fit('crop').url()
    : builder.url();

  return <NextImage src={src} alt={alt ?? image.alt ?? ''} {...props} />;
};
