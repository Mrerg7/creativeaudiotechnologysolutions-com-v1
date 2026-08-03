import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Pure static site for Cloudflare Workers Static Assets
// No adapter required — assets-only deploy via wrangler.toml
export default defineConfig({
  site: 'https://creativeaudiotechnologysolutions.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // we control base in global.css
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
  output: 'static',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
