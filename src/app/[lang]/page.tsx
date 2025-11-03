import FaceImage from "@/components/FaceImage";
import { Lang, SUPPORTED_LANGS } from "@/lib/consts";
import { getLang } from "@/lib/cookies";

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const language = await getLang(lang);

  const mod = await import(`@/content/${language}/home.mdx`);
  const Component = mod.default;

  return (
    <section className="w-full max-w-small-box mx-auto px-6 pt-28 pb-8 lg:pb-16 flex-1 flex flex-col justify-center gap-4">
      <div className={`w-full rounded-full flex justify-center`}>
        <FaceImage />
      </div>
      <div className="prose prose-invert prose-h2:my-8 prose-ul:my-0">
        <Component />
      </div>
    </section>
  );
}
