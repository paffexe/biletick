import { memo } from "react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useGenreLabel, useGenres } from "@/entities/movie";
import { SORT_OPTIONS, useMovieFilters } from "../model/useMovieFilters";

const SORT_LABELS: Record<(typeof SORT_OPTIONS)[number], string> = {
  "popularity.desc": "movies.sort.popularity",
  "primary_release_date.desc": "movies.sort.newest",
  "primary_release_date.asc": "movies.sort.oldest",
  "vote_average.desc": "movies.sort.rating",
};

export const MovieFilters = memo(() => {
  const { t } = useTranslation();
  const { data: genres } = useGenres();
  const genreLabel = useGenreLabel();
  const { sort, genre, from, to, update, reset, isDirty } = useMovieFilters();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-center">
      <Select
        value={genre}
        onChange={(value) => update({ genres: value })}
        aria-label={t("movies.genre")}
        className="w-full lg:w-56"
        size="large"
        showSearch
        optionFilterProp="label"
        options={[
          { value: "", label: t("movies.allGenres") },
          ...(genres ?? [])
            .map((g) => ({ value: String(g.id), label: genreLabel(g) }))
            .sort((a, b) => a.label.localeCompare(b.label)),
        ]}
      />
      <Select
        value={sort}
        onChange={(value) => update({ sort: value })}
        aria-label={t("movies.sort.label")}
        className="w-full lg:w-56"
        size="large"
        options={SORT_OPTIONS.map((value) => ({ value, label: t(SORT_LABELS[value]) }))}
      />
      <DatePicker.RangePicker
        picker="year"
        size="large"
        className="w-full sm:col-span-2 lg:w-64"
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
          className="page-in inline-flex h-10 items-center gap-1.5 self-start text-xs font-bold tracking-wide text-accent-text uppercase hover:text-ink lg:ml-2 lg:self-auto"
        >
          <X className="size-4" strokeWidth={2.5} />
          {t("movies.reset")}
        </button>
      )}
    </div>
  );
});
