import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

type Variant = "primary" | "secondary" | "inverse" | "text";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full text-[15px] font-medium tracking-[-0.005em] transition-colors duration-200 min-h-12 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-white hover:bg-blue-deep active:bg-blue-deep",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  inverse: "bg-white text-ink hover:bg-paper",
  text: "min-h-11 px-0 text-blue underline-offset-4 hover:underline",
};

type Props = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  icon?: "arrow" | "down" | "none";
  children: ReactNode;
};

/**
 * Anchor-based CTA. Every reseller CTA on the page links to #apply.
 * Primary and inverse buttons carry the arrow in a green circle, as on the main NU-GEN site.
 */
export function Button({ variant = "primary", icon = "arrow", className = "", children, ...rest }: Props) {
  const greenCircle = icon === "arrow" && (variant === "primary" || variant === "inverse");
  const padding = variant === "text" ? "" : greenCircle ? "pl-6 pr-2" : "px-6";
  const Icon = icon === "down" ? ArrowDown : icon === "arrow" ? ArrowRight : null;

  return (
    <a className={`${base} ${padding} ${variants[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {greenCircle ? (
        <span
          aria-hidden
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-white transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <ArrowRight className="size-4" strokeWidth={2} />
        </span>
      ) : (
        Icon && (
          <Icon
            aria-hidden
            className={`size-4 shrink-0 transition-transform duration-200 ${
              icon === "down" ? "group-hover:translate-y-0.5" : "group-hover:translate-x-0.5"
            }`}
            strokeWidth={1.75}
          />
        )
      )}
    </a>
  );
}
