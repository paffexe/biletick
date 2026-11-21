import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LoaderCircle, Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export const SearchField = memo(({ value, onChange, loading }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="relative border-[3px] border-ink bg-surface shadow-hard-lg transition-shadow focus-within:shadow-hard-accent">
      <Search
        className="pointer-events-none absolute top-1/2 left-5 size-6 -translate-y-1/2"
        strokeWidth={2.5}
        aria-hidden
      />
      <input
        type="search"
        value={value}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search.placeholder")}
        aria-label={t("search.placeholder")}
        className="h-16 w-full bg-transparent pr-16 pl-16 font-display text-lg font-bold outline-none placeholder:font-sans placeholder:font-medium placeholder:text-muted sm:h-20 sm:text-2xl [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute top-1/2 right-3 -translate-y-1/2">
        {loading ? (
          <LoaderCircle className="mr-2 size-6 animate-spin text-accent" />
        ) : (
          value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={t("search.clear")}
              className="grid size-10 place-items-center transition-colors hover:bg-ink hover:text-canvas"
            >
              <X className="size-5" strokeWidth={2.5} />
            </button>
          )
        )}
      </div>
    </div>
  );
});
