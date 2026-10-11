import type { ReactNode } from "react";

/** Keeps "NU-GEN" on one line so headings never break at the hyphen. */
export function nowrapBrand(text: ReactNode): ReactNode {
  if (typeof text !== "string" || !text.includes("NU-GEN")) return text;
  const parts = text.split("NU-GEN");
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} className="whitespace-nowrap">
            NU-GEN
          </span>,
          part,
        ],
  );
}
