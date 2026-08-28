import { Studio } from './Studio';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

const StudioPage = () => <Studio />;

export default StudioPage;
