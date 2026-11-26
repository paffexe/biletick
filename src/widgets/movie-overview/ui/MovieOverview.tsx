import { memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { useGenreLabel, type MovieDetails } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import {
  formatDate,
  formatMoney,
  formatNumber,
  getYear,
  splitRuntime,
  tmdbImage,
} from "@/shared/lib";
import { buttonClass, Poster, Rating, SplitText } from "@/shared/ui";

const Fact = ({ label, value }: { label: string; value?: ReactNode }) =>
  value ? (
    <div className="bg-surface p-4">
      <dt className="text-xs font-bold text-muted uppercase">{label}</dt>
      <dd className="mt-1.5 font-mono text-sm font-bold">{value}</dd>
    </div>
  ) : null;

export const MovieOverview = memo(({ movie }: { movie: MovieDetails }) => {
  const { t, i18n } = useTranslation();
  const genreLabel = useGenreLabel();
  const lang = i18n.language;
  const runtime = splitRuntime(movie.runtime);
  const code = movie.original_language;
  const intlName = code ? new Intl.DisplayNames([lang, "en"], { type: "language" }).of(code) : "";
  const languageName = code
    ? (i18n.getResource(lang, "translation", `languages.${code}`) as string | undefined) ??
      (intlName === code ? code.toUpperCase() : intlName)
    : "";

  const facts = [
    { label: t("movie.release"), value: formatDate(movie.release_date, lang) },
    {
      label: t("movie.status"),
      value: movie.status ? t(`statuses.${movie.status}`, { defaultValue: movie.status }) : "",
    },
    { label: t("movie.language"), value: languageName },
    { label: t("movie.budget"), value: formatMoney(movie.budget, lang) },
    { label: t("movie.revenue"), value: formatMoney(movie.revenue, lang) },
    { label: t("movie.votes"), value: formatNumber(movie.vote_count, lang) },
  ].filter((f) => f.value);

  return (
    <section className="relative isolate">
      <div className="absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden border-b-[3px] border-ink sm:h-[420px] lg:h-[520px]">
        {movie.backdrop_path && (
          <img
            src={tmdbImage(movie.backdrop_path, "w1280")}
            alt=""
            className="ken-burns size-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/10 via-canvas/55 to-canvas" />
      </div>

      <div className="shell grid grid-cols-[108px_1fr] items-end gap-x-5 gap-y-8 pt-[150px] sm:grid-cols-[180px_1fr] sm:gap-x-8 sm:pt-[210px] md:grid-cols-[240px_1fr] md:items-start lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:pt-[260px]">
        <div className="card-in border-[3px] border-ink shadow-hard-lg md:row-span-2">
          <Poster path={movie.poster_path} alt={movie.title} size="w500" eager />
        </div>

        <div className="md:pt-14 lg:pt-20">
          <h1 className="font-display text-2xl leading-[1.05] font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl">
            <SplitText text={movie.title} />
          </h1>
          {movie.tagline && (
            <p className="page-in mt-3 text-sm text-muted italic sm:text-base">{movie.tagline}</p>
          )}
          <div className="page-in mt-4 flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
            <Rating value={movie.vote_average} variant="overlay" />
            <span className="border-2 border-ink px-1.5 py-0.5">{getYear(movie.release_date)}</span>
            {runtime && (
              <span className="border-2 border-ink px-1.5 py-0.5">{t("movie.duration", runtime)}</span>
            )}
          </div>
        </div>

        <div className="page-in col-span-2 md:col-span-1 md:col-start-2">
          {movie.genres.length > 0 && (
            <p className="text-sm font-bold text-accent-text uppercase">
              {movie.genres.map(genreLabel).join(" / ")}
            </p>
          )}

          {movie.overview && (
            <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-ink/85 sm:text-base">
              {movie.overview}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-4">
            <BookmarkButton movie={movie} variant="button" />
            {movie.homepage && (
              <a href={movie.homepage} target="_blank" rel="noreferrer" className={buttonClass("ghost")}>
                {t("movie.homepage")}
                <ArrowUpRight className="size-[18px]" strokeWidth={2.5} />
              </a>
            )}
          </div>

          {facts.length > 0 && (
            <dl className="mt-9 grid grid-cols-2 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-3">
              {facts.map((f) => (
                <Fact key={f.label} label={f.label} value={f.value} />
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
});
