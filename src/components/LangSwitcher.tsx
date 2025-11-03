"use client";

import { useLang } from "./hooks/LangProvider";
import Image from "next/image";
import { useWindowSize } from "./hooks/useWindowSize";

const dictionary = {
  en: {
    viewPageIn: "Ver site em",
    countryFlag: "brazil",
    flagAlt: "Brazilian Flag",
    nextLang: "Português",
  },
  pt: {
    viewPageIn: "View page in",
    countryFlag: "canada",
    flagAlt: "Canadian Flag",
    nextLang: "English",
  },
};

const LangSwitcher = () => {
  const { lang, setLang } = useLang();
  const dict = dictionary[lang];
  const { winW, isClient } = useWindowSize();

  const handleClick = () => {
    const newLang = lang === "en" ? "pt" : "en";

    const langCounterparts = document.getElementById("lang-counterparts");
    if (langCounterparts) {
      const postType = window.location.pathname.split("/")[2];
      const counterparts = JSON.parse(langCounterparts.dataset.counterparts || "{}");
      const counterpart = counterparts[newLang];

      if (counterpart) {
        window.location.href = `/${newLang}/${postType}/${counterpart}`;
        return;
      } else {
        //if no counterpart is found, go back to the archive page
        window.location.href = `/${newLang}/${postType}`;
        return;
      }
    }

    // For pages without lang-counterparts, just reload with new lang
    setLang(newLang);
    window.location.reload();
  };

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
      <button
        onClick={handleClick}
        className="glass flex items-center gap-1 rounded-full text-lightgray px-3 py-2 hover:bg-black/50 transition-all duration-300"
      >
        {isClient && winW > 768 && <span className="text-[11px] whitespace-nowrap">{dict.viewPageIn}</span>}
        <Image
          src={`/img/flags/${dict.countryFlag}-flag.svg`}
          alt={dict.flagAlt}
          className="size-5"
          width={20}
          height={20}
        />
        <span className="text-[11px] whitespace-nowrap">{dict.nextLang}</span>
      </button>
    </div>
  );
};

export default LangSwitcher;
