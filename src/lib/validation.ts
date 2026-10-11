/**
 * Shared validation for the reseller application.
 * Used by the form (client) and the API route (server) so rules never drift.
 */

export const TRACKING_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer",
  "landing_page",
  "country_campaign",
] as const;

export type TrackingField = (typeof TRACKING_FIELDS)[number];

export type ApplicationFields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  businessType: string;
  monthlyVolume: string;
  about: string;
  consent: boolean;
};

export type ApplicationPayload = ApplicationFields &
  Record<TrackingField, string> & {
    /** Honeypot — must stay empty. */
    company_url?: string;
  };

export type FieldErrors = Partial<Record<keyof ApplicationFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string) {
  return EMAIL_RE.test(value.trim()) && value.trim().length <= 254;
}

export function isValidPhone(value: string) {
  const v = value.trim();
  if (!/^[+()\d\s.-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/** Accepts a domain/URL (example.co.uk, https://…) or a social handle (@business). */
export function isValidWebsiteOrSocial(value: string) {
  const v = value.trim();
  if (/^@[\w.]{2,}$/.test(v)) return true;
  return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v);
}

export function validateApplication(
  data: ApplicationFields,
  options: { businessTypes: readonly string[]; volumes: readonly string[]; countries: readonly string[] },
): FieldErrors {
  const errors: FieldErrors = {};
  const t = (s: string) => (s ?? "").trim();

  if (t(data.fullName).length < 2) errors.fullName = "Please enter your full name.";
  if (t(data.company).length < 2) errors.company = "Please enter your company or business name.";

  if (!t(data.email)) errors.email = "Please enter your business email address.";
  else if (!isValidEmail(data.email)) errors.email = "Please enter a valid email address, e.g. name@company.co.uk.";

  if (!t(data.phone)) errors.phone = "Please enter a phone number.";
  else if (!isValidPhone(data.phone)) errors.phone = "Please enter a valid phone number, including the area code.";

  if (!t(data.website)) errors.website = "Please enter your business website or social page.";
  else if (!isValidWebsiteOrSocial(data.website))
    errors.website = "Please enter a website (e.g. yourcompany.co.uk) or social handle (e.g. @yourbusiness).";

  if (!options.countries.includes(data.country)) errors.country = "Please select your country.";
  if (!options.businessTypes.includes(data.businessType)) errors.businessType = "Please select your business type.";
  if (!options.volumes.includes(data.monthlyVolume))
    errors.monthlyVolume = "Please select an estimated monthly order volume.";

  if (t(data.about).length < 20) errors.about = "Please tell us a little about your business (at least 20 characters).";
  else if (t(data.about).length > 2000) errors.about = "Please keep this under 2,000 characters.";

  if (!data.consent) errors.consent = "Please confirm you agree to be contacted about reseller opportunities.";

  return errors;
}
