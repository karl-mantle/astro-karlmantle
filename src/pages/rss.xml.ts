import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {

  const posts = await getCollection('posts');

  return rss({
    title: "karlmantle.com",
    description: "Karl Mantle's blog",
    site: context.site ?? "https://www.karlmantle.com",
    trailingSlash: false,
    stylesheet: '/rss/pretty-feed-v3.xsl',
    customData: `<language>en-GB</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `https://www.karlmantle.com/blog/${post.data.slug}`,
    })),
  });
}
