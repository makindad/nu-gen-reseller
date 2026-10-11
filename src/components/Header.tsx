"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, primaryCta } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop width
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-line bg-white/95 backdrop-blur-md" : "border-transparent bg-white"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex min-w-0 items-center py-2" aria-label="NU-GEN Research — back to top">
            <Logo size="header" priority />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative py-2 text-[14px] font-medium text-charcoal transition-colors hover:text-blue after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-blue after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href={primaryCta.href} className="!min-h-11 !px-5 !text-[14px]">
                {primaryCta.label}
              </Button>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xs border border-line text-ink transition-colors hover:border-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header> so its fixed positioning
          is relative to the viewport (backdrop-filter on the header would
          otherwise become its containing block). */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-10 pt-4 sm:px-8">
          <ul className="divide-y divide-line border-b border-line">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 text-[22px] font-medium tracking-[-0.015em] text-ink"
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <Button href={primaryCta.href} onClick={() => setOpen(false)} className="mt-8 w-full">
            {primaryCta.label}
          </Button>
          <p className="mt-4 text-center text-[13px] text-muted">For qualified UK business enquiries only.</p>
        </nav>
      </div>
    </>
  );
}
