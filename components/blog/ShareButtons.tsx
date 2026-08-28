import { Button, Stack, Text } from '@/components/ui';

export interface ShareButtonsProps {
  url: string;
  title: string;
}

const shareLinks = (url: string, title: string) => [
  {
    label: 'X',
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    label: 'Email',
    href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
];

export const ShareButtons = ({ url, title }: ShareButtonsProps) => (
  <Stack $gap="3">
    <Text $variant="eyebrow" $color="muted">
      Share this
    </Text>
    <Stack $direction="row" $gap="2" $wrap>
      {shareLinks(url, title).map(link => (
        <Button
          key={link.label}
          as="a"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          $variant="outline"
          $size="sm"
        >
          {link.label}
        </Button>
      ))}
    </Stack>
  </Stack>
);
