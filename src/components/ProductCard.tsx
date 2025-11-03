import { Lang, Tag } from "@/lib/consts";
import { BaseMeta } from "@/lib/mdx";
import { Link } from "next-view-transitions";
import TagButton from "./TagButton";
import SafeImage from "./SafeImage";

type ProductCardProps = {
  slug: string;
  meta: BaseMeta;
  lang: Lang;
  priority?: boolean;
  selectedTags?: Tag[];
};

const ProductCard = ({ slug, meta, lang, priority = false, selectedTags = [] }: ProductCardProps) => {
  const { title, description, image, date, tags } = meta;

  const formattedDate = date
    ? new Date(date + "T00:00:00.000Z").toLocaleDateString(lang, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        timeZone: "UTC",
      })
    : undefined;

  return (
    <div className="group glass overflow-hidden rounded-lg transition-all duration-300 flex max-sm:flex-col relative ring-1 ring-white/10 hover:ring-white/15">
      <div className="flex flex-1 p-4">
        <Link
          href={`/${lang}/store/${slug}`}
          className="relative w-full h-full min-w-0 sm:min-w-48 min-h-32 sm:min-h-auto"
        >
          <SafeImage
            src={image}
            alt={title}
            fill
            className="object-contain sm:object-cover object-center transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 50vw"
            defaultImage="/img/content/store/product-default.webp"
            priority={priority}
          />
        </Link>
      </div>
      <div className="px-4 py-4 sm:py-6 flex flex-col gap-2">
        <Link href={`/${lang}/store/${slug}`}>
          <h2 className="text-xl md:text-2xl font-extrabold text-orange group-hover:underline group-hover:underline-offset-4">
            {title}
          </h2>
        </Link>
        {formattedDate && (
          <time dateTime={date} className="text-sm text-gray-300 mb-3">
            {formattedDate}
          </time>
        )}
        {description && <p className="text-gray-300 line-clamp-4 md:line-clamp-2 text-base mb-2">{description}</p>}
        {tags?.length ? (
          <ul className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <TagButton key={tag} tag={tag} postType="store" selectedTags={selectedTags} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
