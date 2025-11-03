import type { MDXComponents } from "mdx/types";
import TextLink from "@/components/TextLink";
import Image from "next/image";

function parseImageAlt(alt: string) {
  // If no pipe character, return just the alt text
  if (!alt.includes("|")) {
    return {
      alt: alt,
      caption: null,
      style: null,
    };
  }

  // Split by pipe character
  const parts = alt.split("|").map((part) => part.trim());

  // First part is always the alt text
  const parsedAlt = parts[0] || alt;

  let caption: string | null = null;
  let style: string | null = null;

  // Parse the remaining parts
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("Caption:")) {
      caption = part.substring("Caption:".length).trim();
    } else if (part.startsWith("Style:")) {
      style = part.substring("Style:".length).trim();
    }
  }

  return {
    alt: parsedAlt,
    caption,
    style,
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl md:text-4xl font-black italic text-orange mb-6 text-balance" {...props}>
        {children}
      </h1>
    ),
    a: ({ href = "", ...props }) => <TextLink href={href} {...props} />,
    img: ({ src = "", alt = "", ...props }) => {
      const { alt: imageAlt, caption, style } = parseImageAlt(alt);
      const baseClassName = "w-full h-auto max-h-[760px] object-cover rounded-xl shadow-lg";
      const finalClassName = style ? `${baseClassName} ${style}` : baseClassName;

      return (
        <a
          href={src}
          data-pswp-width={1200}
          data-pswp-height={760}
          target="_blank"
          rel="noreferrer"
          className="no-underline pswp-img"
        >
          <figure>
            <Image src={src} alt={imageAlt} {...props} width={1200} height={760} className={finalClassName} />
            {caption && (
              <figcaption
                className="mt-2 text-center text-sm text-gray-400 text-balance"
                aria-hidden={imageAlt.trim() === caption.trim()}
              >
                {caption}
              </figcaption>
            )}
          </figure>
        </a>
      );
    },
    ...components,
  };
}
