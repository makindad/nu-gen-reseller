import type { ApplicationPayload } from "./validation";

/**
 * Where the form posts.
 *  - Formspree:   set NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
 *  - Vercel/own:  leave it unset → posts to the built-in /api/reseller-application route
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/reseller-application";

export async function submitApplication(payload: ApplicationPayload): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...payload,
        // Formspree uses these for the notification email
        _subject: `Reseller application — ${payload.company}`,
        _replyto: payload.email,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Submission failed with status ${res.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

/** Fires conversion events if the relevant tags are installed (after cookie consent). */
export function trackLead() {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  try {
    w.fbq?.("track", "Lead", { content_name: "UK Reseller Application" });
    w.gtag?.("event", "generate_lead", { form: "uk_reseller_application" });
    w.dataLayer?.push({ event: "reseller_application_submitted", country_campaign: "UK" });
  } catch {
    /* tracking must never break the form */
  }
}
