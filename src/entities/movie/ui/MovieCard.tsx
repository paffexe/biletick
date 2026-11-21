import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Poster, Rating } from "@/shared/ui";
import { getYear } from "@/shared/lib";
import type { Movie } from "../model/types";

interface Props {
  movie: Movie;
  action?: ReactNode;
}

export const MovieCard = memo(({ movie, action }: Props) => (
  <article className="group relative">
    <Link to={`/movie/${movie.id}`} className="block rounded-xl">
      <Poster
        path={movie.poster_path}
        alt={movie.title}
        className="rounded-xl ring-1 ring-line/70 transition duration-300 group-hover:ring-accent/70"
        imgClassName="transition duration-500 group-hover:scale-[1.03]"
      />
      <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug sm:text-[15px]">
        {movie.title}
      </h3>
      <p className="mt-0.5 text-xs text-muted sm:text-sm">{getYear(movie.release_date) || "—"}</p>
    </Link>
    <Rating value={movie.vote_average} variant="overlay" className="absolute left-2 top-2" />
    {action && <div className="absolute right-2 top-2">{action}</div>}
  </article>
));
