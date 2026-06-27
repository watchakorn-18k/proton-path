// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://proton-path.wk18k.qzz.io',
  markdown: {},
  vite: {
    plugins: [tailwindcss()]
  }
});
