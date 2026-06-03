import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string(),
    id: z.number(),
    location: z.string(),
    difficulty: z.string(),
    name: z.string(),
    nameEn: z.string(),
    coords: z.tuple([z.number(), z.number()]),
  }),
});

export const collections = { blog };
