import type { Metadata } from 'next';
import { Fraunces, Karla } from 'next/font/google';

const headingFont = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
});

const bodyFont = Karla({
  variable: '--font-body',
  subsets: ['latin'],
});

const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

export const metadata: Metadata = {
  title: 'Steele Summits',
  description:
    'Steele Summits — guided mountain walking and outdoor yoga across the Lake District and Northumberland.',
  robots: isIndexable
    ? undefined
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
    <body>{children}</body>
  </html>
);

export default RootLayout;
