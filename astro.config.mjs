// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.karlmantle.com",
  integrations: [
    icon({
      iconDir: "src/assets/icons",
      // add used icons here https://www.astroicon.dev/reference/configuration
    }),
    mdx(),
    robotsTxt({
      policy: [{
        userAgent: '*',
        disallow: '/'
      }]
    }),
    sitemap(),
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [tailwindcss()]
  }
});
