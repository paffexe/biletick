import type { ComponentType, ReactNode } from "react";
import { cn } from "../lib";

interface Props {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({ icon: Icon, title, description, action, className }: Props) => (
  <div className={cn("page-in flex flex-col items-center px-4 py-16 text-center sm:py-24", className)}>
    <span className="mb-6 grid size-16 place-items-center border-2 border-ink bg-surface shadow-hard">
      <Icon className="size-7" strokeWidth={1.75} />
    </span>
    <h3 className="font-display text-lg font-bold text-balance uppercase">{title}</h3>
    {description && <p className="mt-2 max-w-sm text-sm text-muted text-pretty">{description}</p>}
    {action && <div className="mt-7">{action}</div>}
  </div>
);
