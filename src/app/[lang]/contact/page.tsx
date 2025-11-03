import { Lang, SUPPORTED_LANGS } from "@/lib/consts";
import { getLang } from "@/lib/cookies";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = await getLang(lang);
  const url = "https://gabrielmolter.com";
  const pageUrl = `${url}/${language}/contact`;

  const translations = {
    en: {
      title: "Contact Me",
      description: "Get in touch with me. Send me a message and I'll get back to you as soon as possible.",
    },
    pt: {
      title: "Fale Comigo",
      description: "Entre em contato comigo. Envie uma mensagem e responderei o mais rápido possível.",
    },
  };

  const meta = translations[language];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${url}/en/contact`,
        pt: `${url}/pt/contact`,
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
