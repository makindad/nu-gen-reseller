import Image from "next/image";
import { logo } from "@/content/site";

/**
 * Renders the official NU-GEN Research logo from /public/brand/.
 * The asset is displayed at a fixed height with width following its
 * intrinsic ratio, so proportions are never altered.
 * Until `logo.src` is set in src/content/site.ts, a labelled placeholder shows.
 */
export function Logo({
  size = "header",
  tone = "light-bg",
  priority = false,
}: {
  size?: "header" | "footer";
  tone?: "light-bg" | "dark-bg";
  priority?: boolean;
}) {
  const heightClass = size === "header" ? "h-11 sm:h-12" : "h-14 sm:h-16";

  if (!logo.src) {
    return (
      <span
        role="img"
        aria-label={logo.alt}
        className={`inline-flex ${heightClass} items-center border border-dashed px-2.5 font-mono text-[9px] font-medium uppercase leading-tight tracking-[0.06em] sm:text-[10px] ${
          tone === "dark-bg" ? "border-white/40 text-white/70" : "border-blue/50 bg-blue/[0.03] text-blue"
        }`}
      >
        <span className="max-w-[150px] sm:max-w-none">[NU-GEN LOGO — REPLACE WITH UPLOADED ASSET]</span>
      </span>
    );
  }

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      preload={priority}
      unoptimized={logo.src.endsWith(".svg")}
      className={`${heightClass} w-auto`}
    />
  );
}
