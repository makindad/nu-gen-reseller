# NU-GEN Research — UK Reseller Landing Page

Single-page B2B landing page for UK resellers, wholesalers, distributors and online retailers.
Built for paid Meta traffic: one conversion (the reseller application), no e-commerce.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Inter (self-hosted via Fontsource) · lucide-react icons

## Run locally

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

In development, form submissions to the built-in route are logged to the terminal.

## Deploy (GitHub → Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected automatically.
3. Add environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` — the landing page's domain
   - **Either** `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree) **or** `RESELLER_WEBHOOK_URL` (built-in route)
4. Deploy, then attach the separate domain under Settings → Domains.
5. Submit a test application and confirm it arrives before turning ads on.

## Where to edit things

| What | Where |
| --- | --- |
| All copy, nav, FAQ, form options | `src/content/site.ts` |
| Product names / identifiers / pack info | `products` in `src/content/site.ts` |
| Product photography | `public/images/product-01.webp` … `product-08.webp` (replace files, keep names — or change paths in `site.ts`) |
| Hero packaging images | `public/images/hero-product-01/02/03.webp` (transparent background works best) |
| Logo | see below |
| Quality standards (GMP / ISO / purity etc.) | `quality.standards` in `site.ts` — empty by default, block hidden until filled |
| Example batch / catalogue formats | `hero.annotations` and `quality.specimen` in `site.ts` |
| Policy links | `footer.links` in `site.ts` |
| Brand colours | `@theme` block in `src/app/globals.css` |
| Green accent words in headings | wrap words in `*asterisks*` in any `heading` in `site.ts`, e.g. `"Partner With NU-GEN *Research*"` |
| Accent serif font | `--font-serif` in `globals.css` (Newsreader, self-hosted) — swap for the main site's serif if different |

Add or remove products by editing the array — the grid adapts (2 columns mobile, 3 tablet, 4 desktop).

### Logo

1. Save the official file to `public/brand/` (e.g. `public/brand/nu-gen-research-logo.svg`).
2. In `src/content/site.ts`, set `logo.src` to `/brand/nu-gen-research-logo.svg` and `logo.width` / `logo.height`
   to the file's intrinsic size (or SVG viewBox). The logo is shown at a fixed height with width following its
   own ratio, so proportions are never altered. In the footer it sits on a white plate so original colours are kept.
3. Add a favicon (`src/app/icon.png`, 512×512) derived from the logo.

## Form

**Google Sheet delivery:** follow the steps at the top of `google-sheets/apps-script.gs`, then set `RESELLER_WEBHOOK_URL` in Vercel to the script's `/exec` URL.


- Single application form (`src/components/ResellerForm.tsx`), validated on the client and again on the server
  with the same rules (`src/lib/validation.ts`).
- Hidden attribution fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`,
  `landing_page`, `country_campaign` (= `UK`). UTMs are kept for the browser session.
- Honeypot field for basic spam protection.
- States: field errors (focus moves to the first error), loading, error (answers are kept), success.
- On success, `trackLead()` (`src/lib/submit.ts`) fires a Meta Pixel `Lead`, GA4 `generate_lead` and a
  `dataLayer` event **if** those tags are installed. No tracking scripts are included — add them through your
  consent-management setup (UK GDPR / PECR).

## Compliance notes

Copy is framed around wholesale supply, verification, traceability and documentation. Keep it that way when editing:
no health, therapeutic, dosing, human-use or results-based language, no testimonials, and no certifications or test
values you cannot evidence. The research-use notice appears in the footer (`footer.notice`).

Before running ads, check your products and landing page against Meta's current advertising policies for your
category — ad review applies to the products as well as the page copy.
