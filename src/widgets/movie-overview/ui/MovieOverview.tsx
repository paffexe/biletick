import { memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Clock, ExternalLink } from "lucide-react";
import type { MovieDetails } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import {
  formatDate,
  formatMoney,
  formatNumber,
  getYear,
  splitRuntime,
  tmdbImage,
} from "@/shared/lib";
import { buttonClass, Poster, Rating } from "@/shared/ui";

const Fact = ({ label, value }: { label: string; value?: ReactNode }) =>
  value ? (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  ) : null;

export const MovieOverview = memo(({ movie }: { movie: MovieDetails }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const runtime = splitRuntime(movie.runtime);
  const runtimeText = runtime ? t("movie.duration", runtime) : "";
  const languageName = movie.original_language
    ? new Intl.DisplayNames([lang], { type: "language" }).of(movie.original_language)
    : "";

  return (
    <section className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden sm:h-[420px] lg:h-[520px]">
        {movie.backdrop_path && (
          <img
            src={tmdbImage(movie.backdrop_path, "w1280")}
            alt=""
            className="size-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/70 to-canvas" />
      </div>

      <div className="shell grid grid-cols-[108px_1fr] items-end gap-x-5 gap-y-7 pt-[150px] sm:grid-cols-[180px_1fr] sm:gap-x-8 sm:pt-[210px] md:grid-cols-[240px_1fr] md:items-start lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:pt-[260px]">
        <Poster
          path={movie.poster_path}
          alt={movie.title}
          size="w500"
          eager
          className="rounded-xl shadow-2xl shadow-black/40 ring-1 ring-line md:row-span-2"
        />

        <div className="md:pt-14 lg:pt-20">
          <h1 className="font-display text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="mt-2 text-sm text-muted italic sm:text-base">{movie.tagline}</p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/80">
            <Rating value={movie.vote_average} />
            <span>{getYear(movie.release_date)}</span>
            {runtimeText && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {runtimeText}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 md:col-start-2">
          {movie.genres.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <li key={g.id} className="rounded-full border border-line px-3 py-1 text-xs font-medium">
                  {g.name}
                </li>
              ))}
            </ul>
          )}

          {movie.overview && (
            <p className="mt-5 max-w-[68ch] text-[15px] leading-relaxed text-ink/85 sm:text-base">
              {movie.overview}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <BookmarkButton movie={movie} variant="button" />
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className={buttonClass("ghost")}
              >
                <ExternalLink className="size-[18px]" />
                {t("movie.homepage")}
              </a>
            )}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
            <Fact label={t("movie.release")} value={formatDate(movie.release_date, lang)} />
            <Fact label={t("movie.status")} value={movie.status} />
            <Fact label={t("movie.language")} value={languageName} />
            <Fact label={t("movie.budget")} value={formatMoney(movie.budget, lang)} />
            <Fact label={t("movie.revenue")} value={formatMoney(movie.revenue, lang)} />
            <Fact label={t("movie.votes")} value={formatNumber(movie.vote_count, lang)} />
          </dl>
        </div>
      </div>
    </section>
  );
});
