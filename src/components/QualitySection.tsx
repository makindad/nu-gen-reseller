import { Check, FileText } from "lucide-react";
import { quality } from "@/content/site";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

/** Decorative QR-style placeholder. Replace with a real verification QR if desired. */
function QrPlaceholder() {
  const n = 25;
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8);
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inFinder(x, y) && rand() > 0.52) cells.push({ x, y });
    }
  }
  const finder = (fx: number, fy: number) => (
    <g key={`${fx}-${fy}`}>
      <rect x={fx} y={fy} width={7} height={7} fill="currentColor" />
      <rect x={fx + 1} y={fy + 1} width={5} height={5} fill="#fff" />
      <rect x={fx + 2} y={fy + 2} width={3} height={3} fill="currentColor" />
    </g>
  );
  return (
    <svg
      viewBox={`-1 -1 ${n + 2} ${n + 2}`}
      className="size-full text-ink"
      role="img"
      aria-label="Verification code placeholder"
    >
      <rect x={-1} y={-1} width={n + 2} height={n + 2} fill="#fff" />
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1.02} height={1.02} fill="currentColor" />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}

function SpecimenPanel() {
  const s = quality.specimen;
  return (
    <div className="border border-ink/90 bg-white">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink">{s.title}</p>
        <p className="font-mono text-[11px] text-muted">Fig. 02</p>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[148px_1fr] sm:gap-7 sm:p-7">
        <div className="relative mx-auto w-[132px] sm:mx-0 sm:w-full">
          <div className="border border-line p-2.5">
            <QrPlaceholder />
          </div>
          {/* scan line */}
          <span
            aria-hidden
            className="absolute inset-x-1 top-1/2 h-px bg-blue/70 shadow-[0_0_10px_2px_rgba(15,95,168,0.25)]"
          />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
            Code placeholder
          </p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {s.fields.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{f.label}</dt>
              <dd className="whitespace-nowrap text-right font-mono text-[13px] text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid border-t border-line sm:grid-cols-2">
        <div className="p-5 sm:border-r sm:border-line sm:p-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Documentation</p>
          <ul className="mt-4 space-y-3">
            {s.documents.map((d) => (
              <li key={d} className="flex items-start gap-3 text-[14px] leading-snug text-ink">
                <FileText aria-hidden className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={1.5} />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-line p-5 sm:border-t-0 sm:p-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Checks</p>
          <ul className="mt-4 space-y-3">
            {s.checks.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[14px] text-ink">
                <span className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-green text-white">
                  <Check aria-hidden className="size-3" strokeWidth={2.75} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {quality.standards.length > 0 && (
        <dl className="grid border-t border-line sm:grid-cols-2">
          {quality.standards.map((st) => (
            <div key={st.label} className="border-b border-line px-5 py-4 last:border-b-0 sm:px-7">
              <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{st.label}</dt>
              <dd className="mt-1 font-mono text-[14px] text-ink">{st.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="border-t border-line bg-paper px-5 py-3 text-[12px] text-muted sm:px-7">{s.caption}</p>
    </div>
  );
}

export function QualitySection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className="border-t border-line bg-paper py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{quality.label}</Eyebrow>
            <SectionHeading id="quality-heading" className="mt-4">
              {quality.heading}
            </SectionHeading>
          </div>
          <p className="text-[17px] leading-[1.65] text-charcoal lg:col-span-5 lg:pb-2">{quality.intro}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <ol className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {quality.pillars.map((p, i) => (
              <Reveal as="li" key={p.code} delay={i * 80} className="bg-white">
                <article className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-green text-white ring-[6px] ring-green/10">
                      <Icon name={p.icon} className="size-[18px]" />
                    </span>
                    <span className="font-mono text-[11px] text-green-ink">{p.code}</span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.015em] text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-charcoal">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SpecimenPanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
