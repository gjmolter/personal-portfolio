"use client";

import { useWindowSize } from "@/components/hooks/useWindowSize";
import { useEffect } from "react";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useLang } from "./hooks/LangProvider";

const dictionary = {
  en: {
    indexIndicatorSep: " of ",
  },
  pt: {
    indexIndicatorSep: " de ",
  },
};

export default function PostContent({ children }: { children: React.ReactNode }) {
  const { winW, isClient } = useWindowSize();
  const { lang } = useLang();
  const dict = dictionary[lang];

  useEffect(() => {
    if (!isClient) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#post-content",
      children: "a.pswp-img",
      pswpModule: () => import("photoswipe"),
      wheelToZoom: true,
      closeOnVerticalDrag: true,
      padding: { top: winW * 0.14, bottom: winW * 0.14, left: winW * 0.08, right: winW * 0.08 },
      indexIndicatorSep: dict.indexIndicatorSep,
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [dict, winW, isClient]);

  return (
    <div
      className="prose prose-invert [&_.footnotes]:text-sm [&_.footnotes]:text-gray-400 [&_sup]:pl-[3px] prose-li:marker:text-orange w-full max-w-[800px] mx-auto"
      id="post-content"
    >
      {children}
    </div>
  );
}
