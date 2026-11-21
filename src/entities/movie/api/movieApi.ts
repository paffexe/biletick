import { api, type Paginated } from "@/shared/api";
import type {
  DiscoverParams,
  Genre,
  Movie,
  MovieCategory,
  MovieDetails,
  MovieImages,
} from "../model/types";

export const movieApi = {
  discover: (params: DiscoverParams) =>
    api.get<Paginated<Movie>>("discover/movie", { params }).then((r) => r.data),

  list: (category: MovieCategory, page = 1) =>
    api.get<Paginated<Movie>>(`movie/${category}`, { params: { page } }).then((r) => r.data),

  trending: () => api.get<Paginated<Movie>>("trending/movie/week").then((r) => r.data),

  search: (query: string, page = 1) =>
    api
      .get<Paginated<Movie>>("search/movie", { params: { query, page, include_adult: false } })
      .then((r) => r.data),

  details: (id: string) => api.get<MovieDetails>(`movie/${id}`).then((r) => r.data),

  images: (id: string) =>
    api
      .get<MovieImages>(`movie/${id}/images`, { params: { language: undefined } })
      .then((r) => r.data),

  recommendations: (id: string, page = 1) =>
    api
      .get<Paginated<Movie>>(`movie/${id}/recommendations`, { params: { page } })
      .then((r) => r.data),

  genres: () => api.get<{ genres: Genre[] }>("genre/movie/list").then((r) => r.data.genres),
};
