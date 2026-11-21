import { Star } from "lucide-react";
import { cn } from "../lib";

interface Props {
  value?: number | null;
  variant?: "overlay" | "plain";
  className?: string;
}

export const Rating = ({ value, variant = "plain", className }: Props) => {
  if (!value) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono font-bold tabular-nums",
        variant === "overlay"
          ? "border-2 border-ink bg-gold px-1.5 py-0.5 text-[11px] text-[#140e18]"
          : "text-sm text-gold",
        className,
      )}
    >
      <Star className="size-3 fill-current" strokeWidth={0} aria-hidden />
      {value.toFixed(1)}
    </span>
  );
};
