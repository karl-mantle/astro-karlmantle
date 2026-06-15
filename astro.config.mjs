// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./src/site.config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});