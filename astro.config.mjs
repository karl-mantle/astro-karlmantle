// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/site.config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  integrations: [
    icon({
      iconDir: "src/images/svg",
      include: {
        "simple-icons": ["github", "linkedin", "rss"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
