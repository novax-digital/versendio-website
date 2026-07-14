// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://versendio.de',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  build: {
    // Erzeugt /funktionen.html statt /funktionen/index.html –
    // zusammen mit Vercels "cleanUrls" ergibt das saubere URLs ohne Trailing Slash.
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    // Blog-Cover & Mockup-Grafiken werden von Astro in moderne Formate optimiert.
    responsiveStyles: true,
  },
});
