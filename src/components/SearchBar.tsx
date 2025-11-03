import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Lang } from "@/lib/consts";
import Input from "./Input";

const dictionary = {
  en: {
    label: "Search",
    placeholder: "Search",
  },
  pt: {
    label: "Buscar",
    placeholder: "Buscar",
  },
} as const;

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  lang: Lang;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, lang }) => {
  const dict = dictionary[lang];

  return (
    <div className="">
      <div className="text-xl font-bold mb-2 flex items-center gap-1">{dict.label}</div>
      <Input
        id="search"
        icon={<MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={dict.placeholder}
      />
    </div>
  );
};

export default SearchBar;
