import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Movie } from "@/entities/movie";
import { cn } from "@/shared/lib";
import { buttonClass } from "@/shared/ui";
import { selectIsBookmarked, toggleBookmark } from "../model/slice";

interface Props {
  movie: Movie;
  variant?: "overlay" | "button";
  className?: string;
}

export const BookmarkButton = memo(({ movie, variant = "overlay", className }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const saved = useSelector(selectIsBookmarked(movie.id));
  const Icon = saved ? BookmarkCheck : Bookmark;

  const label = saved
    ? t("bookmark.remove", { title: movie.title })
    : t("bookmark.add", { title: movie.title });

  if (variant === "overlay") {
    return (
      <button
        type="button"
        onClick={() => dispatch(toggleBookmark(movie))}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        className={cn(
          "grid size-9 place-items-center border-2 border-ink transition duration-200 active:scale-90",
          saved
            ? "bg-accent text-white"
            : "bg-[#140e18] text-white hover:bg-accent md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
          className,
        )}
      >
        <Icon className="size-[18px]" strokeWidth={2.25} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleBookmark(movie))}
      aria-pressed={saved}
      aria-label={label}
      className={buttonClass(saved ? "primary" : "ghost", className)}
    >
      <Icon className="size-[18px]" strokeWidth={2.25} />
      {saved ? t("bookmark.saved") : t("bookmark.save")}
    </button>
  );
});
