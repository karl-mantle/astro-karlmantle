import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { slugify } from './utils/collections';

const author = defineCollection({
  loader: glob({ base: './src/content/author', pattern: '**/*.yaml' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string().optional()
      })
    .optional(),
    pubDate: z.coerce.date(),
    category: z.string().default('Uncategorised'),
    tags: z.array(z.string()).default([])
  }),
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    author: reference('author').default('default'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string().optional()
      })
      .optional(),
    imageAttribution: z
      .object({
        name: z.string(),
        url: z.string().url()
      })
      .optional(),
    category: z.string().default('Uncategorised'),
    tags: z.array(z.string()).default([]),
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
    description: z.string().optional(),
    slug: z.string().optional(),
    author: reference('author').default('default'),
    pubDate: z.coerce.date(),
    image: z
      .object({
        src: image(),
        alt: z.string().optional()
      })
      .optional(),
    category: z.string().default('Uncategorised'),
    tags: z.array(z.string()).default([]),
    repoUrl: z.string().url(),
    liveUrl: z.string().url(),
    gallery: z.array(z
      .object({
        src: image(),
        alt: z.string().optional()
      }).optional())
      .default([]),
  }).refine((data) => {
    if (!data.slug) {
      data.slug = slugify(data.title)
    }
    return true;
  }),
});

export const collections = { author, posts, projects };
