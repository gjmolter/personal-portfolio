import TextLink from "@/components/TextLink";
import {
  RocketLaunchIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import LanguageSection from "@/components/LanguageSection";
import { Lang, SUPPORTED_LANGS } from "@/lib/consts";
import { getLang } from "@/lib/cookies";
import DownloadResume from "@/components/DownloadResume";
import type { Metadata } from "next";

const dictionary = {
  en: {
    title: "Resume",
    summary: "Summary",
    workExperience: "Work Experience",
    education: "Education",
    languages: "Languages",
    skills: "Skills",
    microsoft: "Microsoft logo",
    certifications: "Certifications",
  },
  pt: {
    title: "Currículo",
    summary: "Resumo",
    workExperience: "Experiência Profissional",
    education: "Educação",
    languages: "Idiomas",
    skills: "Habilidades",
    microsoft: "Logo da Microsoft",
    certifications: "Certificações",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang: Lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params;
  const language = await getLang(lang);
  const url = "https://gabrielmolter.com";
  const pageUrl = `${url}/${language}/resume`;

  const translations = {
    en: {
      title: "Resume",
      description:
        "My professional resume. My background, work experience, education, skills, certifications and more.",
    },
    pt: {
      title: "Currículo",
      description:
        "Meu currículo profissional. Minha formação, experiência profissional, habilidades, certificações e mais.",
    },
  };

  const meta = translations[language];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${url}/en/resume`,
        pt: `${url}/pt/resume`,
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

export default async function ResumePage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const language = await getLang(lang);
  const resume = await import(`@/content/${language}/resume`).then((mod) => mod.default);
  const dict = dictionary[language];

  return (
    <section className="w-full max-w-small-box mx-auto px-6 pt-16 md:pt-28 flex-1 flex flex-col justify-center gap-4 pb-4">
      <div className="flex flex-row items-center gap-4 mb-6">
        <h1 className="text-3xl md:text-4xl font-black italic text-orange">{dict.title}</h1>
        <DownloadResume lang={language} />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <RocketLaunchIcon className="w-6 h-6 text-orange" aria-hidden="true" />
        <h2 className="text-2xl font-extrabold text-orange">{dict.summary}</h2>
      </div>
      <div className="prose prose-invert prose-h2:my-8 prose-ul:my-0 prose-li:marker:text-orange">
        <ul className="list-disc pl-6 text-lightgray leading-relaxed mb-4">
          {resume.summary.map((item: string, idx: number) => (
            <li key={idx}>
              <strong>{item}</strong>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 mb-2">
          <BriefcaseIcon className="w-6 h-6 text-orange" aria-hidden="true" />
          <h2 className="text-2xl font-extrabold text-orange">{dict.workExperience}</h2>
        </div>
        <ul className="list-disc pl-6 text-lightgray leading-relaxed mb-4">
          {resume.work.map(
            (
              job: {
                title: string;
                period: string;
                company: string;
                place: string;
                description: string;
              },
              idx: number
            ) => (
              <li key={idx} className={idx !== resume.work.length - 1 ? "mb-6 pb-4 border-b border-gray-700" : ""}>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2 max-md:mb-2">
                  <strong>{job.title}</strong>
                  <span className="hidden md:inline">|</span>
                  <span className="text-lightgray">{job.period}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <strong>{job.company}</strong>
                  <span className="hidden md:inline">|</span>
                  <span className="text-lightgray">{job.place}</span>
                </div>
                <p className="mb-2">{job.description}</p>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-2 mb-2">
          <AcademicCapIcon className="w-6 h-6 text-orange" aria-hidden="true" />
          <h2 className="text-2xl font-extrabold text-orange">{dict.education}</h2>
        </div>
        <ul className="listResume list-disc pl-6 text-lightgray leading-relaxed mb-4">
          {resume.education.map(
            (
              edu: {
                title: string;
                period: string;
                institution: string;
                place: string;
              },
              idx: number
            ) => (
              <li key={idx} className={idx !== resume.education.length - 1 ? "mb-6 pb-6 border-b border-gray-700" : ""}>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2 max-md:mb-2">
                  <strong>{edu.title}</strong>
                  <span className="hidden md:inline">|</span>
                  <span className="text-lightgray">{edu.period}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                  <strong>{edu.institution}</strong>
                  <span className="hidden md:inline">|</span>
                  <span className="text-lightgray">{edu.place}</span>
                </div>
              </li>
            )
          )}
        </ul>

        <LanguageSection title={dict.languages} languages={resume.languages} />

        <div className="flex items-center gap-2 mb-2">
          <ComputerDesktopIcon className="w-6 h-6 text-orange" aria-hidden="true" />
          <h2 className="text-2xl font-extrabold text-orange">{dict.skills}</h2>
        </div>
        <ul className="listResume list-disc pl-6 text-lightgray leading-relaxed mb-4">
          {resume.skills.map((skill: string, idx: number) => (
            <li key={idx}>
              <strong>{skill}</strong>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 mb-2">
          <IdentificationIcon className="w-6 h-6 text-orange" aria-hidden="true" />
          <h2 className="text-2xl font-extrabold text-orange">{dict.certifications}</h2>
        </div>
        <div className="flex flex-col gap-4">
          {resume.certifications.map((cert: { name: string; logo?: string; link?: string }, idx: number) => {
            const content = (
              <>
                {cert.logo && (
                  <Image src={cert.logo} alt={`${cert.name} logo`} width={32} height={32} className="w-8 h-8 m-0!" />
                )}
                <span>{cert.name}</span>
              </>
            );
            return cert.link ? (
              <TextLink key={idx} href={cert.link} className="flex gap-4 items-center">
                {content}
              </TextLink>
            ) : (
              <div key={idx} className="flex gap-4 items-center">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
