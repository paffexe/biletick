import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { movieApi } from "../api/movieApi";
import type { DiscoverParams, MovieCategory } from "./types";

export const useDiscoverMovies = (params: DiscoverParams) =>
  useQuery({
    queryKey: ["movies", "discover", params],
    queryFn: () => movieApi.discover(params),
    placeholderData: keepPreviousData,
  });

export const useMovieList = (category: MovieCategory) =>
  useQuery({
    queryKey: ["movies", "list", category],
    queryFn: () => movieApi.list(category),
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
  useQuery({
    queryKey: ["movie", id, "recommendations"],
    queryFn: () => movieApi.recommendations(id),
  });

export const useGenres = () =>
  useQuery({ queryKey: ["genres"], queryFn: movieApi.genres, staleTime: Infinity });

export const useGenreNames = (ids: number[] = [], limit = 2) => {
  const { data } = useGenres();
  if (!data) return [];
  return ids
    .map((id) => data.find((g) => g.id === id)?.name)
    .filter((name): name is string => Boolean(name))
    .slice(0, limit);
};
