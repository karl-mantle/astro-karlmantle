import type { Page } from "astro";
import type { CollectionEntry, DataEntryMap } from "astro:content";
import { createWebpage } from "~/scripts/schema/webpage";
import { createCollectionPage } from "~/scripts/schema/collectionPage";
import { createSearchResultPage } from "~/scripts/schema/searchResultsPage";
import { createArticle } from "~/scripts/schema/article";

export function createSchema(
  type: string,
  url: URL,
  title: string,
  description: string,
  entry?: DataEntryMap[keyof DataEntryMap][string],
  page?: Page,
) {
  let schema;
  switch (type) {
    case "webpage":
      schema = createWebpage(url, title, description);
      break;
    case "collectionPage":
      schema = createCollectionPage(url, title, description, page);
      break;
    case "searchResultsPage":
      schema = createSearchResultPage(url, title);
      break;
    case "article":
      schema = createArticle(url, title, description, entry as CollectionEntry<"posts">);
      break;
    default:
      break;
  }
  return schema;
}

export default { createSchema };
