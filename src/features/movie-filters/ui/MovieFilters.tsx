import { memo } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ArrowDownUp, RotateCcw } from "lucide-react";
import { useGenres } from "@/entities/movie";
import { cn } from "@/shared/lib";
import { SORT_OPTIONS, useMovieFilters } from "../model/useMovieFilters";

const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
  "popularity.desc": "movies.sort.popularity",
  "primary_release_date.desc": "movies.sort.newest",
  "primary_release_date.asc": "movies.sort.oldest",
  "vote_average.desc": "movies.sort.rating",
};

const chip = (active: boolean) =>
  cn(
    "shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
    active ? "bg-ink text-canvas" : "bg-raised/70 text-ink/75 hover:bg-raised hover:text-ink",
  );

export const MovieFilters = memo(() => {
  const { t } = useTranslation();
  const { data: genres } = useGenres();
  const { sort, genre, from, to, update, reset, isDirty } = useMovieFilters();

  return (
    <div className="space-y-4">
      <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex gap-2 pb-1 lg:flex-wrap" role="group" aria-label={t("movies.genre")}>
          <button
            type="button"
            className={chip(!genre)}
            aria-pressed={!genre}
            onClick={() => update({ genres: "" })}
          >
            {t("movies.allGenres")}
          </button>
          {genres?.map((g) => (
            <button
              key={g.id}
              type="button"
              className={chip(genre === String(g.id))}
              aria-pressed={genre === String(g.id)}
              onClick={() => update({ genres: String(g.id) })}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          value={sort}
          onChange={(value) => update({ sort: value })}
          prefix={<ArrowDownUp className="size-4 text-muted" />}
          aria-label={t("movies.sort.label")}
          className="w-full sm:w-56"
          size="large"
          options={SORT_OPTIONS.map((value) => ({ value, label: t(SORT_LABELS[value]) }))}
        />
        <DatePicker.RangePicker
          picker="year"
          size="large"
          className="w-full sm:w-64"
          placeholder={[t("movies.fromYear"), t("movies.toYear")]}
          value={from || to ? [from ? dayjs(from) : null, to ? dayjs(to) : null] : null}
          allowEmpty={[true, true]}
          disabledDate={(d) => d.year() > dayjs().year() + 2}
          onChange={(dates) =>
            update({
              from: dates?.[0]?.format("YYYY") ?? "",
              to: dates?.[1]?.format("YYYY") ?? "",
            })
          }
        />
        {isDirty && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-2 self-start rounded-full px-3 text-sm font-semibold text-accent-text transition-colors hover:bg-raised sm:self-auto"
          >
            <RotateCcw className="size-4" />
            {t("movies.reset")}
          </button>
        )}
      </div>
    </div>
  );
});
