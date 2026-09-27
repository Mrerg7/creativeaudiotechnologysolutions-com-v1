import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const UPDATED = '2026-09-27';

// Pure static site for Cloudflare Workers Static Assets
export default defineConfig({
  site: 'https://creativeaudiotechnologysolutions.com',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/404.html'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.lastmod = UPDATED;
        if (path === '/') {
          item.changefreq = 'weekly';
          item.priority = 1;
        } else if (path.startsWith('/acquire')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (path.startsWith('/faq')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (path.startsWith('/insights')) {
          item.changefreq = 'monthly';
          item.priority = 0.75;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
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
      assetsInlineLimit: 0,
    },
  },
});
