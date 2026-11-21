import { memo } from "react";
import { Link } from "react-router-dom";
import { Asterisk } from "lucide-react";
import type { Movie } from "@/entities/movie";

export const Marquee = memo(({ movies, label }: { movies: Movie[]; label: string }) => {
  if (!movies.length) return null;
  const loop = [...movies, ...movies];

  return (
    <div
      className="marquee overflow-hidden motion-reduce:overflow-x-auto border-y-[3px] border-ink bg-accent text-white"
      aria-label={label}
    >
      <ul className="marquee-track flex w-max items-center">
        {loop.map((movie, i) => (
          <li key={`${movie.id}-${i}`} className="flex items-center" aria-hidden={i >= movies.length}>
            <Link
              to={`/movie/${movie.id}`}
              tabIndex={i >= movies.length ? -1 : undefined}
              className="px-5 py-3 font-display text-base font-bold whitespace-nowrap uppercase transition-colors hover:bg-ink hover:text-canvas sm:text-lg"
            >
              {movie.title}
            </Link>
            <Asterisk className="size-6 shrink-0" strokeWidth={3} aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
});
