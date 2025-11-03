import { Link } from "next-view-transitions";
import { Lang, Tag } from "@/lib/consts";
import { BaseMeta } from "@/lib/mdx";
import TagButton from "./TagButton";
import SafeImage from "./SafeImage";

type PostCardProps = {
  slug: string;
  meta: BaseMeta;
  lang: Lang;
  priority?: boolean;
  selectedTags?: Tag[];
};

const PostCard = ({ slug, meta, lang, priority = false, selectedTags = [] }: PostCardProps) => {
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
    <div className="group glass overflow-hidden rounded-lg transition-all duration-300 flex flex-col relative ring-1 ring-white/10 hover:ring-white/15">
      <Link href={`/${lang}/blog/${slug}`} className="relative w-full h-64">
        <div className="absolute inset-0 bg-orange/50 z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <SafeImage
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, 50vw"
          priority={priority}
          style={{ viewTransitionName: `blog-image-${slug}` }}
        />
      </Link>
      <div className="p-6 flex flex-col gap-3">
        {formattedDate && (
          <time dateTime={date} className="text-sm text-gray-300">
            {formattedDate}
          </time>
        )}
        <Link href={`/${lang}/blog/${slug}`}>
          <h2 className="text-xl md:text-2xl font-extrabold text-orange group-hover:underline group-hover:underline-offset-4 text-balance">
            {title}
          </h2>
        </Link>
        {description && <p className="text-gray-300 line-clamp-4 md:line-clamp-2 text-base mb-2">{description}</p>}
        {tags?.length ? (
          <ul className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <TagButton key={tag} tag={tag} postType="blog" selectedTags={selectedTags} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
