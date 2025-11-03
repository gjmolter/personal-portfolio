import { loadEntries } from "@/lib/mdx";
import { getLang } from "@/lib/cookies";
import { getAllTags, Lang, SUPPORTED_LANGS, Tag } from "@/lib/consts";
import PostList from "@/components/PostList";
import type { Metadata } from "next";

const dictionary = {
  pt: {
    title: "Lojinha",
  },
  en: {
    title: "Garage Sale",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang: Lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const language = await getLang(lang);
  const url = "https://gabrielmolter.com";
  const pageUrl = `${url}/${language}/store`;

  const translations = {
    en: {
      title: "Garage Sale",
      description: "Stuff I'm selling. Electronics, gadgets, books and more. Check out what's available!",
    },
    pt: {
      title: "Lojinha",
      description: "Coisas que estou vendendo. Eletrônicos, gadgets, livros e mais. Veja o que está disponível!",
    },
  };

  const meta = translations[language];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${url}/en/store`,
        pt: `${url}/pt/store`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      type: "website",
      locale: language === "en" ? "en_US" : "pt_BR",
      alternateLocale: language === "en" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function StorePage({
  params,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const searchParams = await searchParamsPromise;
  const language = await getLang(lang);
  const dict = dictionary[language];
  const products = await loadEntries("store", language);
  const tags = getAllTags(products);

  const tagName = typeof searchParams?.tag === "string" ? searchParams.tag : undefined;
  const decodedTagName = decodeURIComponent((tagName || "").replace(/\+/g, " "));
  const initialSelectedTags: Tag[] = decodedTagName ? tags.filter((t) => t.name === decodedTagName) : [];

  return (
    <section className="w-full max-w-boxed mx-auto px-6 pt-16 md:pt-28 flex flex-col gap-8 pb-4">
      <h1 className="text-3xl md:text-4xl font-black italic text-orange mb-6">{dict.title}</h1>
      <PostList posts={products} tags={tags} type="store" initialSelectedTags={initialSelectedTags} />
    </section>
  );
}
