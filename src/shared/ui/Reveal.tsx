import type { ReactNode } from "react";
import { cn, useInView } from "../lib";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}

export const Reveal = ({ children, className, as: Tag = "section" }: Props) => {
  const { ref, inView } = useInView<HTMLElement & HTMLDivElement>();

  return (
    <Tag ref={ref} data-inview={inView} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
};
