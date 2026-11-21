export const MovieCardSkeleton = () => (
  <div aria-hidden className="animate-pulse">
    <div className="aspect-[2/3] border-2 border-line bg-raised" />
    <div className="mt-3 h-4 w-4/5 bg-raised" />
    <div className="mt-2 h-3 w-1/4 bg-raised" />
  </div>
);
