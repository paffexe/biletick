export const MovieCardSkeleton = () => (
  <div aria-hidden className="animate-pulse">
    <div className="aspect-[2/3] rounded-xl bg-raised" />
    <div className="mt-3 h-4 w-4/5 rounded bg-raised" />
    <div className="mt-2 h-3 w-1/4 rounded bg-raised" />
  </div>
);
