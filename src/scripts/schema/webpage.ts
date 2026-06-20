import { siteConfig } from "~/site.config";
import { cleanUrl, getCommonStructuredData } from "~/scripts/schema/common";

export function createWebpage(url: URL, title: string, description: string) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const ids = {
    webpage: `${canonicalUrl}#webpage`,
    /* breadcrumb: `${canonicalUrl}#breadcrumb`, */
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "WebPage",
        "@id": ids.webpage,
        inLanguage: siteConfig.language,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: { "@id": commonIds.website },
        /* breadcrumb: { "@id": ids.breadcrumb }, */
        primaryImageOfPage: { "@id": commonIds.ogImage },
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
    ],
  };
}

export default { createWebpage };
