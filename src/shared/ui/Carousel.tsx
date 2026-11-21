import { useCallback, useEffect, useRef, useState, type Key, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "../lib";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface Props {
  title: ReactNode;
  action?: ReactNode;
  total: number;
  initial?: number;
  step?: number;
  loading?: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  itemClassName: string;
  getKey: (index: number) => Key;
  renderItem: (index: number, stagger: number) => ReactNode;
  skeleton?: ReactNode;
}

const navButton =
  "grid size-10 place-items-center border-2 border-ink shadow-hard-sm transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none";

export const Carousel = ({
  title,
  action,
  total,
  initial = 8,
  step = 2,
  loading,
  hasMore,
  loadingMore,
  onLoadMore,
  itemClassName,
  getKey,
  renderItem,
  skeleton,
}: Props) => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLUListElement>(null);
  const pendingScroll = useRef(false);
  const [shown, setShown] = useState(initial);
  const [edges, setEdges] = useState({ start: true, end: false });
  const visible = Math.min(shown, total);

  const stepWidth = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (first.offsetWidth + gap) * step;
  };

  const slide = (dir: 1 | -1) => {
    const track = trackRef.current;
    const width = stepWidth();
    if (!track || !width) return;
    const target = (Math.round(track.scrollLeft / width) + dir) * width;
    track.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  };

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    if (!pendingScroll.current) return;
    pendingScroll.current = false;
    const frame = requestAnimationFrame(() => slide(1));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, updateEdges]);

  useEffect(() => {
    if (hasMore && !loadingMore && total - shown <= step * 3) onLoadMore?.();
  }, [shown, total, step, hasMore, loadingMore, onLoadMore]);

  useEffect(() => {
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const next = () => {
    if (shown < total || hasMore) {
      pendingScroll.current = true;
      setShown((s) => s + step);
    } else {
      slide(1);
    }
  };

  const prev = () => slide(-1);

  const onScroll = () => {
    updateEdges();
    const track = trackRef.current;
    if (!track || shown >= total) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - stepWidth()) {
      setShown((s) => s + step);
    }
  };

  if (!loading && !total) return null;

  const canNext = !edges.end || shown < total || Boolean(hasMore);
  const waiting = loadingMore && shown > total;

  return (
    <Reveal>
      <SectionHeading
        title={title}
        action={
          <div className="flex shrink-0 items-center gap-4">
            {action}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={loading || edges.start}
                aria-label={t("common.previous")}
                className={cn(navButton, "bg-surface text-ink")}
              >
                <ArrowLeft className="size-5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={loading || !canNext || waiting}
                aria-label={t("common.next")}
                className={cn(navButton, "bg-accent text-white")}
              >
                {waiting ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <ArrowRight className="size-5" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        }
      />
      <ul
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-proximity scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-3 no-scrollbar sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => (
              <li key={i} className={itemClassName}>
                {skeleton}
              </li>
            ))
          : Array.from({ length: visible }, (_, i) => (
              <li key={getKey(i)} className={itemClassName}>
                {renderItem(i, i < initial ? i : i % step)}
              </li>
            ))}
        {waiting &&
          Array.from({ length: step }, (_, i) => (
            <li key={`more-${i}`} className={itemClassName}>
              {skeleton}
            </li>
          ))}
      </ul>
    </Reveal>
  );
};
