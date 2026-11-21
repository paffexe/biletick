import type { ReactNode } from "react";
import { SplitText } from "./SplitText";

interface Props {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
}

export const PageTitle = ({ title, meta, action }: Props) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b-[3px] border-ink pb-5">
    <div>
      <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl lg:text-6xl">
        <SplitText text={title} />
      </h1>
      {meta && <p className="page-in mt-3 font-mono text-xs font-bold text-muted uppercase">{meta}</p>}
    </div>
    {action}
  </div>
);
