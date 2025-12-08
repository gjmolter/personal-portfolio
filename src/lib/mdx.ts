"use server";

import glob from "fast-glob";
import path from "path";
import type { ComponentType } from "react";
import { Lang } from "./consts";

export type PostType = "blog" | "portfolio" | "store";

export type BaseMeta = {
  title: string;
  description: string;
  image: string;
  date: string;
  excerpt: string;
  tags: string[];
  counterparts?: {
    [key in Lang]: string;
  }[];
  company?: string;
};

export type Item = {
  slug: string;
  meta: BaseMeta;
};

export type ItemWithComponent = Item & {
  Component: ComponentType<unknown>;
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export async function loadEntries(postType: PostType, lang: Lang): Promise<Item[]> {
  const files = await glob(`${CONTENT_ROOT}/${lang}/${postType}/*.mdx`);

  const items = await Promise.all(
    files.map(async (absPath) => {
      const slug = path.basename(absPath, ".mdx");
      const mod = await import(`@/content/${lang}/${postType}/${slug}.mdx`);
      const meta = { ...(mod.frontmatter ?? mod.metadata), slug };
      return { slug, meta } as Item;
    })
  );

  items.sort((a, b) => {
    const dateA = a.meta.date ? new Date(a.meta.date).getTime() : -Infinity;
    const dateB = b.meta.date ? new Date(b.meta.date).getTime() : -Infinity;
    return dateB - dateA;
  });
  return items;
}

export async function loadSlugs(postType: PostType, lang: Lang): Promise<string[]> {
  const files = await glob(`${CONTENT_ROOT}/${lang}/${postType}/*.mdx`);
  return files.map((file) => path.basename(file, ".mdx"));
}

export async function loadEntry(slug: string, postType: PostType, lang: Lang): Promise<ItemWithComponent> {
  const mod = await import(`@/content/${lang}/${postType}/${slug}.mdx`);
  const meta = { ...(mod.frontmatter ?? mod.metadata), slug };
  return { slug, Component: mod.default, meta } as ItemWithComponent;
}
