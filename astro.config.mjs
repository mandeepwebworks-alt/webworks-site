import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
export default defineConfig({
  output: 'static',
  site: 'https://sitegenius.co.nz',
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
