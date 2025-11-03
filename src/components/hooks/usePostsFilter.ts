import { useEffect, useMemo, useState } from "react";
import { Item } from "@/lib/mdx";
import { Lang, Tag } from "@/lib/consts";

const usePostsFilter = (
  posts: Item[],
  pageSize = 6,
  initialSelectedTags: Tag[] = []
) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialSelectedTags);
  const [filteredPosts, setFilteredPosts] = useState<Item[]>(() => {
    let result = posts;
    if (initialSelectedTags.length) {
      result = result.filter((post) =>
        initialSelectedTags.some((tag) => post.meta.tags.includes(tag.name))
      );
    }
    return result;
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    let result = posts;

    if (selectedTags.length) {
      result = result.filter((post) =>
        selectedTags.some((tag) => post.meta.tags.includes(tag.name))
      );
    }

    if (search) {
      const tokens = search.toLowerCase().trim().split(/\s+/).filter(Boolean);

      result = result.filter((post) => {
        const { title = "", description = "", date = "", excerpt = "", tags = [], counterparts = {} as Record<Lang, string> } = post.meta;
        const fields: string[] = [title, description, date, excerpt, ...tags, ...Object.values(counterparts)];

        // Every search token must match at least one of the fields
        return tokens.every((token) => {
          // Threshold: ~30% of the search term length
          const threshold = Math.max(1, Math.floor(token.length * 0.3));

          return fields.some((field) => {
            const fieldLower = field.toLowerCase().trim();
            if (fieldLower.includes(token)) return true;

            return fieldLower.split(/\s+/).some((word) => levenshtein(token, word) <= threshold);
          });
        });
      });
    }

    setFilteredPosts(result);
    setPage(1);
  }, [search, selectedTags, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  const currentPosts = useMemo(
    () => filteredPosts.slice((page - 1) * pageSize, page * pageSize),
    [filteredPosts, page, pageSize]
  );

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.some((t) => t.name === tag.name);
      return exists ? prev.filter((t) => t.name !== tag.name) : [...prev, tag];
    });
  };

  const clearTags = () => setSelectedTags([]);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return {
    search,
    setSearch,
    selectedTags,
    toggleTag,
    clearTags,
    currentPosts,
    page,
    setPage,
    totalPages,
    nextPage,
    prevPage,
  } as const;
};

// Simple Levenshtein distance implementation for fuzzy matching
const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;

  const matrix: number[][] = Array.from({ length: alen + 1 }, () => Array(blen + 1).fill(0));

  for (let i = 0; i <= alen; i++) matrix[i][0] = i;
  for (let j = 0; j <= blen; j++) matrix[0][j] = j;

  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[alen][blen];
};

export default usePostsFilter; 