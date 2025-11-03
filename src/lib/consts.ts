import type { Item } from "./mdx";

export const SUPPORTED_LANGS = ["en", "pt"] as const;
export const DEFAULT_LANG = "en";

export type Lang = (typeof SUPPORTED_LANGS)[number];

export type Resume = {
  summary: string[];
  work: Job[];
  education: EducationItem[];
  languages: LanguageItem[];
  skills: string[];
  certifications: CertificationItem[];
};

type CertificationItem = {
  name: string;
  logo?: string;
  link?: string;
};

type Job = {
  title: string;
  period: string;
  company: string;
  place: string;
  description: string;
};

type EducationItem = {
  title: string;
  period: string;
  institution: string;
  place: string;
};

type LanguageItem = {
  flag: string;
  name: string;
  level: string;
};

export type Tag = {
  name: string;
  posts: string[];
};

export const myAge = () => {
  const today = new Date();
  const birthDate = new Date("1997-11-18");
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getAllTags = (posts: Item[]) => {
  const tags: Tag[] = [];

  posts.forEach((post) => {
    post.meta.tags.forEach((tag) => {
      const tagIndex = tags.findIndex((t) => t.name === tag);
      if (tagIndex === -1) {
        tags.push({ name: tag, posts: [post.slug] });
      } else {
        tags[tagIndex].posts.push(post.slug);
      }
    });
  });

  tags.sort((a, b) => {
    if (a.posts.length === b.posts.length) return a.name.localeCompare(b.name);
    return b.posts.length - a.posts.length;
  });

  return tags;
};

export const reduceCounterparts = (counterparts: { [key: string]: string }[] | undefined) => {
  if (!counterparts || !Array.isArray(counterparts) || counterparts.length === 0) return {};
  return counterparts.reduce((acc, currentObject) => {
    const langCode = Object.keys(currentObject)[0];
    acc[langCode] = currentObject[langCode];
    return acc;
  }, {});
};
