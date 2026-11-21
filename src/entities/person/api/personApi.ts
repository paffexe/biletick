import { api } from "@/shared/api";
import type { MovieCredits, Person, PersonMovieCredits } from "../model/types";

export const personApi = {
  movieCredits: (movieId: string) =>
    api.get<MovieCredits>(`movie/${movieId}/credits`).then((r) => r.data),

  details: (id: string) => api.get<Person>(`person/${id}`).then((r) => r.data),

  filmography: (id: string) =>
    api.get<PersonMovieCredits>(`person/${id}/movie_credits`).then((r) => r.data),
};
