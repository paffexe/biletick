import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { useGenreNames, useTrendingMovies, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { cn, getYear, tmdbImage, useReducedMotion } from "@/shared/lib";
import { ButtonLink, Poster, Rating, SplitText } from "@/shared/ui";
import { Marquee } from "./Marquee";

const SLIDE_COUNT = 6;

const HeroCopy = ({ movie }: { movie: Movie }) => {
  const { t } = useTranslation();
  const genres = useGenreNames(movie.genre_ids);

  return (
    <div className="max-w-3xl">
      <div className="hero-copy flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
        <Rating value={movie.vote_average} variant="overlay" />
        <span className="border-2 border-screen-ink px-1.5 py-0.5">{getYear(movie.release_date)}</span>
        {genres.map((g) => (
          <span key={g} className="border-2 border-screen-ink/50 px-1.5 py-0.5 text-screen-ink/85">
            {g}
          </span>
        ))}
      </div>
      <h1 className="mt-4 font-display text-[2.1rem] leading-[1.02] font-extrabold tracking-tight uppercase sm:text-5xl lg:text-[4.25rem]">
        <SplitText key={movie.id} text={movie.title} />
      </h1>
      {movie.overview && (
        <p className="hero-copy mt-5 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-screen-ink/80 sm:text-base">
          {movie.overview}
        </p>
      )}
      <div className="hero-copy mt-7 flex flex-wrap gap-4">
        <ButtonLink to={`/movie/${movie.id}`}>
          {t("hero.details")}
          <ArrowUpRight className="size-[18px]" strokeWidth={2.5} />
        </ButtonLink>
        <BookmarkButton movie={movie} variant="button" />
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
    <>
      <section
        className="dark relative isolate overflow-hidden bg-screen text-screen-ink"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="absolute inset-0 -z-10" aria-hidden>
          {slides.map((movie, i) => (
            <img
              key={i === active ? `${movie.id}-active` : movie.id}
              src={tmdbImage(movie.backdrop_path, "w1280")}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 size-full object-cover object-[70%_20%] transition-opacity duration-1000",
                i === active ? "ken-burns opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-screen via-screen/65 to-screen/5" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-screen/90 via-screen/35 to-transparent md:block" />
        </div>

        <div className="shell flex min-h-[580px] flex-col justify-end pt-28 pb-8 sm:min-h-[660px] lg:min-h-[min(80svh,780px)] lg:pb-10">
          <HeroCopy key={current.id} movie={current} />

          <ul
            className="-mx-4 mt-10 flex gap-3 overflow-x-auto px-4 pt-1 pb-2 no-scrollbar sm:-mx-6 sm:px-6 lg:mx-0 lg:justify-end lg:px-0"
            aria-label={t("hero.trending")}
          >
            {slides.map((movie, i) => (
              <li key={movie.id} className="w-[68px] shrink-0 sm:w-[84px] lg:w-[92px]">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={t("hero.show", { title: movie.title })}
                  aria-current={i === active}
                  className={cn(
                    "block w-full transition duration-300",
                    i === active
                      ? "-translate-y-1"
                      : "opacity-50 grayscale hover:-translate-y-0.5 hover:opacity-90 hover:grayscale-0",
                  )}
                >
                  <Poster
                    path={movie.poster_path}
                    alt=""
                    size="w185"
                    className={cn(
                      "border-2",
                      i === active
                        ? "border-screen-ink shadow-[4px_4px_0_0_var(--color-accent)]"
                        : "border-transparent",
                    )}
                  />
                  <span className="mt-2 block h-1 overflow-hidden bg-screen-ink/20">
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
      <Marquee movies={data?.results.slice(0, 14) ?? []} label={t("hero.trending")} />
    </>
  );
});
