// @ts-check
import { defineConfig } from 'astro/config';

// Static output for GitHub Pages. Set `site` and `base` when the repository URL is known.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
});
