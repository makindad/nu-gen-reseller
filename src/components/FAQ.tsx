"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <li className="border-b border-line">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-start gap-5 py-5 text-left sm:gap-8"
        >
          <span className="mt-1 font-mono text-[12px] text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 text-[17px] font-medium leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-blue sm:text-[19px]">
            {q}
          </span>
          <span
            aria-hidden
            className={`mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open ? "rotate-45 border-green bg-green text-white" : "border-line text-ink group-hover:border-ink"
            }`}
          >
            <Plus className="size-4" strokeWidth={1.75} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="pb-6 pl-[35px] pr-12 text-[16px] leading-[1.65] text-charcoal sm:pl-[47px]">{a}</p>
        </div>
      </div>
    </li>
  );
}

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <Eyebrow>{faq.label}</Eyebrow>
          <SectionHeading id="faq-heading" className="mt-4">
            {faq.heading}
          </SectionHeading>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-8">
          <ul className="border-t border-line">
            {faq.items.map((item, i) => (
              <Item key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
