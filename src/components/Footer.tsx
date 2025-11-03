"use client";

import { useLang } from "./hooks/LangProvider";

const dictionary = {
  pt: {
    copyright: "Todos os direitos reservados.",
  },
  en: {
    copyright: "All rights reserved.",
  },
};

const Footer = () => {
  const { lang } = useLang();
  const dict = dictionary[lang];

  return (
    <footer className="w-full">
      <div className="container mx-auto px-4 py-5 text-sm text-medgray text-center text-balance">
        <p>
          &copy; {new Date().getFullYear()} Gabriel Molter. {dict.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
