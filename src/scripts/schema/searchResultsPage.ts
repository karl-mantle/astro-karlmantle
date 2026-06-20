import { siteConfig } from "~/site.config";
import { cleanUrl, getCommonStructuredData } from "~/scripts/schema/common";

export function createSearchResultPage(url: URL, title: string) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const webpageId = `${canonicalUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "SearchResultsPage",
        "@id": webpageId,
        inLanguage: siteConfig.language,
        url: canonicalUrl,
        name: title,
        isPartOf: { "@id": commonIds.website },
        primaryImageOfPage: { "@id": commonIds.ogImage },
        about: { "@id": commonIds.website },
      },
    ],
  };
}

export default { createSearchResultPage };
