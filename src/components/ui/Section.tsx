import type { ReactNode } from "react";
import { richHeading } from "./nowrapBrand";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

/** Technical eyebrow, e.g. "01 — WHOLESALE". */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] sm:text-xs ${
        tone === "light" ? "text-white/70" : "text-muted"
      } ${className}`}
    >
      <span aria-hidden className={`h-px w-6 ${tone === "light" ? "bg-green-light/70" : "bg-green"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[40px] lg:text-[50px] ${className}`}
    >
      {richHeading(children)}
    </h2>
  );
}
