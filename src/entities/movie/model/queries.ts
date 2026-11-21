import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { movieApi } from "../api/movieApi";
import type { DiscoverParams, Genre, MovieCategory } from "./types";

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
