import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import slugify from "slugify";

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z
      .object({
        author: z.string().optional(),
        category: z.string().default("Uncategorised"),
        description: z.string().min(15).max(160),
        draft: z.boolean().default(false),
        slug: z.string().optional(),
        image: z
          .object({
            src: image(),
            alt: z.string().nullable().default(null),
          })
          .optional(),
        imageAttribution: z
          .object({
            name: z.string().optional(),
            url: z.url().optional(),
          })
          .optional(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        title: z.string().min(5).max(120),
        updatedDate: z.coerce.date().optional(),
      })
      .refine((data) => {
        if (!data.slug) {
          data.slug = slugify(data.title, { lower: true });
        }
        return true;
      }),
});

export const collections = { posts };
