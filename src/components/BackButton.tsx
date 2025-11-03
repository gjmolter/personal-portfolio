"use client";

import { useTransitionRouter } from "next-view-transitions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useLang } from "./hooks/LangProvider";

type BackButtonProps = {
  className?: string;
  href?: string;
};

const dictionary = {
  en: {
    back: "Back",
    ariaLabel: "Go back",
  },
  pt: {
    back: "Voltar",
    ariaLabel: "Voltar",
  },
};

const BackButton = ({ className, href }: BackButtonProps) => {
  const router = useTransitionRouter();
  const { lang } = useLang();
  const dict = dictionary[lang];

  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      className={clsx(
        "flex items-center gap-2 cursor-pointer text-gray-300 hover:text-orange transition-colors duration-300 focus:outline-none focus:text-orange",
        className
      )}
      aria-label={dict.ariaLabel}
    >
      <ArrowLeftIcon className="w-5 h-5" aria-hidden="true" />
      <span>{dict.back}</span>
    </button>
  );
};

export default BackButton;
