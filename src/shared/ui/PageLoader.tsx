export const PageLoader = () => (
  <div className="grid min-h-[60svh] place-items-center" role="status" aria-live="polite">
    <div className="flex gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-3 animate-bounce bg-accent"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  </div>
);
