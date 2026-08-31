import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Breadcrumbs,
  Button,
  CardMedia,
  ShareButtons,
  Stack,
  Text,
} from '@/components/ui';
import { CTASection, Section } from '@/components/layout';
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer';
import {
  getBlogPostSlugs,
  getBlogPostBySlug,
  getSiteSettings,
} from '@/lib/sanity/fetchers';
import { buildMetadata } from '@/lib/sanity/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const slugs = await getBlogPostSlugs();
  return slugs.map(slug => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const [post, siteSettings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: post?.seo,
    fallbackTitle: post?.title ?? 'Blog',
    fallbackDescription: post?.excerpt,
    path: `/blog/${slug}`,
    siteSettings,
  });
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const [post, siteSettings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Section $background="default">
        <Stack $gap="6" style={{ maxWidth: 720, marginInline: 'auto' }}>
          <Breadcrumbs
            items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
          />
          <Stack $gap="3">
            <Text $variant="h1" as="h1">
              {post.title}
            </Text>
            <Text $variant="caption" $color="muted">
              {formatDate(post.publishedAt)}
            </Text>
          </Stack>
          <CardMedia
            image={post.heroImage}
            fallbackLabel={post.title}
            $ratio="16 / 9"
          />
          <PortableTextRenderer value={post.body} />
          <ShareButtons
            url={new URL(`/blog/${slug}`, SITE_URL).toString()}
            title={post.title}
          />
        </Stack>
      </Section>

      <CTASection
        heading={siteSettings?.ctaHeading ?? 'Ready to get outdoors?'}
        body={
          siteSettings?.ctaBody ??
          'Book a guided walk or a yoga session and start moving at your own pace.'
        }
        actions={
          <Link href="/contact">
            <Button $variant="secondary" $size="lg">
              Get in touch
            </Button>
          </Link>
        }
      />
    </>
  );
};

export default BlogPostPage;
