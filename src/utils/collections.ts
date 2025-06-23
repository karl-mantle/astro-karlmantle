import { type DataEntryMap, getCollection } from 'astro:content';
import type { MarkdownHeading } from 'astro';

interface tocHeading extends MarkdownHeading {
  subheadings: tocHeading[];
}

type Terms = {
  count?: number,
  name: string,
  slug: string,
  type?: string
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export const getTableOfContents = (headings: MarkdownHeading[]): tocHeading[] => {
  const toc: tocHeading[] = [];
  const parentHeadings = new Map<number, tocHeading>();

  headings.forEach((h) => {
    const heading: tocHeading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      const parent = parentHeadings.get(heading.depth - 1);
      if (parent) {
        parent.subheadings.push(heading);
      } else {
        toc.push(heading);
      }
    }
  });

  return toc;
};

export const getCategories = async (entryType: keyof DataEntryMap): Promise<Terms[]> => {
  const entries = await getCollection(entryType);
  const categories = new Set(
    entries
      .map((entry) => entry.data.category)
  );

  const categoriesArray = Array.from(categories).map((category) => ({
    name: category,
    slug: slugify(category),
    type: 'category'
  }));

  return categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const getTags = async (entryType: keyof DataEntryMap): Promise<Terms[]> => {
  const entries = await getCollection(entryType);
  const tags = new Set(
    entries
      .flatMap((entry) => entry.data.tags)
  );

  const tagsArray = Array.from(tags).map((tag) => ({
    name: tag,
    slug: slugify(tag),
    type: 'tag'
  }));

  return tagsArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const getTagsCount = async (entryType: keyof DataEntryMap): Promise<Terms[]> => {
  const entries = await getCollection(entryType);
  const tagList: { name: string; count: number }[] = [];

  entries.forEach((entry) => {
    entry.data.tags.forEach((tag: string) => {
      const existing = tagList.find(t => t.name === tag);
      if (existing) {
        existing.count += 1;
      } else {
        tagList.push({ name: tag, count: 1 });
      }
    });
  });

  const tagsArray = tagList.map(tag => ({
    name: tag.name,
    slug: slugify(tag.name),
    count: tag.count
  }));

  return tagsArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const getTerms = async (entryType: keyof DataEntryMap): Promise<Terms[]> => {
  const categories = await getCategories(entryType);
  const tags = await getTags(entryType);
  const termsArray = categories.concat(tags);

  return termsArray.sort((a, b) => a.name.localeCompare(b.name));
};

export const getEntries = async (entryType: keyof DataEntryMap, max?: number) => {
  return (await getCollection(entryType))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, max)
};

export const getEntriesByCategory = async (entryType: keyof DataEntryMap, category: string, max?: number) => {
  return (await getCollection(entryType))
    .filter((entry) => entry.data.category.includes(category))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, max)
};

export const getEntriesByTag = async (entryType: keyof DataEntryMap, tag: string, max?: number) => {
  return (await getCollection(entryType))
    .filter((entry) => entry.data.tags.includes(tag))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, max)
};

export const tagStyles: Record<string, { color: string, icon?: string }> = {
  astro: { color: 'bg-purple-600 text-white', icon: 'simple-icons:astro' },
  javascript: { color: 'bg-yellow-300 text-black', icon: 'simple-icons:javascript' },
  typescript: { color: 'bg-blue-300 text-black', icon: 'simple-icons:typescript' },
  css: { color: 'bg-pink-300 text-black', icon: 'simple-icons:css3' },
  html: { color: 'bg-orange-300 text-black', icon: 'simple-icons:html5' },
  react: { color: 'bg-cyan-200 text-black', icon: 'simple-icons:react' },
};