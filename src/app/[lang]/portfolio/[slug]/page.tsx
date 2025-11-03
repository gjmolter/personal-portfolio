import { loadEntry, loadSlugs } from "@/lib/mdx";
import { getLang } from "@/lib/cookies";
import { reduceCounterparts, SUPPORTED_LANGS, Lang } from "@/lib/consts";
import SafeImage from "@/components/SafeImage";
import BackButton from "@/components/BackButton";
import PostContent from "@/components/PostContent";
import Button from "@/components/Button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

const dictionary = {
  en: {
    workingAt: "While working at",
    seeProject: "See Project",
  },
  pt: {
    workingAt: "Enquanto trabalhava na",
    seeProject: "Ver Projeto",
  },
} as const;

export async function generateStaticParams() {
  const allParams = [];
  for (const lang of SUPPORTED_LANGS) {
    const slugs = await loadSlugs("portfolio", lang);
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
  const { meta } = await loadEntry(slug, "portfolio", language);
  const url = "https://gabrielmolter.com";
  const pageUrl = `${url}/${language}/portfolio/${slug}`;
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
            acc[l] = `${url}/${l}/portfolio/${counterpart[l]}`;
          }
        }
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      type: "website",
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
  const { Component, meta } = await loadEntry(slug, "portfolio", lang);
  const dict = dictionary[lang];
  const formattedDate = meta.date
    ? new Date(meta.date + "T00:00:00.000Z").toLocaleDateString(lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
      })
    : undefined;
  const url = (meta as typeof meta & { url?: string }).url;

  const counterparts = reduceCounterparts(meta.counterparts);

  return (
    <div className="w-full max-w-boxed mx-auto px-4 sm:px-6 pt-16 md:pt-28 flex flex-col pb-16">
      <div id="lang-counterparts" data-counterparts={JSON.stringify(counterparts)} className="hidden" />
      <BackButton className="mb-6" href={`/${lang}/portfolio`} />
      <div className="flex gap-8 md:gap-12 mb-12 md:mb-16 max-lg:flex-col">
        <div className="flex-1 relative min-h-[250px] sm:min-h-[300px] bg-white/5 rounded-lg p-4 border border-white/30">
          <SafeImage
            src={meta.image}
            alt={meta.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain object-center rounded-lg"
            style={{ viewTransitionName: `portfolio-image-${slug}` }}
            priority={true}
          />
        </div>
        <div className="flex-[1.2] flex flex-col justify-center prose prose-invert">
          {formattedDate && (
            <time dateTime={meta.date} className="text-sm text-gray-300 mb-4 md:mb-6">
              {formattedDate}
            </time>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black italic text-orange mb-4 md:mb-6 text-balance">
            {meta.title}
          </h1>
          {meta.company && meta.company.length > 0 && (
            <span className="glass text-xs sm:text-sm font-semibold ring-orange/50 ring-1 text-orange px-2 py-1 rounded-md mb-3 md:mb-4 max-w-fit">
              {dict.workingAt} {meta.company}
            </span>
          )}
          <p className="text-lightgray max-w-xl text-balance mb-4 text-sm sm:text-base">{meta.description}</p>
          {url && (
            <Button href={url} variant="primary" className="self-start mt-4 no-underline text-sm sm:text-base">
              {dict.seeProject}
              <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
      <PostContent>
        <Component />
      </PostContent>
    </div>
  );
}
