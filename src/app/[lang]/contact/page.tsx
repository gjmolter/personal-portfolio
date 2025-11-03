import { Lang, SUPPORTED_LANGS } from "@/lib/consts";
import { getLang } from "@/lib/cookies";
import ContactForm from "@/components/ContactForm";

const dictionary = {
  pt: {
    title: "Fale Comigo",
  },
  en: {
    title: "Contact Me",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang: Lang) => ({ lang }));
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const language = await getLang(lang);
  const dict = dictionary[language];

  return (
    <section className="w-full max-w-small-box mx-auto px-6 pt-16 md:pt-28 pb-8 lg:pb-16 flex-1 flex flex-col justify-center gap-4">
      <h1 className="text-3xl md:text-4xl font-black italic text-orange mb-6">{dict.title}</h1>
      <ContactForm />
    </section>
  );
}
