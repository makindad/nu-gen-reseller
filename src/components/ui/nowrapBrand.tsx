import type { ReactNode } from "react";

/** Keeps "NU-GEN" on one line so headings never break at the hyphen. */
export function nowrapBrand(text: ReactNode, keyPrefix = "b"): ReactNode {
  if (typeof text !== "string" || !text.includes("NU-GEN")) return text;
  const parts = text.split("NU-GEN");
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={`${keyPrefix}-${i}`} className="whitespace-nowrap">
            NU-GEN
          </span>,
          part,
        ],
  );
}

/**
 * Renders a heading string. Wrap words in *asterisks* in src/content/site.ts
 * to show them as the green italic accent, e.g. "Partner With NU-GEN *Research*".
 */
export function richHeading(text: ReactNode): ReactNode {
  if (typeof text !== "string") return text;
  return text.split(/\*([^*]+)\*/).map((seg, i) =>
    i % 2 === 1 ? (
      <em key={i} className="accent">
        {nowrapBrand(seg, `a${i}`)}
      </em>
    ) : (
      <span key={i}>{nowrapBrand(seg, `t${i}`)}</span>
    ),
  );
}
