import { benefits } from "@/content/site";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function PartnerBenefits() {
  return (
    <section id="why-nu-gen" aria-labelledby="why-heading" className="bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal className="max-w-[760px]">
          <Eyebrow>{benefits.label}</Eyebrow>
          <SectionHeading id="why-heading" className="mt-4">
            {benefits.heading}
          </SectionHeading>
          <p className="mt-4 text-[17px] leading-[1.65] text-charcoal">{benefits.intro}</p>
        </Reveal>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 80} className="group bg-white">
              <article className="flex h-full flex-col p-6 transition-colors duration-300 hover:bg-paper sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center border border-line bg-white text-blue transition-colors duration-300 group-hover:border-blue">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  <span className="font-serif text-[34px] leading-none text-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-[20px] sm:mt-6 font-semibold leading-tight tracking-[-0.015em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-charcoal">{b.body}</p>
                <div aria-hidden className="mt-auto pt-5">
                  <span className="block h-px w-8 bg-green transition-all duration-300 group-hover:w-14" />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
