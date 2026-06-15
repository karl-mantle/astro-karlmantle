/* move to another file */
type Environment = keyof typeof mapEnvDomain;

const getEnv = process.env.ASTRO_ENV ?? "dev";
const mapEnvDomain = {
  dev: {
    site: "http://localhost:4321/",
  },
  ci: {
    site: "http://localhost:4321/",
  },
  prod: {
    site: "https://www.karlmantle.com/",
  },
};
const domain = mapEnvDomain[getEnv as Environment].site;
/* end move to another file */

export const siteConfig = {
  url: domain,
  name: "Karl Mantle",
  short_name: "Karl M",
  title_separator: "~",
  description:
    "My personal website & blog. I write about technology, my projects, and other things that interest me.",
  logo: {
    src: "/logo.webp",
    height: 512,
    width: 512,
  },
  ogImage: {
    src: "/opengraph.webp",
    height: 630,
    width: 1200,
  },
  language: "en-GB",
  date_format: "j F Y",
  footer_text: "Last updated: 15th June 2026",
};

export const collectionsConfig = {
  posts_per_page: 9,
  permalink_posts: "blog",
  permalink_posts_entry: "blog/entry/",
  permalink_posts_category: "blog/category/",
  permalink_posts_tag: "blog/tag/",
};