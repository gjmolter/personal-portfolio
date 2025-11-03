'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { DEFAULT_LANG, Lang } from '@/lib/consts';

interface LangContextState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextState | undefined>(undefined);

function LangProvider({ lang: initialLang = DEFAULT_LANG, children }: { lang?: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState(initialLang);

    const setLang = (newLang: Lang) => {
    setLangState(newLang);
    
    if (typeof document !== 'undefined') {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
      window.history.replaceState({}, '', newPath);
    }

    //Also save to cookie 
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; samesite=strict`;
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('Language Provider not found.');
  }
  return ctx;
}

export { LangProvider as default, useLang }; 