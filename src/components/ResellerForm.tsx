"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Check, ChevronDown, LoaderCircle, TriangleAlert } from "lucide-react";
import { application, site } from "@/content/site";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  TRACKING_FIELDS,
  validateApplication,
  type ApplicationFields,
  type FieldErrors,
  type TrackingField,
} from "@/lib/validation";
import { submitApplication, trackLead } from "@/lib/submit";

type Status = "idle" | "submitting" | "success" | "error";

const initialValues: ApplicationFields = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  country: application.defaultCountry,
  businessType: "",
  monthlyVolume: "",
  about: "",
  consent: false,
};

const FIELD_ORDER: (keyof ApplicationFields)[] = [
  "fullName",
  "company",
  "email",
  "phone",
  "website",
  "country",
  "businessType",
  "monthlyVolume",
  "about",
  "consent",
];

const emptyTracking = Object.fromEntries(TRACKING_FIELDS.map((k) => [k, ""])) as Record<TrackingField, string>;

/** Reads UTM parameters (persisted for the session in case of in-page reloads), referrer and landing page. */
function readTracking(): Record<TrackingField, string> {
  const params = new URLSearchParams(window.location.search);
  const out = { ...emptyTracking };
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const fromUrl = params.get(key);
    let value = fromUrl ?? "";
    try {
      if (fromUrl) sessionStorage.setItem(`ng_${key}`, fromUrl);
      else value = sessionStorage.getItem(`ng_${key}`) ?? "";
    } catch {
      /* storage unavailable — URL value is still used */
    }
    out[key] = value;
  }
  out.referrer = document.referrer || "";
  out.landing_page = window.location.href;
  out.country_campaign = site.countryCampaign;
  return out;
}

/* ───────────── field primitives ───────────── */

const inputBase =
  "block w-full rounded-xs border bg-white px-4 text-[16px] text-ink placeholder:text-muted/70 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue/20";
const inputState = (invalid: boolean) =>
  invalid ? "border-error focus:border-error" : "border-line-strong hover:border-ink/40 focus:border-blue";

