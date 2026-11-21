import { memo, useRef, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard, MovieCardSkeleton, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { SectionHeading } from "@/shared/ui";

interface Props {
  title: ReactNode;
  action?: ReactNode;
  movies?: Movie[];
  loading?: boolean;
}

const itemClass = "w-[42%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-[18.4%]";

export const MovieRail = memo(({ title, action, movies, loading }: Props) => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: "smooth" });
  };

  if (!loading && !movies?.length) return null;

  return (
    <section>
      <SectionHeading
        title={title}
        action={
          <div className="flex items-center gap-2">
            {action}
            <div className="hidden gap-1 md:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label={t("common.previous")}
                className="grid size-9 place-items-center rounded-full border border-line text-ink/80 transition-colors hover:bg-raised"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label={t("common.next")}
                className="grid size-9 place-items-center rounded-full border border-line text-ink/80 transition-colors hover:bg-raised"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        }
      />
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {loading && !movies
          ? Array.from({ length: 6 }, (_, i) => (
              <li key={i} className={itemClass}>
                <MovieCardSkeleton />
              </li>
            ))
          : movies?.map((movie) => (
              <li key={movie.id} className={itemClass}>
                <MovieCard movie={movie} action={<BookmarkButton movie={movie} />} />
              </li>
            ))}
      </ul>
    </section>
  );
});
