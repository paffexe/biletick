import { cn } from "../lib";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  ghost: "bg-raised/80 text-ink hover:bg-raised",
  glass: "bg-white/12 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20",
  text: "px-0 text-accent-text hover:underline underline-offset-4",
};

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors",
    variants[variant],
    className,
  );
