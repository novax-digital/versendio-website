import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      // Optionale FAQ am Artikelende – wird als FAQPage-Schema (JSON-LD) ausgegeben
      faq: z
        .array(z.object({ q: z.string(), a: z.string() }))
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
