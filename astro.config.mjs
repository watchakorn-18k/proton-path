// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages project site at /proton-path/
const BASE = '/proton-path';

// Prefix absolute /images/* references in markdown with the deploy base
// so blog post images resolve under the subpath instead of the domain root.
function rehypeBasePrefix() {
  return (tree) => {
    const walk = (node) => {
      if (
        node.tagName === 'img' &&
        typeof node.properties?.src === 'string' &&
        node.properties.src.startsWith('/images/')
      ) {
        node.properties.src = BASE + node.properties.src;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://watchakorn-18k.github.io',
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeBasePrefix]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
