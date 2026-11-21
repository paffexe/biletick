import { LoaderCircle } from "lucide-react";

export const PageLoader = () => (
  <div className="grid min-h-[60svh] place-items-center" role="status" aria-live="polite">
    <LoaderCircle className="size-9 animate-spin text-accent" strokeWidth={1.75} />
  </div>
);
