// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';


// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  redirects: {
    '/bog-mats/dura-base-matting': '/products/dura-base'
  }
});