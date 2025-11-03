"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ComponentProps } from "react";
import { useLang } from "./hooks/LangProvider";

type SafeImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  src?: string | null;
  defaultImage?: string;
};

const DEFAULT_IMAGE = "/img/content/default.webp";

const dictionary = {
  en: {
    defaultAlt: "An illustration of me working on this very website at my computer desk in a sunlit room.",
  },
  pt: {
    defaultAlt:
      "Uma ilustração de mim trabalhando neste mesmo site na minha mesa de computador em um quarto iluminado pelo sol.",
  },
} as const;

const SafeImage = ({ src, alt, defaultImage = DEFAULT_IMAGE, ...props }: SafeImageProps) => {
  const { lang } = useLang();
  const dict = dictionary[lang];
  const [currentSrc, setCurrentSrc] = useState(src || defaultImage);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src || defaultImage);
      setErrored(false);
    }
  }, [src, currentSrc]);

  const handleError = () => {
    if (!errored && currentSrc !== defaultImage) {
      setErrored(true);
      setCurrentSrc(defaultImage);
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={currentSrc === defaultImage ? dict.defaultAlt : alt}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
