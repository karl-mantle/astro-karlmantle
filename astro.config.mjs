// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/site.config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  adapter: netlify(),
  integrations: [
    icon({
      iconDir: "src/images/svg",
      include: {
        "simple-icons": ["linkedin", "github"],
        "material-symbols": [
          "arrow-right-alt",
          "check",
          "content-copy-outline",
          "mail-outline",
          "rss-feed",
          "share",
        ],
      },
    }),
    mdx(),
    react(),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
