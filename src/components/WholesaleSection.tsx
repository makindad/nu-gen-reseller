import { Check } from "lucide-react";
import { wholesale } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function WholesaleSection() {
  return (
    <section id="wholesale" aria-labelledby="wholesale-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow>{wholesale.label}</Eyebrow>
          <SectionHeading id="wholesale-heading" className="mt-4">
            {wholesale.heading}
          </SectionHeading>
          <div className="mt-5 space-y-4 text-[17px] leading-[1.65] text-charcoal">
            {wholesale.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div className="mt-7">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
              {wholesale.suitableHeading}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {wholesale.suitableFor.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-[14px] text-ink"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-green" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <Button href={wholesale.cta.href} variant="secondary" className="mt-8">
            {wholesale.cta.label}
          </Button>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6 lg:pt-10">
          <aside aria-labelledby="partner-profile-heading" className="border border-ink/90 bg-white">
            <div className="flex items-center justify-between border-b border-ink/90 bg-ink px-6 py-4 text-white sm:px-8">
              <h3 id="partner-profile-heading" className="text-[15px] font-semibold tracking-[-0.01em]">
                {wholesale.profile.heading}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-green-light">
                {wholesale.profile.reference}
              </span>
            </div>
            <ol className="divide-y divide-line">
              {wholesale.profile.items.map((item, i) => (
                <li key={item} className="grid grid-cols-[44px_1fr_auto] items-center gap-3 px-6 py-4 sm:px-8">
                  <span className="font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16px] font-medium leading-snug text-ink sm:text-[17px]">{item}</span>
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-green/40 text-green">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.25} />
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
