import { useQuery } from "@tanstack/react-query";
import {
  fetchMovies,
  fetchMovieById,
  fetchMovieInfo,
  fetchMovieGenre,
} from "../api/fetchApi";
import type { IMovieParams } from "./types";

export const useMovie = () => {
  const useMoviesQuery = (params?: IMovieParams) =>
    useQuery<any, any>({
      queryKey: ["movieKey", params],
      queryFn: () => fetchMovies(params),
      retry: 0,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 8,
      staleTime: 1000 * 60,
    });

  const useMovieByIdQuery = (id: string) =>
    useQuery({
      queryKey: ["movieKey", id],
      queryFn: () => fetchMovieById(id),
    });

  const useMovieInfoQuery = (id: string, path: string) =>
    useQuery({
      queryKey: ["movieKey", id, path],
      queryFn: () => fetchMovieInfo(id, path),
    });

  const useMovieGenreQuery = () =>
    useQuery({
      queryKey: ["genreKey"],
      queryFn: () => fetchMovieGenre(),
    });

  return { useMoviesQuery, useMovieByIdQuery, useMovieInfoQuery, useMovieGenreQuery };
};
