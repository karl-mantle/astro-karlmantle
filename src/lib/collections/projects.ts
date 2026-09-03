import { getCollection } from "astro:content";
import slugify from "slugify";

type Terms = {
  count?: number;
  label: string;
  slug: string;
  type: string;
};

export const getProjects = async (max?: number) => {
  return (await getCollection("projects"))
    .filter((entry) =>
      import.meta.env.PUBLIC_SITE_ENV === "production" ? !entry.data.draft : true,
    )
    .sort((a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf())
    .slice(0, max);
};

export const getProjectsByCategory = async (category: string, max?: number) => {
  return (await getProjects(max))
    .filter((entry) => entry.data.category.includes(category))
    .slice(0, max);
};

export const getProjectsByTag = async (tag: string, max?: number) => {
  return (await getProjects(max)).filter((entry) => entry.data.tags.includes(tag)).slice(0, max);
};

export const getProjectsCategories = async (): Promise<Terms[]> => {
  const projects = await getProjects();
  const categories = new Set(projects.map((entry) => entry.data.category));

  const categoriesArray = Array.from(categories).map((category) => ({
    label: category,
    slug: slugify(category, { lower: true }),
    type: "category",
  }));

  return categoriesArray.sort((a, b) => a.label.localeCompare(b.label));
};

export const getProjectsTags = async (): Promise<Terms[]> => {
  const projects = await getProjects();
  const tags = new Set(projects.flatMap((entry) => entry.data.tags));

  const tagsArray = Array.from(tags).map((tag) => ({
    label: tag,
    slug: slugify(tag, { lower: true }),
    type: "tag",
  }));

  return tagsArray.sort((a, b) => a.label.localeCompare(b.label));
};

export const getProjectsTerms = async (): Promise<Terms[]> => {
  const projectsCategories = await getProjectsCategories();
  const projectsTags = await getProjectsTags();
  const projectsTermsArray = projectsCategories.concat(projectsTags);

  return projectsTermsArray.sort((a, b) => a.label.localeCompare(b.label));
};

export const getProjectsTagsCount = async (): Promise<Terms[]> => {
  const projects = await getProjects();
  const projectsTagList: { label: string; count: number }[] = [];

  projects.forEach((post) => {
    post.data.tags.forEach((tag: string) => {
      const existing = projectsTagList.find((t) => t.label === tag);
      if (existing) {
        existing.count += 1;
      } else {
        projectsTagList.push({ label: tag, count: 1 });
      }
    });
  });

  const projectsTagsArray = projectsTagList.map((tag) => ({
    count: tag.count,
    label: tag.label,
    slug: slugify(tag.label, { lower: true }),
    type: "tag",
  }));

  return projectsTagsArray.sort((a, b) => a.label.localeCompare(b.label));
};
