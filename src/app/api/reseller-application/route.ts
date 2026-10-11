import { application } from "@/content/site";
import { TRACKING_FIELDS, validateApplication, type ApplicationPayload } from "@/lib/validation";

/**
 * Built-in submission endpoint for Vercel deployments.
 *
 * Delivery: set RESELLER_WEBHOOK_URL in Vercel → each valid application is
 * forwarded there as JSON (works with Zapier, Make, n8n, Slack workflows,
 * a CRM inbound webhook, or your own email service).
 *
 * If no destination is configured, production returns 503 so leads are never
 * silently lost. In development the application is logged to the console.
 */
export async function POST(request: Request) {
  let body: Partial<ApplicationPayload>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Return success so they move on.
  if (body.company_url) {
    return Response.json({ ok: true });
  }

  const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const fields = {
    fullName: str(body.fullName, 200),
    company: str(body.company, 200),
    email: str(body.email, 254),
    phone: str(body.phone, 40),
    website: str(body.website, 300),
    country: str(body.country, 80),
    businessType: str(body.businessType, 80),
    monthlyVolume: str(body.monthlyVolume, 80),
    about: str(body.about, 2000),
    consent: body.consent === true,
  };

  const errors = validateApplication(fields, {
    businessTypes: application.businessTypes,
    volumes: application.volumes,
    countries: application.countries,
  });
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const tracking = Object.fromEntries(TRACKING_FIELDS.map((k) => [k, str(body[k], 500)]));

  const record = {
    ...fields,
    ...tracking,
    country_campaign: "UK",
    submitted_at: new Date().toISOString(),
    user_agent: request.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.RESELLER_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[reseller-application] (dev — no RESELLER_WEBHOOK_URL set)", record);
      return Response.json({ ok: true });
    }
    console.error("[reseller-application] RESELLER_WEBHOOK_URL is not configured — application not delivered.");
    return Response.json({ ok: false, error: "Submission endpoint not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    // Google Apps Script (and some other webhooks) always answer 200 and report
    // failure in the JSON body, so check for an explicit { ok: false } too.
    const text = await res.text();
    try {
      const parsed = JSON.parse(text) as { ok?: boolean; error?: string };
      if (parsed && parsed.ok === false) throw new Error(`Webhook rejected: ${parsed.error ?? "unknown"}`);
    } catch (e) {
      if (e instanceof Error && e.message.startsWith("Webhook rejected")) throw e;
      /* non-JSON 2xx response — treat as delivered */
    }
  } catch (err) {
    console.error("[reseller-application] delivery failed", err);
    return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
