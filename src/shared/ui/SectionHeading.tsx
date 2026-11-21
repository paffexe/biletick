import type { ReactNode } from "react";
import { cn } from "../lib";

interface Props {
  title: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

export const SectionHeading = ({ title, action, as: Tag = "h2", className }: Props) => (
  <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
    <Tag
      className={cn(
        "font-display font-semibold tracking-tight text-balance",
        Tag === "h1" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-xl lg:text-2xl",
      )}
    >
      {title}
    </Tag>
    {action}
  </div>
);
