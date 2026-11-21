import type { Movie } from "@/entities/movie";

export interface Credit {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
  department?: string;
  credit_id: string;
}

export interface MovieCredits {
  cast: Credit[];
  crew: Credit[];
}

export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  homepage: string | null;
}

export interface PersonMovieCredits {
  cast: Movie[];
  crew: Movie[];
}
