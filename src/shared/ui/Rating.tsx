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
        "inline-flex items-center gap-1 font-semibold tabular-nums",
        variant === "overlay"
          ? "rounded-full bg-black/60 px-2 py-0.5 text-xs text-gold backdrop-blur-sm"
          : "text-sm text-gold",
        className,
      )}
    >
      <Star className="size-3.5 fill-current" strokeWidth={0} aria-hidden />
      {value.toFixed(1)}
    </span>
  );
};
