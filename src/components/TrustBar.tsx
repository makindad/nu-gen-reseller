import { trustItems } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export function TrustBar() {
  return (
    <section aria-label="Credentials" className="border-y border-line bg-paper">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <li
              key={item.title}
              className={`flex items-start gap-3.5 py-5 sm:items-center sm:gap-4 lg:px-8 lg:first:pl-0 ${
                i % 2 === 1 ? "border-l border-line pl-5 sm:pl-8" : "pr-4"
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center border border-line bg-white text-green sm:mt-0 sm:size-10">
                <Icon name={item.icon} className="size-[18px]" />
              </span>
              <div>
                <p className="text-[14px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[15px]">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-muted sm:text-[13px]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
