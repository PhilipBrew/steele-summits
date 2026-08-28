import NextImage, { type ImageProps as NextImageProps } from 'next/image';

import { urlFor } from '@/lib/sanity/image';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

export interface SanityImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
  image: SanityImageWithAlt;
  alt?: string;
}

export const SanityImage = ({ image, alt, ...props }: SanityImageProps) => (
  <NextImage
    src={urlFor(image).auto('format').url()}
    alt={alt ?? image.alt ?? ''}
    {...props}
  />
);