function Field({
  id,
  label,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[13px] font-medium text-ink">
        <span>
          {label}
          <span aria-hidden className="ml-0.5 text-blue">
            *
          </span>
        </span>
        {hint && <span className="text-[12px] font-normal text-muted">{hint}</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-error">
          <TriangleAlert aria-hidden className="mt-px size-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        strokeWidth={1.75}
      />
    </div>
  );
}

/* ───────────── form ───────────── */

export function ResellerForm() {
  const [values, setValues] = useState<ApplicationFields>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ApplicationFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [tracking, setTracking] = useState<Record<TrackingField, string>>(emptyTracking);
  const [honeypot, setHoneypot] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Client-only values (URL, referrer) — read after mount to avoid hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTracking(readTracking());
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const options = {
    businessTypes: application.businessTypes,
    volumes: application.volumes,
    countries: application.countries,
  };

  const update = (name: keyof ApplicationFields, value: string | boolean) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || errors[name]) {
      const all = validateApplication(next, options);
      setErrors((prev) => ({ ...prev, [name]: all[name] }));
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    update(name as keyof ApplicationFields, type === "checkbox" ? (e.target as HTMLInputElement).checked : value);
  };

  const onBlur = (e: { target: { name: string } }) => {
    const name = e.target.name as keyof ApplicationFields;
    setTouched((t) => ({ ...t, [name]: true }));
    const all = validateApplication(values, options);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const all = validateApplication(values, options);
    setErrors(all);
    setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])));

    const firstInvalid = FIELD_ORDER.find((k) => all[k]);
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    try {
      await submitApplication({
        ...values,
        ...tracking,
        landing_page: tracking.landing_page || window.location.href,
        country_campaign: site.countryCampaign,
        company_url: honeypot,
      });
      setStatus("success");
      trackLead();
    } catch {
      setStatus("error");
    }
  };

  const invalid = (k: keyof ApplicationFields) => Boolean(errors[k]);
  const describedBy = (k: keyof ApplicationFields) => (errors[k] ? `${k}-error` : undefined);
  const errorCount = Object.values(errors).filter(Boolean).length;
  const submitting = status === "submitting";

  return (
    <section
      id="apply"
      aria-labelledby="apply-heading"
      className="border-t border-line bg-paper py-20 sm:py-28 lg:py-32"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Intro column */}
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Eyebrow>{application.label}</Eyebrow>
          <SectionHeading id="apply-heading" className="mt-6">
            {application.heading}
          </SectionHeading>
          <p className="mt-6 text-[17px] leading-[1.65] text-charcoal">{application.body}</p>

          <ol className="mt-10 hidden border-t border-line lg:block">
            {application.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[40px_1fr] gap-3 border-b border-line py-5">
                <span className="font-mono text-[12px] leading-6 text-blue">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-[14px] leading-[1.55] text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Form column */}
        <Reveal delay={100} className="lg:col-span-7">
          <div className="border border-line bg-white">
            {status === "success" ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="flex min-h-[360px] flex-col items-start justify-center p-7 sm:min-h-[520px] focus:outline-none sm:p-12"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-green text-white">
                  <Check aria-hidden className="size-6" strokeWidth={2.25} />
                </span>
                <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  Reference: UK reseller application
                </p>
                <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[32px]">
                  {application.success.heading}
                </h3>
                <p className="mt-4 max-w-[520px] text-[17px] leading-[1.65] text-charcoal">
                  {application.success.body}
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                noValidate
                onSubmit={onSubmit}
                aria-describedby="form-required-note"
                className="p-6 sm:p-10"
              >
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink">Reseller application</p>
                  <p id="form-required-note" className="text-[12px] text-muted">
                    <span className="text-blue">*</span> Required
                  </p>
                </div>

                {status === "error" && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="mt-6 flex gap-3 border border-error/30 bg-error/[0.04] p-4 focus:outline-none"
                  >
                    <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-error" strokeWidth={1.75} />
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{application.error.heading}</p>
                      <p className="mt-1 text-[14px] leading-[1.55] text-charcoal">{application.error.body}</p>
                    </div>
                  </div>
                )}

                <p aria-live="polite" className="sr-only">
                  {errorCount > 0
                    ? `There ${errorCount === 1 ? "is 1 field" : `are ${errorCount} fields`} to correct.`
                    : ""}
                </p>

                <fieldset disabled={submitting} className="mt-7 grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <legend className="sr-only">Your business details</legend>

                  <Field id="fullName" label="Full Name" error={errors.fullName}>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("fullName")}
                      aria-describedby={describedBy("fullName")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("fullName"))} h-12`}
                    />
                  </Field>

                  <Field id="company" label="Company / Business Name" error={errors.company}>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("company")}
                      aria-describedby={describedBy("company")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("company"))} h-12`}
                    />
                  </Field>

                  <Field id="email" label="Business Email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="name@company.co.uk"
                      value={values.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("email")}
                      aria-describedby={describedBy("email")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("email"))} h-12`}
                    />
                  </Field>

                  <Field id="phone" label="Phone Number" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+44"
                      value={values.phone}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("phone")}
                      aria-describedby={describedBy("phone")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("phone"))} h-12`}
                    />
                  </Field>

                  <Field
                    id="website"
                    label="Business Website or Social Page"
                    hint="URL or @handle"
                    error={errors.website}
                    className="sm:col-span-2"
                  >
                    <input
                      id="website"
                      name="website"
                      type="text"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="yourcompany.co.uk"
                      value={values.website}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("website")}
                      aria-describedby={describedBy("website")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("website"))} h-12`}
                    />
                  </Field>

                  <Field id="country" label="Country" error={errors.country}>
                    <SelectWrap>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        value={values.country}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid("country")}
                        aria-describedby={describedBy("country")}
                        aria-required
                        className={`${inputBase} ${inputState(invalid("country"))} h-12 appearance-none pr-10`}
                      >
                        {application.countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </SelectWrap>
                  </Field>

                  <Field id="businessType" label="Business Type" error={errors.businessType}>
                    <SelectWrap>
                      <select
                        id="businessType"
                        name="businessType"
                        value={values.businessType}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid("businessType")}
                        aria-describedby={describedBy("businessType")}
                        aria-required
                        className={`${inputBase} ${inputState(invalid("businessType"))} h-12 appearance-none pr-10 ${
                          values.businessType ? "" : "text-muted"
                        }`}
                      >
                        <option value="" disabled>
                          Select business type
                        </option>
                        {application.businessTypes.map((b) => (
                          <option key={b} value={b} className="text-ink">
                            {b}
                          </option>
                        ))}
                      </select>
                    </SelectWrap>
                  </Field>

                  <Field
                    id="monthlyVolume"
                    label="Estimated Monthly Order Volume"
                    error={errors.monthlyVolume}
                    className="sm:col-span-2"
                  >
                    <SelectWrap>
                      <select
                        id="monthlyVolume"
                        name="monthlyVolume"
                        value={values.monthlyVolume}
                        onChange={onChange}
                        onBlur={onBlur}
                        aria-invalid={invalid("monthlyVolume")}
                        aria-describedby={describedBy("monthlyVolume")}
                        aria-required
                        className={`${inputBase} ${inputState(invalid("monthlyVolume"))} h-12 appearance-none pr-10 ${
                          values.monthlyVolume ? "" : "text-muted"
                        }`}
                      >
                        <option value="" disabled>
                          Select estimated volume
                        </option>
                        {application.volumes.map((v) => (
                          <option key={v} value={v} className="text-ink">
                            {v}
                          </option>
                        ))}
                      </select>
                    </SelectWrap>
                  </Field>

                  <Field
                    id="about"
                    label="Tell us briefly about your business"
                    hint={`${values.about.length}/2000`}
                    error={errors.about}
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="about"
                      name="about"
                      rows={5}
                      maxLength={2000}
                      placeholder="How you trade, who your customers are, and the channels you sell through."
                      value={values.about}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={invalid("about")}
                      aria-describedby={describedBy("about")}
                      aria-required
                      className={`${inputBase} ${inputState(invalid("about"))} min-h-[140px] resize-y py-3 leading-[1.55]`}
                    />
                  </Field>

                  {/* Honeypot — hidden from people and assistive tech */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company_url">Leave this field empty</label>
                    <input
                      id="company_url"
                      name="company_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Campaign attribution */}
                  {TRACKING_FIELDS.map((k) => (
                    <input key={k} type="hidden" name={k} value={tracking[k]} />
                  ))}

                  <div className="sm:col-span-2">
                    <label htmlFor="consent" className="flex cursor-pointer items-start gap-3.5">
                      <span className="relative mt-0.5 inline-flex size-5 shrink-0">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={values.consent}
                          onChange={onChange}
                          onBlur={onBlur}
                          aria-invalid={invalid("consent")}
                          aria-describedby={describedBy("consent")}
                          aria-required
                          className={`peer size-5 cursor-pointer appearance-none rounded-xs border bg-white transition-colors checked:border-blue checked:bg-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                            invalid("consent") ? "border-error" : "border-line-strong hover:border-ink/50"
                          }`}
                        />
                        <Check
                          aria-hidden
                          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 peer-checked:opacity-100"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-[14px] leading-[1.55] text-charcoal">
                        {application.consent}
                        <span aria-hidden className="ml-0.5 text-blue">
                          *
                        </span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" className="mt-2 flex items-start gap-1.5 pl-[34px] text-[13px] text-error">
                        <TriangleAlert aria-hidden className="mt-px size-3.5 shrink-0" strokeWidth={2} />
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="mt-9 border-t border-line pt-7">
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xs bg-blue px-7 text-[16px] font-medium text-white transition-colors duration-200 hover:bg-blue-deep disabled:cursor-progress disabled:opacity-85 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle aria-hidden className="size-5 animate-spin" strokeWidth={2} />
                        {application.submittingLabel}
                      </>
                    ) : (
                      application.submitLabel
                    )}
                  </button>
                  <p className="mt-4 text-[13px] leading-[1.55] text-muted">{application.disclaimer}</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
