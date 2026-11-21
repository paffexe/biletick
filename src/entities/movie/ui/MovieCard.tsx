import { memo, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Poster, Rating } from "@/shared/ui";
import { getYear } from "@/shared/lib";
import type { Movie } from "../model/types";

interface Props {
  movie: Movie;
  action?: ReactNode;
  index?: number;
}

export const MovieCard = memo(({ movie, action, index = 0 }: Props) => (
  <article className="card-in group relative" style={{ "--i": index } as CSSProperties}>
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="border-2 border-ink bg-ink shadow-hard-sm transition duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-hard-lg">
        <Poster
          path={movie.poster_path}
          alt={movie.title}
          imgClassName="transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm leading-snug font-bold sm:text-[15px]">
        {movie.title}
      </h3>
      <p className="mt-0.5 font-mono text-xs text-muted">{getYear(movie.release_date) || "—"}</p>
    </Link>
    <Rating
      value={movie.vote_average}
      variant="overlay"
      className="pointer-events-none absolute top-0 left-0 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
    />
    {action && (
      <div className="absolute top-2 right-2 transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        {action}
      </div>
    )}
  </article>
));
