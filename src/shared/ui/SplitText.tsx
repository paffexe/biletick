import { memo, type CSSProperties } from "react";

export const SplitText = memo(({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span aria-label={text} role="text">
    {text.split(" ").map((word, i) => (
      <span key={`${word}-${i}`} className="split-word" aria-hidden>
        <span style={{ "--i": i + delay } as CSSProperties}>{word}</span>
        {" "}
      </span>
    ))}
  </span>
));
