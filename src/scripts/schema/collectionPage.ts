import type { Page } from "astro";
import { cleanUrl, getCommonStructuredData } from "~/scripts/schema/common";
import { collectionsConfig, siteConfig } from "~/site.config";

export function createCollectionPage(url: URL, title: string, description: string, page?: Page) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const ids = {
    webpage: `${canonicalUrl}#webpage`,
    /* breadcrumb: `${canonicalUrl}#breadcrumb`, */
    itemList: `${canonicalUrl}#item-list`,
  };

  console.log(page);

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "CollectionPage",
        "@id": ids.webpage,
        inLanguage: siteConfig.language,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: { "@id": commonIds.website },
        /* breadcrumb: { "@id": ids.breadcrumb }, */
        primaryImageOfPage: { "@id": commonIds.ogImage },
        mainEntity: { "@id": ids.itemList },
      },

      // TODO
      /* {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: entry.data.title, item: canonicalUrl },
        ],
      }, */

      {
        "@type": "ItemList",
        "@id": ids.itemList,
        name: `${title} page ${page?.currentPage}`,
        numberOfItems: page ? page.data.length : undefined,
        itemListElement: page
          ? page.data.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: cleanUrl(
                new URL(
                  `${siteConfig.url}${collectionsConfig.permalink_posts_entry}${p.data.slug}`,
                ),
              ),
              name: p.data.title,
            }))
          : undefined,
      },
    ],
  };
}

export default { createCollectionPage };
