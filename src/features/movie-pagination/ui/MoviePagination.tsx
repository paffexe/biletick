import { memo } from "react";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { MAX_TMDB_PAGES } from "@/shared/config";

interface Props {
  totalResults?: number;
}

const PAGE_SIZE = 20;

export const MoviePagination = memo(({ totalResults = 0 }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const total = Math.min(totalResults, MAX_TMDB_PAGES * PAGE_SIZE);

  if (total <= PAGE_SIZE) return null;

  const onChange = (next: number) => {
    searchParams.set("page", String(next));
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="mt-14 flex justify-center">
      <Pagination
        current={page}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={onChange}
        showSizeChanger={false}
        showLessItems
        responsive
      />
    </nav>
  );
});
