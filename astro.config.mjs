// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/site.config";
import favicons from "astro-favicons";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
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
    favicons({
      name: siteConfig.name,
      short_name: siteConfig.short_name,
      appleStatusBarStyle: "black-translucent",
      themes: ["#000", "#fff"],
      background: "#fff",
      manifest: {
        start_url: siteConfig.url,
        orientation: "any",
        display: "standalone",
        display_override: ["window-controls-overlay", "minimal-ui"],
      },
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        windows: false,
        yandex: false,
      },
      loadManifestWithCredentials: false,
      manifestRelativePaths: false,
      manifestMaskable: false,
      cacheBustingQueryParam: null,
      pixel_art: false,
      output: {
        images: true,
        files: true,
        html: true,
      },
      version: "1.0.0",
    }),
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
    partytown(),
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
