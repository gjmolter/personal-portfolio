"use client";

import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { LanguageIcon } from "@heroicons/react/24/solid";

interface LanguageItem {
  flag: string;
  name: string;
  level: string;
}

interface LanguageSectionProps {
  title: string;
  languages: LanguageItem[];
}

const LanguageSection = ({ title, languages }: LanguageSectionProps) => {
  const tooltipId = "language-level-tooltip";

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <LanguageIcon className="w-6 h-6 text-orange" aria-hidden="true" />
        <h2 className="text-2xl font-extrabold text-orange">{title}</h2>
      </div>
      <ul className="list-disc pl-0 gap-6 mb-4">
        {languages.map((langItem, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 max-w-fit pr-1"
            data-tooltip-id={tooltipId}
            data-tooltip-content={langItem.level}
          >
            <Image
              src={`/img/flags/${langItem.flag}-flag.svg`}
              alt={`Flag of ${langItem.name}`}
              width={24}
              height={24}
              className="w-6 h-6 !m-0"
            />
            <span>{langItem.name}</span>
          </li>
        ))}
      </ul>
      <Tooltip
        id={tooltipId}
        place="left"
        className="!bg-orange !text-darkblue font-bold !py-1 !px-3"
      />
    </>
  );
};

export default LanguageSection; 