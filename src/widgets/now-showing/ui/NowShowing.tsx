import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { useGenreNames, useTrendingMovies, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { cn, getYear, tmdbImage, useReducedMotion } from "@/shared/lib";
import { ButtonLink, Poster, Rating } from "@/shared/ui";

const SLIDE_COUNT = 6;

const HeroCopy = ({ movie }: { movie: Movie }) => {
  const { t } = useTranslation();
  const genres = useGenreNames(movie.genre_ids);

  return (
    <div key={movie.id} className="hero-copy max-w-2xl">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-screen-ink/75">
        <Rating value={movie.vote_average} />
        <span>{getYear(movie.release_date)}</span>
        {genres.length > 0 && <span>{genres.join(", ")}</span>}
      </div>
      <h1 className="mt-3 font-display text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {movie.title}
      </h1>
      {movie.overview && (
        <p className="mt-4 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-screen-ink/80 sm:text-base">
          {movie.overview}
        </p>
      )}
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink to={`/movie/${movie.id}`}>
          <Info className="size-[18px]" />
          {t("hero.details")}
        </ButtonLink>
        <BookmarkButton movie={movie} variant="glass" />
      </div>
    </div>
  );
};

export const NowShowing = memo(() => {
  const { t } = useTranslation();
  const { data, isLoading } = useTrendingMovies();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = data?.results.filter((m) => m.backdrop_path).slice(0, SLIDE_COUNT) ?? [];
  const current = slides[active];
  const next = () => setActive((i) => (i + 1) % slides.length);

  if (isLoading || !current) {
    return <section className="min-h-[560px] animate-pulse bg-screen sm:min-h-[640px]" aria-busy />;
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-screen text-screen-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        {slides.map((movie, i) => (
          <img
            key={movie.id}
            src={tmdbImage(movie.backdrop_path, "w1280")}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 size-full object-cover object-[70%_20%] transition-opacity duration-1000",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-screen via-screen/70 to-screen/10" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-screen/90 via-screen/40 to-transparent md:block" />
      </div>

      <div className="shell flex min-h-[560px] flex-col justify-end pt-28 pb-8 sm:min-h-[640px] lg:min-h-[min(78svh,760px)] lg:pb-10">
        <HeroCopy movie={current} />

        <ul
          className="-mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar sm:-mx-6 sm:px-6 lg:mx-0 lg:justify-end lg:px-0"
          aria-label={t("hero.trending")}
        >
          {slides.map((movie, i) => (
            <li key={movie.id} className="w-[72px] shrink-0 sm:w-[88px] lg:w-[96px]">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={t("hero.show", { title: movie.title })}
                aria-current={i === active}
                className={cn(
                  "block w-full rounded-lg transition duration-300",
                  i === active ? "opacity-100" : "opacity-55 hover:opacity-90",
                )}
              >
                <Poster
                  path={movie.poster_path}
                  alt=""
                  size="w185"
                  className={cn(
                    "rounded-lg ring-2 transition",
                    i === active ? "ring-screen-ink" : "ring-transparent",
                  )}
                />
                <span className="mt-2 block h-0.5 overflow-hidden rounded-full bg-screen-ink/15">
                  {i === active && !reducedMotion && (
                    <span
                      key={`${movie.id}-${active}`}
                      onAnimationEnd={next}
                      className="hero-progress block h-full origin-left bg-accent"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});
