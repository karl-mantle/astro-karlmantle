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
  staging: {
    site: "https://karlmantle-staging.netlify.app/",
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
  short_name: "karlmantle.com",
  title_separator: "~",
  description:
    "Interested in web development, languages & open source. Project Coordinator @ Itineris, London",
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

export const measurementConfig = {
  partytown: false,
  bing_verificaton: "",
  google_ga4_id: "",
  google_gtm_id: "",
  google_verification: "",
  umami_id: "",
  umami_source: "",
};

export const collectionsConfig = {
  posts_per_page: 6,
  permalink_posts: "blog",
  permalink_posts_entry: "blog/entry/",
  permalink_posts_category: "blog/category/",
  permalink_posts_tag: "blog/tag/",
};

export const imagesConfig = {
  full: {
    sizes: "(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px",
    widths: [480, 1024, 1920],
  },
  half: {
    sizes: "(max-width: 640px) 480px, 960px",
    widths: [480, 960],
  },
  third: {
    sizes: "(max-width: 640px) 480px, 640px",
    widths: [480, 640],
  },
  thumbnail: {
    height: 64,
    width: 64,
  },
};
