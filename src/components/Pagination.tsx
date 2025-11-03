import React from "react";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  prevPage,
  nextPage,
  setPage,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={clsx("flex justify-center items-center gap-2", className)}>
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={clsx("px-3 py-1 text-sm rounded-md ring-1 ring-gray-700 disabled:opacity-50 focus:outline-none", page === 1 ? "cursor-not-allowed" : "cursor-pointer hover:ring-orange focus:ring-orange")}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
        className={clsx(
            "px-3 py-1 text-sm rounded-md ring-1 ring-gray-700 focus:ring-orange focus:outline-none",
            num === page
              ? "bg-orange text-white ring-orange focus:ring-2"
              : "text-gray-300 hover:text-white hover:ring-orange cursor-pointer"
          )}
        >
          {num}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className={clsx("px-3 py-1 text-sm rounded-md ring-1 ring-gray-700 disabled:opacity-50 focus:outline-none", page === totalPages ? "cursor-not-allowed" : "cursor-pointer hover:ring-orange focus:ring-orange")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 