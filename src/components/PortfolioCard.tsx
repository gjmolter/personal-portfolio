import { Lang, Tag } from "@/lib/consts";
import { BaseMeta } from "@/lib/mdx";
import { Link } from "next-view-transitions";
import TagButton from "./TagButton";
import SafeImage from "./SafeImage";

const dictionary = {
  en: {
    workingAt: "While working at",
  },
  pt: {
    workingAt: "Enquanto trabalhava na",
  },
} as const;

type PortfolioCardProps = {
  slug: string;
  meta: BaseMeta;
  lang: Lang;
  priority?: boolean;
  selectedTags?: Tag[];
};

const PortfolioCard = ({ slug, meta, lang, priority = false, selectedTags = [] }: PortfolioCardProps) => {
  const { title, description, image, date, tags, company } = meta;
  const dict = dictionary[lang];

  const formattedDate = date
    ? new Date(date + "T00:00:00.000Z").toLocaleDateString(lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
      })
    : undefined;

  return (
    <div className="group glass max-sm:flex-col overflow-hidden rounded-lg transition-all duration-300 flex relative ring-1 ring-white/10 hover:ring-white/15">
      <div className="flex flex-1 p-4 bg-white/5">
        <Link href={`/${lang}/portfolio/${slug}`} className="relative w-full h-full min-w-0 sm:min-w-48 min-h-32">
          <SafeImage
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-300 object-center"
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={priority}
          />
        </Link>
      </div>
      <div className="px-4 py-4 sm:py-6 flex flex-col gap-2">
        <Link href={`/${lang}/portfolio/${slug}`}>
          <h2 className="text-xl md:text-2xl font-extrabold text-orange group-hover:underline group-hover:underline-offset-4">
            {title}
          </h2>
        </Link>
        {company && company.length > 0 && (
          <span className="glass text-xs font-semibold ring-orange/50 ring-1 text-orange px-2 py-0.5 rounded-md mt-1 mb-3 max-w-fit">
            {dict.workingAt} {company}
          </span>
        )}
        {formattedDate && (
          <time dateTime={date} className="text-sm text-gray-300 mb-3">
            {formattedDate}
          </time>
        )}
        {description && <p className="text-gray-300 line-clamp-4 md:line-clamp-3 text-base mb-2">{description}</p>}
        {tags?.length ? (
          <ul className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <TagButton key={tag} tag={tag} postType="portfolio" selectedTags={selectedTags} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default PortfolioCard;
