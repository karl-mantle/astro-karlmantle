import type { CollectionEntry } from 'astro:content';

export function createSchema (authorData: CollectionEntry<'author'>['data'], description: string, pageUrl: URL, postData: CollectionEntry<'posts'>['data'], schemaType: string, title: string) {

  let schema;

  switch (schemaType) {
    case 'WebPage':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: pageUrl,
      }
      break;
    case 'Article':
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: postData.title,
        description: postData.description,
        datePublished: postData.pubDate.toISOString(),
        dateModified: postData.updatedDate?.toISOString() ?? undefined,
        url: pageUrl,
        thumbnailUrl: postData.image?.src.src,
        image: {
          "@type": "ImageObject",
          url: postData.image?.src.src,
          width: postData.image?.src.width,
          height: postData.image?.src.height,
          caption: postData.image?.alt,
        },
        author: {
          "@type": "Person",
          name: authorData?.title ?? undefined,
          description: authorData?.description  ?? undefined
        },
      }
      break;
    default:
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: title,
        url: pageUrl,
      }
      break;
  }

  return schema
};

export default {
  createSchema
};
