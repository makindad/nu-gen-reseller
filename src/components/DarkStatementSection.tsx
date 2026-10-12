import { primaryCta, statement } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { richHeading } from "@/components/ui/nowrapBrand";
import { Reveal } from "@/components/ui/Reveal";

/** Concentric measurement rings — a quiet, instrument-like graphic. */
function RingGraphic() {
  const ticks = Array.from({ length: 120 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 600" aria-hidden className="h-full w-full" fill="none">
      <g stroke="#1264AD" strokeOpacity="0.55">
        <circle cx="300" cy="300" r="280" strokeOpacity="0.25" />
        <circle cx="300" cy="300" r="220" />
        <circle cx="300" cy="300" r="160" strokeOpacity="0.35" />
        <circle cx="300" cy="300" r="100" strokeOpacity="0.25" />
        <line x1="0" y1="300" x2="600" y2="300" strokeOpacity="0.2" />
        <line x1="300" y1="0" x2="300" y2="600" strokeOpacity="0.2" />
      </g>
      <g stroke="#FFFFFF" strokeOpacity="0.35">
        {ticks.map((i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const long = i % 10 === 0;
          const r1 = 220;
          const r2 = long ? 238 : 228;
          return (
            <line
              key={i}
              x1={(300 + Math.cos(a) * r1).toFixed(2)}
              y1={(300 + Math.sin(a) * r1).toFixed(2)}
              x2={(300 + Math.cos(a) * r2).toFixed(2)}
              y2={(300 + Math.sin(a) * r2).toFixed(2)}
              strokeOpacity={long ? 0.6 : 0.25}
            />
          );
        })}
      </g>
      {/* verified marker */}
      <g>
        <circle cx={300 + Math.cos(-0.7) * 220} cy={300 + Math.sin(-0.7) * 220} r="7" fill="#4F8F32" />
        <circle
          cx={300 + Math.cos(-0.7) * 220}
          cy={300 + Math.sin(-0.7) * 220}
          r="16"
          stroke="#4F8F32"
          strokeOpacity="0.5"
        />
      </g>
      <circle cx="300" cy="300" r="3" fill="#FFFFFF" fillOpacity="0.7" />
    </svg>
  );
}

export function DarkStatementSection() {
  return (
    <section aria-labelledby="statement-heading" className="on-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-tech-grid-dark absolute inset-0" />
      <div aria-hidden className="glow-green-dark pointer-events-none absolute -left-60 -top-60 size-[720px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 size-[560px] -translate-y-1/2 opacity-30 sm:-right-24 sm:opacity-50 lg:opacity-70 sm:size-[680px] lg:right-[-80px] lg:size-[760px]"
      >
        <RingGraphic />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <Reveal className="max-w-[820px]">
          <Eyebrow tone="light">{statement.label}</Eyebrow>
          <h2
            id="statement-heading"
            className="mt-5 text-balance text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[52px] lg:text-[64px]"
          >
            {richHeading(statement.heading)}
          </h2>
          <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-white/75 sm:text-lg">{statement.body}</p>

          <Button href={primaryCta.href} variant="inverse" className="mt-8">
            {primaryCta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
