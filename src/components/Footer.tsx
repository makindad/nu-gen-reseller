import { footer, nav, primaryCta, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <Container className="pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Logo sits on a white plate so the supplied asset is shown with its original colours */}
            <div className="inline-flex bg-white p-4">
              <Logo size="footer" />
            </div>
            <p className="mt-7 text-[18px] font-semibold tracking-[-0.01em]">{site.name}</p>
            <p className="mt-2 max-w-[380px] text-[15px] leading-[1.6] text-white/65">{footer.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">On this page</p>
            <ul className="mt-5 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">Partnerships</p>
            <p className="mt-5 text-[15px] leading-[1.6] text-white/70">
              Reseller and wholesale enquiries are handled through the application form.
            </p>
            <a
              href={primaryCta.href}
              className="mt-4 inline-flex min-h-10 items-center text-[15px] font-medium text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white"
            >
              {primaryCta.label}
            </a>
          </div>
        </div>

        <div className="border-b border-white/10 py-7">
          <p className="max-w-[760px] text-[13px] leading-[1.6] text-white/60">
            <span className="mr-2 font-medium uppercase tracking-[0.12em] text-white/80">Research use notice.</span>
            {footer.notice}
          </p>
        </div>

        <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/50">{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {footer.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="inline-flex min-h-10 items-center text-[13px] text-white/65 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
