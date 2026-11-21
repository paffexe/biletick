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
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search.placeholder")}
        aria-label={t("search.placeholder")}
        className="h-14 w-full rounded-full border border-line bg-surface pl-14 pr-14 text-base outline-none transition-colors placeholder:text-muted focus:border-accent sm:h-16 sm:text-lg [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <LoaderCircle className="mr-2 size-5 animate-spin text-muted" />
        ) : (
          value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label={t("search.clear")}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-raised hover:text-ink"
            >
              <X className="size-5" />
            </button>
          )
        )}
      </div>
    </div>
  );
});
