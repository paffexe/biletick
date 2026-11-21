import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { Paginated } from "@/shared/api";
import { MAX_TMDB_PAGES } from "@/shared/config";
import { movieApi } from "../api/movieApi";
import type { DiscoverParams, Genre, Movie, MovieCategory } from "./types";

export const useDiscoverMovies = (params: DiscoverParams) =>
  useQuery({
    queryKey: ["movies", "discover", params],
    queryFn: () => movieApi.discover(params),
    placeholderData: keepPreviousData,
  });

const nextPage = (last: Paginated<Movie>) =>
  last.page < Math.min(last.total_pages, MAX_TMDB_PAGES) ? last.page + 1 : undefined;

const flattenUnique = (data: InfiniteData<Paginated<Movie>>) => {
  const seen = new Set<number>();
  return data.pages
    .flatMap((p) => p.results)
    .filter((m) => !seen.has(m.id) && Boolean(seen.add(m.id)));
};

export const useInfiniteMovieList = (category: MovieCategory) =>
  useInfiniteQuery({
    queryKey: ["movies", "list", category, "infinite"],
    queryFn: ({ pageParam }) => movieApi.list(category, pageParam),
    initialPageParam: 1,
    getNextPageParam: nextPage,
    select: flattenUnique,
  });

export const useTrendingMovies = () =>
  useQuery({ queryKey: ["movies", "trending"], queryFn: movieApi.trending });

export const useSearchMovies = (query: string, page: number) =>
  useQuery({
    queryKey: ["movies", "search", query, page],
    queryFn: () => movieApi.search(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

export const useMovieDetails = (id: string) =>
  useQuery({ queryKey: ["movie", id, "details"], queryFn: () => movieApi.details(id) });

export const useMovieImages = (id: string) =>
  useQuery({ queryKey: ["movie", id, "images"], queryFn: () => movieApi.images(id) });

export const useMovieRecommendations = (id: string) =>
  useInfiniteQuery({
    queryKey: ["movie", id, "recommendations"],
    queryFn: ({ pageParam }) => movieApi.recommendations(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: nextPage,
    select: flattenUnique,
  });

export const useGenres = () =>
  useQuery({ queryKey: ["genres"], queryFn: movieApi.genres, staleTime: Infinity });

export const useGenreLabel = () => {
  const { t } = useTranslation();
  return (genre: Genre) => t(`genres.${genre.id}`, { defaultValue: genre.name });
};

export const useGenreNames = (ids: number[] = [], limit = 2) => {
  const { data } = useGenres();
  const label = useGenreLabel();
  if (!data) return [];
  return ids
    .map((id) => data.find((g) => g.id === id))
    .filter((g): g is Genre => Boolean(g))
    .slice(0, limit)
    .map(label);
};
