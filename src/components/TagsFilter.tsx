import React, { useState } from "react";
import { Tag } from "@/lib/consts";
import TagButton from "./TagButton";

interface TagsFilterProps {
  tags: Tag[];
  selectedTags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: () => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ tags, selectedTags, toggleTag, clearTags }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleTags = expanded ? tags : tags.slice(0, 5);

  return (
    <div className="">
      <div className="text-xl font-bold mb-2 flex items-center gap-1">
        Tags
        {selectedTags.length > 0 && (
          <button
            onClick={clearTags}
            className="cursor-pointer w-6 h-6 flex justify-center items-center font-thin text-4xl text-gray-300 rounded-full active:scale-95 transition-all duration-300 focus:outline-none hover:text-error focus:text-error"
            aria-label="Clear all filters"
          >
            <span>&times;</span>
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        {visibleTags.map((tag) => (
          <TagButton
            key={tag.name}
            tag={tag}
            selectedTags={selectedTags}
            onClick={() => toggleTag(tag)}
          />
        ))}

        {tags.length > 5 && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="glass cursor-pointer border-none text-sm ring-gray-700 ring-1 hover:ring-orange text-gray-300 px-2 py-1 rounded-md hover:text-white active:scale-95 transition-all duration-300 focus:outline-none focus:ring-orange relative"
            aria-label="Show more tags"
          >
            +{tags.length - 5} more
          </button>
        )}
      </div>
    </div>
  );
};

export default TagsFilter; 