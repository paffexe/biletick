import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { DiscoverParams } from "@/entities/movie";

export const SORT_OPTIONS = [
  "popularity.desc",
  "primary_release_date.desc",
  "primary_release_date.asc",
  "vote_average.desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

const DEFAULT_SORT: SortOption = "popularity.desc";
const FILTER_KEYS = ["sort", "genres", "from", "to"] as const;

const today = () => new Date().toISOString().slice(0, 10);

export const useMovieFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get("sort") as SortOption | null) ?? DEFAULT_SORT;
  const genre = searchParams.get("genres") ?? "";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const update = (patch: Partial<Record<(typeof FILTER_KEYS)[number], string>>) => {
    Object.entries(patch).forEach(([key, value]) =>
      value ? searchParams.set(key, value) : searchParams.delete(key),
    );
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const reset = () => {
    FILTER_KEYS.forEach((key) => searchParams.delete(key));
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const params = useMemo<DiscoverParams>(
    () => ({
      page,
      sort_by: sort,
      with_genres: genre || undefined,
      "primary_release_date.gte": from ? `${from}-01-01` : undefined,
      "primary_release_date.lte": to
        ? `${to}-12-31`
        : sort === "primary_release_date.desc"
          ? today()
          : undefined,
      "vote_count.gte": sort === "vote_average.desc" ? 300 : sort.startsWith("primary") ? 20 : undefined,
    }),
    [page, sort, genre, from, to],
  );

  const isDirty = sort !== DEFAULT_SORT || Boolean(genre || from || to);

  return { sort, genre, from, to, params, update, reset, isDirty };
};
