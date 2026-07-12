import { getSiteUrl } from "./scripts/domain";

export const domainConfig = {
  development: {
    site: "http://localhost:4321/",
  },
  ci: {
    site: "http://localhost:4321/",
  },
  staging: {
    site: "https://karlmantle-staging.netlify.app/",
  },
  production: {
    site: "https://www.karlmantle.com/",
  },
};

export const siteConfig = {
  url: getSiteUrl(domainConfig),
  name: "Karl Mantle",
  short_name: "karlmantle.com",
  title_separator: "~",
  description:
    "Interested in web development, languages & open source. Project Coordinator @ Itineris, London, UK",
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
  partytown: true,
  bing_verificaton: "",
  google_ga4_id: "",
  google_gtm_id: "",
  google_verification: "",
  umami_id: "1a690b89-e604-4c8d-868c-fba6d7e1c18a",
  umami_source: "https://cloud.umami.is/script.js",
};

export const collectionsConfig = {
  posts_per_page: 6,
  permalink_posts: "blog",
  permalink_posts_entry: "blog/entry/",
  permalink_posts_category: "blog/category/",
  permalink_posts_tag: "blog/tag/",
  projects_per_page: 8,
  permalink_projects: "projects",
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

export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/karlmantle/",
    icon: "simple-icons:linkedin",
    label: "Visit my LinkedIn",
  },
  {
    href: "https://github.com/karl-mantle/",
    icon: "simple-icons:github",
    label: "Visit my GitHub",
  },
  {
    href: "/rss.xml",
    icon: "material-symbols:rss-feed",
    label: "Subscribe to RSS feed",
  },
];
