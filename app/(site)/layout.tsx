import { AppProviders } from '@/components/providers/AppProviders';
import { Header, Footer } from '@/components/layout';

const SiteLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <AppProviders>
    <Header />
    <main>{children}</main>
    <Footer />
  </AppProviders>
);

export default SiteLayout;
