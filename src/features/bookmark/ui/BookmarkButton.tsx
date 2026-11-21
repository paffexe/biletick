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
  variant?: "overlay" | "button" | "glass";
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
          "grid size-9 place-items-center rounded-full backdrop-blur-sm transition-colors",
          saved ? "bg-accent text-white" : "bg-black/55 text-white hover:bg-black/75",
          className,
        )}
      >
        <Icon className="size-[18px]" strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleBookmark(movie))}
      aria-pressed={saved}
      aria-label={label}
      className={buttonClass(variant === "glass" ? "glass" : "ghost", className)}
    >
      <Icon className={cn("size-[18px]", saved && "text-accent-text")} />
      {saved ? t("bookmark.saved") : t("bookmark.save")}
    </button>
  );
});
