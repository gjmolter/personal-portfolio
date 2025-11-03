import { loadEntry, loadSlugs } from "@/lib/mdx";
import { reduceCounterparts, SUPPORTED_LANGS } from "@/lib/consts";
import { getLang } from "@/lib/cookies";
import SafeImage from "@/components/SafeImage";
import BackButton from "@/components/BackButton";
import PostContent from "@/components/PostContent";

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
