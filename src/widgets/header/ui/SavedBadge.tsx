import { useSelector } from "react-redux";
import { selectBookmarks } from "@/features/bookmark";
import { cn } from "@/shared/lib";

export const SavedBadge = ({ className }: { className?: string }) => {
  const count = useSelector(selectBookmarks).length;
  if (!count) return null;

  return (
    <span
      key={count}
      className={cn(
        "grid h-[18px] min-w-[18px] animate-[page-in_0.3s_ease-out] place-items-center bg-accent px-1 font-mono text-[10px] leading-none font-bold text-white tabular-nums",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
