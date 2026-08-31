import Image from 'next/image';

// Aspect ratio = viewBox width / height for each file, both in /public/logo/.
const LOGO_VARIANTS = {
  stacked: {
    src: '/logo/steele-summit-dp-05.svg',
    aspectRatio: 1.832,
  },
  horizontal: {
    src: '/logo/steele-summit-dp-05-horizontal.svg',
    aspectRatio: 4.093,
  },
} as const;

export interface LogoProps {
  alt: string;
  height?: number;
  variant?: keyof typeof LOGO_VARIANTS;
}

export const Logo = ({ alt, height = 40, variant = 'stacked' }: LogoProps) => {
  const { src, aspectRatio } = LOGO_VARIANTS[variant];

  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(height * aspectRatio)}
      height={height}
      priority
    />
  );
};
