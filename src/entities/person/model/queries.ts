import { useQuery } from "@tanstack/react-query";
import type { Movie } from "@/entities/movie";
import { personApi } from "../api/personApi";

export const useMovieCredits = (movieId: string) =>
  useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => personApi.movieCredits(movieId),
  });

export const usePerson = (id: string) =>
  useQuery({ queryKey: ["person", id], queryFn: () => personApi.details(id) });

export const usePersonFilmography = (id: string) =>
  useQuery({
    queryKey: ["person", id, "filmography"],
    queryFn: () => personApi.filmography(id),
    select: (data) => {
      const unique = new Map<number, Movie>();
      [...data.cast, ...data.crew].forEach((m) => {
        if (m.poster_path && !unique.has(m.id)) unique.set(m.id, m);
      });
      return [...unique.values()].sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0));
    },
  });
