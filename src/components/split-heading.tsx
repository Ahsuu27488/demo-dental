import type { JSX } from "react";

// A heading whose words rise out of a mask when its section reveals
// (per-word "slide" preset, as in motion-primitives TextEffect, done in CSS).
// Screen readers get the plain text through aria-label.
export default function SplitHeading({
  as: Tag = "h2",
  id,
  text,
  className = "",
}: {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} aria-label={text} className={`split reveal-item ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="word" aria-hidden="true">
          <span style={{ ["--w" as string]: i }}>{word}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
