import { cn } from "../lib";

const variants = {
  primary: "press border-2 border-ink bg-accent text-white shadow-hard",
  ghost: "press border-2 border-ink bg-surface text-ink shadow-hard",
  text: "h-auto border-b-2 border-current px-0 pb-0.5 text-accent-text transition-colors hover:text-ink",
};

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(
    "inline-flex h-12 items-center justify-center gap-2 px-5 text-sm font-bold tracking-wide uppercase",
    variants[variant],
    className,
  );
