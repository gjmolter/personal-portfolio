"use client";

import { useLang } from "./hooks/LangProvider";

const dictionary = {
  pt: {
    skipToContent: "Pular para o conteúdo",
  },
  en: {
    skipToContent: "Skip to content",
  },
};

export default function SkipToContent() {
  const { lang } = useLang();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-orange focus:text-darkblue focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-darkblue text-sm font-bold"
      style={{ left: "calc(var(--navbar-width) + 1rem)" }}
    >
      {dictionary[lang].skipToContent}
    </a>
  );
}
