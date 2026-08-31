import { AppProviders } from '@/components/providers/AppProviders';
import { SiteChrome } from '@/components/layout';

const SiteLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <AppProviders>
    <SiteChrome>{children}</SiteChrome>
  </AppProviders>
);

export default SiteLayout;
