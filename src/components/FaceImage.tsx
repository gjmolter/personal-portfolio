"use client";

import Image from "next/image";
import { useRef, useCallback, useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";
import { useLang } from "./hooks/LangProvider";

const src = "/img/me.webp";
const width = 200;
const height = 200;
const amplitude = 0.09;
const damping = 3.2;
const frequency = 10;
const duration = 700;

const dictionary = {
  pt: {
    tooltip: "Caso esteja curioso, todo o código fonte deste site está no meu GitHub",
    imageAlt: "Um cara extremamente bonito, Gabriel Molter",
    openGitHub: "Quer ver o repositório?",
  },
  en: {
    tooltip: "In case you're curious, the whole source code for this site is on my GitHub",
    imageAlt: "An absolutely handsome guy, Gabriel Molter",
    openGitHub: "Want to see the repository?",
  },
};

export default function FaceImage() {
  const ref = useRef<HTMLButtonElement>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const tooltipId = "face-image-tooltip";
  const { lang } = useLang();
  const dict = dictionary[lang];

  const [tooltipContent, setTooltipContent] = useState(dict.tooltip);

  useEffect(() => {
    setReadyToOpen(false);
    setTooltipContent(dict.tooltip);
    resetClicks();
  }, [lang, dict.tooltip]);

  const wobble = useCallback((strength: number = 1) => {
    const el = ref.current;
    if (!el) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    startRef.current = performance.now();
    const step = (now: number) => {
      const t = (now - startRef.current) / 1000; // secs
      const total = duration / 1000;
      if (t > total) {
        el.style.transform = "translateZ(0)";
        animRef.current = null;
        return;
      }
      const decay = Math.exp((-damping * t * strength) / total);
      const phase = frequency * t * Math.PI * 2 * 0.5;
      const a = amplitude * strength * decay * Math.sin(phase);
      const sx = 1 + a;
      const sy = 1 - a;
      const rot = a * 20;
      el.style.setProperty("--highlight-x", (30 + a * 120).toFixed(2) + "%");
      el.style.transform = `translateZ(0) rotate(${rot}deg) scale(${sx.toFixed(4)},${sy.toFixed(4)})`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  const throughBorder = useCallback(() => {
    wobble(0.3);
  }, [wobble]);

  const clickCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [readyToOpen, setReadyToOpen] = useState(false);

  const resetClicks = () => {
    clickCountRef.current = 0;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleClick = () => {
    wobble(1);

    if (readyToOpen) {
      window.open("https://github.com/gjmolter/personal-portfolio", "_blank");
      setReadyToOpen(false);
      setTooltipContent(dict.tooltip);
      resetClicks();
      return;
    }

    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        resetClicks();
      }, 2000);
    }

    if (clickCountRef.current >= 5) {
      setReadyToOpen(true);
      setTooltipContent(dict.openGitHub);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  return (
    <>
      <button
        ref={ref}
        onMouseEnter={throughBorder}
        onMouseLeave={throughBorder}
        onClick={handleClick}
        className={clsx(
          "relative inline-block overflow-hidden focus:outline-none p-0 border-0 select-none max-w-full h-auto rounded-full cursor-pointer mb-12"
        )}
        style={{
          width: width,
          height: height,
          position: "relative",
          transition: "filter 120ms",
        }}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
      >
        <Image
          src={src}
          alt={dict.imageAlt}
          fill
          sizes={`${width}px`}
          className="object-cover pointer-events-none"
          draggable={false}
          priority={true}
          fetchPriority="high"
        />
      </button>
      <Tooltip
        id={tooltipId}
        place="top"
        className="!bg-orange !text-darkblue font-bold !py-1 !px-3 max-md:max-w-xs max-lg:max-w-sm text-balance max-lg:text-center -translate-y-2"
      />
    </>
  );
}
