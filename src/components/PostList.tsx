"use client";

import { Item, PostType } from "@/lib/mdx";
import PostCard from "./PostCard";
import PortfolioCard from "./PortfolioCard";
import { useLang } from "./hooks/LangProvider";
import { Tag } from "@/lib/consts";
import usePostsFilter from "./hooks/usePostsFilter";
import Pagination from "./Pagination";
import TagsFilter from "./TagsFilter";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";

const typeToComponent = {
  blog: PostCard,
  portfolio: PortfolioCard,
  store: ProductCard,
};

const PostList = ({
  posts,
  tags,
  type,
  initialSelectedTags = [],
}: {
  posts: Item[];
  tags: Tag[];
  type: PostType;
  initialSelectedTags?: Tag[];
}) => {
  const { lang } = useLang();
  const Component = typeToComponent[type];

  const noResultsMessage = {
    en: {
      blog: "No posts found.",
      portfolio: "No projects found.",
      store: "Nothing on sale right now.",
    },
    pt: {
      blog: "Nenhum post encontrado.",
      portfolio: "Nenhum projeto encontrado.",
      store: "Nada à venda no momento.",
    },
  } as const;

  const {
    search,
    setSearch,
    selectedTags,
    toggleTag,
    clearTags,
    currentPosts,
    page,
    totalPages,
    prevPage,
    nextPage,
    setPage,
  } = usePostsFilter(posts, 6, initialSelectedTags);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8">
      <div className="flex-[2] flex flex-col gap-8">
        <ul className="flex flex-col gap-8">
          {currentPosts.length > 0 ? (
            currentPosts.map(({ slug, meta }, index) => (
              <li key={slug}>
                <Component slug={slug} meta={meta} lang={lang} priority={index < 3} selectedTags={selectedTags} />
              </li>
            ))
          ) : (
            <li className="italic text-gray-400">{noResultsMessage[lang][type]}</li>
          )}
        </ul>

        <Pagination
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          setPage={setPage}
          className="mt-4"
        />
      </div>
      <div className="flex-1">
        <div className="lg:sticky lg:top-24 mb-8 flex-col gap-8 flex">
          <SearchBar search={search} setSearch={setSearch} lang={lang} />
          <TagsFilter tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} clearTags={clearTags} />
        </div>
      </div>
    </div>
  );
};

export default PostList;
