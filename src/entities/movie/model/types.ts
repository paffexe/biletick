export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  overview?: string;
  genre_ids?: number[];
  vote_count?: number;
  popularity?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string;
  vote_count: number;
  status: string;
  original_language: string;
  original_title: string;
}

export interface MovieImage {
  file_path: string;
  width: number;
  height: number;
}

export interface MovieImages {
  backdrops: MovieImage[];
  posters: MovieImage[];
}

export type MovieCategory = "popular" | "top_rated" | "upcoming" | "now_playing";

export interface DiscoverParams {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  "vote_count.gte"?: number;
}
