import Image from "next/image";
import { Check } from "lucide-react";
import { hero, primaryCta } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { richHeading } from "@/components/ui/nowrapBrand";

function CornerTicks() {
  const tick = "absolute size-3 border-ink/30";
  return (
    <>
      <span aria-hidden className={`${tick} left-3 top-3 border-l border-t`} />
      <span aria-hidden className={`${tick} right-3 top-3 border-r border-t`} />
      <span aria-hidden className={`${tick} bottom-3 left-3 border-b border-l`} />
      <span aria-hidden className={`${tick} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="glow-green pointer-events-none absolute -right-72 top-40 size-[560px] sm:-right-24 sm:-top-56 sm:size-[760px] lg:-right-40"
      />
      <div
        aria-hidden
        className="glow-green pointer-events-none absolute -bottom-72 -left-64 size-[620px] opacity-60"
      />
      <Container className="relative grid items-center gap-10 pb-12 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-12">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div className="animate-reveal">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1
            id="hero-heading"
            className="mt-5 animate-reveal text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink [animation-delay:80ms] sm:text-[56px] lg:text-[66px] xl:text-[76px]"
          >
            {richHeading(hero.heading)}
          </h1>
          <p className="mt-5 max-w-[560px] animate-reveal text-[17px] leading-[1.6] text-charcoal [animation-delay:160ms] sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-8 flex animate-reveal flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary" icon="down">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="mt-5 flex animate-reveal items-center gap-2 text-[13px] text-muted [animation-delay:300ms]">
            <span aria-hidden className="inline-block size-1.5 rounded-full bg-green" />
            {hero.qualifier}
          </p>
        </div>

        {/* Product display composition */}
        <div className="animate-reveal [animation-delay:200ms] lg:col-span-6">
          <figure className="relative">
            <div className="bg-tech-grid relative aspect-square w-full overflow-hidden border border-line bg-paper sm:aspect-[4/3] lg:aspect-[6/5]">
              <CornerTicks />

              {/* Plinth line */}
              <span aria-hidden className="absolute inset-x-[8%] bottom-[22%] h-px sm:bottom-[17%] bg-ink/15" />

              {/* Secondary products (behind) */}
              <div className="absolute bottom-[20.5%] left-[-2%] sm:bottom-[15.5%] w-[44%] sm:left-[2%] sm:w-[40%]">
                <Image
                  src={hero.images.secondary.src}
                  alt={hero.images.secondary.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 1024px) 22vw, 44vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute bottom-[20.5%] right-[-2%] sm:bottom-[15.5%] w-[44%] sm:right-[2%] sm:w-[40%]">
                <Image
                  src={hero.images.tertiary.src}
                  alt={hero.images.tertiary.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 1024px) 22vw, 44vw"
                  className="h-auto w-full"
                />
              </div>
              {/* Primary product (front, centre) */}
              <div className="absolute bottom-[18%] left-1/2 w-[54%] sm:bottom-[13%] -translate-x-1/2 sm:w-[56%]">
                <Image
                  src={hero.images.primary.src}
                  alt={hero.images.primary.alt}
                  width={800}
                  height={1000}
                  preload
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="h-auto w-full"
                />
              </div>

              {/* Annotations */}
              <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:left-7 sm:top-7 sm:text-[11px]">
                Fig. 01 — Range overview
              </div>

              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 sm:bottom-6 sm:left-7 sm:right-7">
                <div className="border border-line bg-white/90 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted sm:text-[10px]">
                    {hero.annotations.batchLabel}
                  </p>
                  <p className="font-mono text-[12px] text-ink sm:text-[13px]">{hero.annotations.batchValue}</p>
                </div>
                <div className="flex items-center gap-2 border border-line bg-white/90 px-3 py-2 backdrop-blur-sm">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-green text-white">
                    <Check aria-hidden className="size-3" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted sm:text-[10px]">
                      {hero.annotations.statusLabel}
                    </p>
                    <p className="text-[12px] font-medium text-ink sm:text-[13px]">{hero.annotations.statusValue}</p>
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-right text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-muted">
              <span className="text-left">NU-GEN Research</span>
              <span>Packaging shown for presentation</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
