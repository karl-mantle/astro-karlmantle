import { siteConfig, socialLinks } from "~/site.config";

export function cleanUrl(url: URL) {
  return url.toString().replace(/\/$/, "");
}

export function getCommonStructuredData() {
  const siteUrl = cleanUrl(new URL(siteConfig.url));

  const ids = {
    website: `${siteUrl}#website`,
    organization: `${siteUrl}#organization`,
    logo: `${siteUrl}#logo`,
    ogImage: `${siteUrl}#og-image`,
  };

  const nodes = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      inLanguage: siteConfig.language,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": ids.organization },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      sameAs: socialLinks.map((s) => s.href).filter((href) => !href.endsWith(".xml")) ?? [],
    },

    {
      "@type": "Organization",
      "@id": ids.organization,
      name: siteConfig.name,
      url: siteUrl,
      logo: siteConfig.logo
        ? {
            "@type": "ImageObject",
            "@id": ids.logo,
            url: siteConfig.logo.src,
            contentUrl: siteConfig.logo.src,
            width: siteConfig.logo.width,
            height: siteConfig.logo.height,
            inLanguage: siteConfig.language,
            caption: siteConfig.name,
          }
        : undefined,
      image: {
        "@id": ids.logo,
      },
    },

    {
      "@type": "ImageObject",
      "@id": ids.ogImage,
      inLanguage: siteConfig.language,
      url: siteConfig.ogImage.src,
      contentUrl: siteConfig.ogImage.src,
      width: siteConfig.ogImage.width,
      height: siteConfig.ogImage.height,
      caption: "OpenGraph Image",
    },
  ];

  return {
    ids,
    nodes,
  };
}
