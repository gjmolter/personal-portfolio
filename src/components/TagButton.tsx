import { Tag } from "@/lib/consts";
import { PostType } from "@/lib/mdx";
import clsx from "clsx";

const TagButton = ({
  tag,
  selectedTags = [],
  onClick = () => {},
  postType = "blog",
}: {
  tag: Tag | string;
  selectedTags?: Tag[];
  onClick?: () => void;
  postType?: PostType;
}) => {
  if (typeof tag === "string") {
    const isSelected = selectedTags.some((t) => t.name === tag);
    return (
      <a
        href={`/${postType}?tag=${encodeURIComponent(tag)}`}
        className={clsx(
          "cursor-pointer no-underline text-sm ring-gray-700 ring-1 hover:ring-orange px-2 py-1 rounded-md active:scale-95 transition-all duration-300 focus:outline-none focus:ring-orange relative",
          isSelected ? "bg-orange text-white ring-orange" : "glass text-gray-300 hover:text-white"
        )}
      >
        {tag}
      </a>
    );
  }

  const isSelected = selectedTags.some((t) => t.name === tag.name);

  return (
    <button
      onClick={onClick}
      className={clsx(
        "cursor-pointer text-sm ring-gray-700 ring-1 hover:ring-orange px-2 py-1 rounded-md active:scale-95 transition-all duration-300 focus:outline-none focus:ring-orange relative",
        isSelected ? "bg-orange text-white ring-orange" : "glass text-gray-300 hover:text-white !border-none"
      )}
      aria-label={`Filter by ${tag.name}`}
      role="checkbox"
      aria-checked={isSelected}
    >
      {tag.name}
    </button>
  );
};

export default TagButton;
