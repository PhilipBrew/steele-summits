import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Steele Summit',
  short_name: 'Steele Summit',
  description:
    'Guided mountain walking and outdoor yoga across the Lake District and Northumberland.',
  start_url: '/',
  display: 'standalone',
  background_color: '#F7F5EF',
  theme_color: '#3A5A40',
  icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
});

export default manifest;
