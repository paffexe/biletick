import type { ReactNode } from "react";
import { cn } from "../lib";

interface Props {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const SectionHeading = ({ title, action, className }: Props) => (
  <div className={cn("relative mb-7 flex items-end justify-between gap-4 pb-3", className)}>
    <h2 className="font-display text-xl font-bold tracking-tight text-balance uppercase sm:text-2xl lg:text-[1.75rem]">
      {title}
    </h2>
    {action}
    <span aria-hidden className="reveal-rule absolute inset-x-0 bottom-0 h-[3px] bg-ink" />
  </div>
);
