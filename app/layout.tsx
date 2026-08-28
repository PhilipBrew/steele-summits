import type { Metadata } from 'next';
import { Fraunces, Karla } from 'next/font/google';

import { AppProviders } from '@/components/providers/AppProviders';
import { Header, Footer } from '@/components/layout';

const headingFont = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
});

const bodyFont = Karla({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Steele Summits',
  description:
    'Steele Summits — guided mountain walking and outdoor yoga across the Lake District and Northumberland.',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
    <body>
      <AppProviders>
        <Header />
        <main>{children}</main>
        <Footer />
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
