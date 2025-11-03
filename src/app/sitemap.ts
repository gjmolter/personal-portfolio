import { MetadataRoute } from "next";
import { SUPPORTED_LANGS } from "@/lib/consts";
import { loadSlugs } from "@/lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gabrielmolter.com";
  const routes: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    routes.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }

  const staticPages = ["contact", "resume", "portfolio", "blog", "store"];
  for (const lang of SUPPORTED_LANGS) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("blog", lang);
    for (const slug of slugs) {
      routes.push({
        url: `${baseUrl}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
  }

  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("portfolio", lang);
    for (const slug of slugs) {
      routes.push({
        url: `${baseUrl}/${lang}/portfolio/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
  }

  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("store", lang);
    for (const slug of slugs) {
      routes.push({
        url: `${baseUrl}/${lang}/store/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.6,
      });
    }
  }

  return routes;
}
