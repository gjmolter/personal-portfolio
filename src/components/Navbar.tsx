"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { usePathname } from "next/navigation";
import {
  ChevronDoubleRightIcon,
  FingerPrintIcon,
  IdentificationIcon,
  BriefcaseIcon,
  EnvelopeOpenIcon,
  NewspaperIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "./Icons";
import { NavbarItem, NavbarItemType } from "./NavbarItem";
import { BubbleItem } from "./BubbleItem";
import { useLang } from "./hooks/LangProvider";
import { useWindowSize } from "@/components/hooks/useWindowSize";

const dictionary = {
  pt: {
    bio: "Biografia",
    resume: "Currículo",
    portfolio: "Portfólio",
    blog: "Blog",
    contact: "Contato",
    store: "Lojinha",
  },
  en: {
    bio: "Bio",
    resume: "Resume",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
    store: "Garage Sale",
  },
};

const openWidth = "13rem";
const closedWidth = "4.5rem"; // if changing this, change const in globals.css too
const tooltipId = "sidebar-tooltip";

const checkRouteActive = (href: string, pathname: string): boolean => {
  const normalize = (path: string) => {
    // remove leading lang segment like /en or /pt
    const noLang = path.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    // ensure leading slash
    const withSlash = noLang.startsWith("/") ? noLang : `/${noLang}`;
    // remove trailing slash (except for root)
    return withSlash !== "/" && withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
  };

  const normalizedHref = normalize(href);
  const normalizedPath = normalize(pathname);

  return normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + "/");
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { lang } = useLang();
  const dict = dictionary[lang];
  const { winW, isClient } = useWindowSize();

  const toggleNavbar = () => setIsOpen((prev) => !prev);

  const navItems: (NavbarItemType | "separator")[] = [
    { href: `/${lang}`, label: dict.bio, Icon: FingerPrintIcon },
    { href: `/${lang}/resume`, label: dict.resume, Icon: IdentificationIcon },
    { href: `/${lang}/portfolio`, label: dict.portfolio, Icon: BriefcaseIcon },
    { href: `/${lang}/blog`, label: dict.blog, Icon: NewspaperIcon },
    { href: `/${lang}/store`, label: dict.store, Icon: BuildingStorefrontIcon, bubbly: isClient && winW < 768 },
    { href: `/${lang}/contact`, label: dict.contact, Icon: EnvelopeOpenIcon },
    "separator",
    {
      href: "https://github.com/gjmolter",
      label: "GitHub",
      Icon: GitHubIcon,
      bubbly: true,
    },
    {
      href: "https://www.youtube.com/gabrielmolterIO",
      label: "YouTube",
      Icon: YouTubeIcon,
      bubbly: true,
    },
    {
      href: "https://br.linkedin.com/in/gjmolter",
      label: "LinkedIn",
      Icon: LinkedInIcon,
      bubbly: true,
    },
  ];

  // Items that should appear in the floating bubble (mobile only)
  const bubbleItems = navItems.filter((item): item is NavbarItemType => item !== "separator" && Boolean(item.bubbly));

  useEffect(() => {
    if (typeof document === "undefined") return;
    const width = isOpen ? openWidth : closedWidth;
    document.documentElement.style.setProperty("--navbar-width", width);
  }, [isOpen]);

  return (
    <>
      <nav
        className="fixed z-50 flex h-20 w-full flex-row items-center overflow-x-auto bg-darkblue transition-all duration-300 ease-in-out md:h-screen md:flex-col md:overflow-hidden max-md:bottom-0 max-md:left-0 max-md:!w-full max-md:h-fit"
        style={{ width: "var(--navbar-width)" }}
      >
        <button
          onClick={toggleNavbar}
          aria-label="expand sidebar"
          aria-expanded={isOpen}
          className="hidden mt-2 cursor-pointer h-16 w-full items-center px-5 text-orange hover:text-orange/75 transition-all duration-300 md:flex"
          data-tooltip-id={isOpen ? undefined : tooltipId}
          data-tooltip-content={isOpen ? undefined : "Expand"}
        >
          <ChevronDoubleRightIcon
            className={clsx("h-8 w-8 transition-all duration-300", isOpen ? "-rotate-180" : "")}
          />
        </button>

        <ul className="flex w-full flex-1 flex-row items-center md:flex-col md:items-stretch md:py-6 no-scrollbar overflow-x-auto">
          {navItems.map((item, i) => {
            if (item === "separator")
              return <li key={`${item}-${i}`} className="w-full flex-1 min-h-8 max-md:hidden" />;

            const isActive = checkRouteActive(item.href, pathname);
            item.href = item.href === pathname ? "#" : item.href;

            return (
              <NavbarItem key={item.label} item={item} isOpen={isOpen} isActive={isActive} tooltipId={tooltipId} />
            );
          })}
        </ul>
      </nav>
      {!isOpen && (
        <Tooltip
          id={tooltipId}
          place="right"
          className="!bg-orange !text-darkblue font-bold !py-1 !px-3 max-md:hidden z-[1000]"
        />
      )}

      {bubbleItems.length > 0 && (
        <div className="fixed bottom-20 md:bottom-4 left-4 z-50 md:hidden">
          <div className="flex items-center gap-3 rounded-full border border-lightgray/10 bg-black/20 px-3 py-1.5 text-lightgray shadow-sm backdrop-blur transition-all duration-300">
            {bubbleItems.map((item) => {
              const isActive = checkRouteActive(item.href, pathname);
              item.href = item.href === pathname ? "#" : item.href;
              return <BubbleItem key={item.label} item={item} isActive={isActive} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
