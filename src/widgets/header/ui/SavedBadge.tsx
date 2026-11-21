import { useSelector } from "react-redux";
import { selectBookmarks } from "@/features/bookmark";
import { cn } from "@/shared/lib";

export const SavedBadge = ({ className }: { className?: string }) => {
  const count = useSelector(selectBookmarks).length;
  if (!count) return null;

  return (
    <span
      className={cn(
        "grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-white tabular-nums",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
