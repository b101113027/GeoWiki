// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://b101113027.github.io/GeoWiki/
export default defineConfig({
  site: 'https://b101113027.github.io',
  base: '/GeoWiki',
  output: 'static',
  trailingSlash: 'always',
});
