import { loadEntries } from "@/lib/mdx";
import { getLang } from "@/lib/cookies";
import { getAllTags, Lang, SUPPORTED_LANGS, Tag } from "@/lib/consts";
import PostList from "@/components/PostList";

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang: Lang) => ({ lang }));
}

export default async function BlogPage({
  params,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const searchParams = await searchParamsPromise;
  const language = await getLang(lang);
  const posts = await loadEntries("blog", language);
  const tags = getAllTags(posts);

  const tagName = typeof searchParams?.tag === "string" ? searchParams.tag : undefined;
  const decodedTagName = decodeURIComponent((tagName || "").replace(/\+/g, " "));
  const initialSelectedTags: Tag[] = decodedTagName ? tags.filter((t) => t.name === decodedTagName) : [];

  return (
    <section className="w-full max-w-boxed mx-auto px-6 pt-16 md:pt-28 flex flex-col gap-8 pb-4">
      <h1 className="text-3xl md:text-4xl font-black italic text-orange mb-6">Blog</h1>
      <PostList posts={posts} tags={tags} type="blog" initialSelectedTags={initialSelectedTags} />
    </section>
  );
}
