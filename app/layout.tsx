import type { Metadata, Viewport } from 'next';
import { Source_Serif_4, Karla } from 'next/font/google';

// Source Serif 4 over Fraunces: sturdier and more utilitarian-editorial,
// which suits a safety-led guiding brand better than Fraunces' display
// quirk. Variable weight axis so headings can use real mid-weights, and an
// optical-size axis so large display text tightens automatically.
const headingFont = Source_Serif_4({
  variable: '--font-heading',
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
});

const bodyFont = Karla({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === 'true';

export const viewport: Viewport = {
  themeColor: '#3A5A40',
};

export const metadata: Metadata = {
  title: 'Steele Summit',
  description:
    'Steele Summit: guided mountain walking and outdoor yoga across the Lake District and Northumberland.',
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
