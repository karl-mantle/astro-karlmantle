import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { slugify } from './utils/collections';

const author = defineCollection({
  loader: glob({ base: './src/content/author', pattern: '**/*.yaml' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.string().default('Uncategorised'),
    description: z.string(),
    image: z
      .object({
        src: image(),
        alt: z.string().nullable().default(null)
      })
    .optional(),
    pubDate: z.coerce.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updatedDate: z.coerce.date().optional()
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    author: reference('author').default('default'),
    category: z.string().default('Uncategorised'),
    description: z.string(),
    slug: z.string().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string().nullable().default(null)
      })
      .optional(),
    imageAttribution: z
      .object({
        name: z.string().optional(),
        url: z.string().url().optional()
      })
      .optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    updatedDate: z.coerce.date().optional()
  }).refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.title)
    }
    return true;
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    author: reference('author').default('default'),
    category: z.string().default('Uncategorised'),
    description: z.string(),
    image: z
      .object({
        src: image(),
        alt: z.string().nullable().default(null)
      })
      .optional(),
    gallery: z.array(z
      .object({
        src: image(),
        alt: z.string().nullable().default(null)
      }).optional())
      .default([]),
    pubDate: z.coerce.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updatedDate: z.coerce.date().optional(),
    urls: z
      .object({
        demo: z.string().url().optional(),
        github: z.string().url().optional(),
        steam: z.string().url().optional(),
      })
      .optional(),
  }).refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.title)
    }
    return true;
  }),
});

export const collections = { author, posts, projects };
