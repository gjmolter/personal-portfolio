import { loadEntry, loadSlugs } from "@/lib/mdx";
import { reduceCounterparts, SUPPORTED_LANGS, Lang } from "@/lib/consts";
import { getLang } from "@/lib/cookies";
import SafeImage from "@/components/SafeImage";
import BackButton from "@/components/BackButton";
import PostContent from "@/components/PostContent";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const allParams = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("blog", lang);
    for (const slug of slugs) {
      allParams.push({ lang, slug });
    }
  }
  return allParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const language = await getLang(lang);
  const { meta } = await loadEntry(slug, "blog", language);
  const url = "https://gabrielmolter.com";
  const pageUrl = `${url}/${language}/blog/${slug}`;
  const imageUrl = meta.image.startsWith("http") ? meta.image : `${url}${meta.image}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
      languages: SUPPORTED_LANGS.reduce((acc, l) => {
        if (meta.counterparts && meta.counterparts.length > 0) {
          const counterpart = meta.counterparts.find((c) => c[l]);
          if (counterpart && counterpart[l]) {
            acc[l] = `${url}/${l}/blog/${counterpart[l]}`;
          }
        }
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      type: "article",
      publishedTime: meta.date ? `${meta.date}T00:00:00.000Z` : undefined,
      images: [{ url: imageUrl }],
      locale: language === "en" ? "en_US" : "pt_BR",
      alternateLocale: language === "en" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const { Component, meta } = await loadEntry(slug, "blog", lang);
  const counterparts = reduceCounterparts(meta.counterparts);
  const formattedDate = meta.date
    ? new Date(meta.date + "T00:00:00.000Z").toLocaleDateString(lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
      })
    : undefined;
  return (
    <div className="w-full max-w-boxed mx-auto px-6 pt-16 md:pt-28 flex flex-col pb-16">
      <div id="lang-counterparts" data-counterparts={JSON.stringify(counterparts)} className="hidden" />
      <BackButton className="mb-6" href={`/${lang}/blog`} />
      <div className="flex gap-12 mb-16 max-lg:flex-col-reverse">
        <div className="flex-1 relative min-h-[300px]">
          <SafeImage
            src={meta.image}
            alt={meta.title}
            fill
            sizes="(max-width: 460px) 100vw, 50vw"
            className="object-cover object-center rounded-lg"
            style={{ viewTransitionName: `blog-image-${slug}` }}
            priority={true}
          />
        </div>
        <div className="flex-[1.2] flex flex-col justify-center prose prose-invert">
          <time dateTime={meta.date} className="text-sm text-gray-300 mb-6">
            {formattedDate}
          </time>
          <h1 className="text-3xl md:text-4xl font-black italic text-orange mb-6 text-balance">{meta.title}</h1>
          <p className="text-lightgray max-w-xl text-balance">{meta.description}</p>
        </div>
      </div>
      <PostContent>
        <Component />
      </PostContent>
    </div>
  );
}
