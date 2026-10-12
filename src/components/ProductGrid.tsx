import Image from "next/image";
import { productRange, products } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function ProductGrid() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="border-t border-line bg-paper py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{productRange.label}</Eyebrow>
            <SectionHeading id="products-heading" className="mt-4">
              {productRange.heading}
            </SectionHeading>
          </div>
          <p className="text-[17px] leading-[1.65] text-charcoal lg:col-span-5 lg:pb-2">{productRange.intro}</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal as="li" key={p.identifier} delay={(i % 4) * 70} className="group bg-white">
              <article className="flex h-full flex-col">
                <div className="relative aspect-square overflow-hidden bg-[#F1F1EE]">
                  <Image
                    src={p.image}
                    alt={`${p.name} packaging`}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
                    className="object-contain p-[6%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-green-ink sm:left-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    <span aria-hidden className="size-1.5 rounded-full bg-green" />
                    {productRange.badge}
                  </span>
                  <span className="absolute right-3 top-3.5 font-mono text-[10px] text-muted sm:right-4 sm:top-5 sm:text-[11px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-green-ink sm:text-[11px]">
                    {p.identifier}
                  </p>
                  <h3 className="mt-1.5 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[17px]">
                    {p.name}
                  </h3>
                  {p.pack ? <p className="mt-auto pt-3 text-[12px] text-muted sm:text-[13px]">{p.pack}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-col gap-5 border-l-2 border-green bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-[640px] text-[16px] leading-[1.6] text-charcoal">{productRange.note}</p>
          <Button href={productRange.cta.href} className="shrink-0">
            {productRange.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
