import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lang, SUPPORTED_LANGS } from "@/lib/consts";
import LangProvider from "@/components/hooks/LangProvider";
import LangSwitcher from "@/components/LangSwitcher";
import SkipToContent from "@/components/SkipToContent";
import Script from "next/script";
import { getLang } from "@/lib/cookies";

const metadataTranslations = {
  en: {
    title: "Gabriel Molter | Full-Stack Developer",
    description:
      "Full-Stack Developer in Vancouver with a passion for FOSS and the impact of technology on society. I build websites and digital solutions.",
    titleTemplate: "%s | Gabriel Molter",
  },
  pt: {
    title: "Gabriel Molter | Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack em Vancouver com paixão por FOSS e pelo impacto da tecnologia na sociedade. Eu construo sites e soluções digitais.",
    titleTemplate: "%s | Gabriel Molter",
  },
};

const url = "https://gabrielmolter.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const language = await getLang(lang as Lang);
  const meta = metadataTranslations[language];
  const pageUrl = `${url}/${language}`;

  return {
    metadataBase: new URL(url),
    title: {
      template: meta.titleTemplate,
      default: meta.title,
    },
    description: meta.description,
    authors: [{ name: "Gabriel Molter" }],
    creator: "Gabriel Molter",
    publisher: "Gabriel Molter",
    keywords: [
      "Full-Stack Developer",
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Vancouver",
      "Canada",
      "Brasil",
      "Brazil",
      "FOSS",
      "Open Source",
      "Digital Solutions",
    ],
    alternates: {
      canonical: pageUrl,
      languages: SUPPORTED_LANGS.reduce((acc, l) => {
        acc[l] = `${url}/${l}`;
        return acc;
      }, {} as Record<string, string>),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: pageUrl,
      siteName: "Gabriel Molter",
      images: [
        { url: `${url}/img/og.webp`, width: 791, height: 414, alt: "Gabriel Molter - Full-Stack Developer" },
        { url: `${url}/img/og.png`, width: 791, height: 414, alt: "Gabriel Molter - Full-Stack Developer" },
      ],
      type: "website",
      locale: language === "en" ? "en_US" : "pt_BR",
      alternateLocale: language === "en" ? "pt_BR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${url}/img/og.webp`, `${url}/img/og.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#070b24",
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const language = await getLang(lang as Lang);

  return (
    <LangProvider lang={language}>
      <SkipToContent />
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen w-full flex flex-col items-center transition-all duration-300 max-md:ml-0! max-md:w-full! pb-32 md:pb-16 xl:pb-1"
        style={{
          marginLeft: "var(--navbar-width)",
          width: "calc(100% - var(--navbar-width))",
        }}
      >
        <div className="flex-1 w-full flex flex-col pb-8">{children}</div>
        <Footer />
        <LangSwitcher />
      </main>
      <Script
        defer
        src="https://nosy.cpbr.digital/script.js"
        data-website-id="4e117b3d-c4e3-4934-bea5-0a3d0adc733e"
      ></Script>
    </LangProvider>
  );
}
