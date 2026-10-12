/**
 * ─────────────────────────────────────────────────────────────
 *  NU-GEN Research — UK reseller landing page content
 *  All page copy, product data and editable claims live here.
 *  Edit this file rather than the components.
 *
 *  COMPLIANCE: this page receives Meta advertising traffic.
 *  Keep copy framed around research, wholesale supply,
 *  verification and traceability. Do not add medical,
 *  therapeutic, dosing, human-use or results-based language.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "NU-GEN Research",
  /** Public URL of this landing page — used for canonical + Open Graph.
   *  Set NEXT_PUBLIC_SITE_URL in Vercel; this is only the fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.co.uk",
  title: "Become a NU-GEN Research Reseller | UK Wholesale Partnerships",
  description:
    "Apply to become a NU-GEN Research reseller or wholesale partner in the UK. Discover our research product range, verification approach and B2B partnership opportunities.",
  locale: "en_GB",
  countryCampaign: "UK",
  year: 2026,
} as const;

/**
 * LOGO
 * Until the official asset is supplied, `src` is null and a clearly
 * labelled placeholder renders instead. To activate the real logo:
 *   1. Save the file to /public/brand/ (e.g. /public/brand/nu-gen-research-logo.svg)
 *   2. Set `src` to its public path
 *   3. Set `width` and `height` to the file's intrinsic pixel size
 *      (or the SVG viewBox) — this preserves its exact proportions.
 * The display height is controlled in <Logo />; width follows the ratio.
 */
export const logo: {
  src: string | null;
  width: number;
  height: number;
  alt: string;
} = {
  src: "/brand/nu-gen-research-logo.png",
  width: 768,
  height: 334,
  alt: "NU-GEN Research",
};

export const primaryCta = {
  label: "Apply to Become a Reseller",
  href: "#apply",
} as const;

export const nav = [
  { label: "Products", href: "#products" },
  { label: "Why NU-GEN", href: "#why-nu-gen" },
  { label: "Quality", href: "#quality" },
  { label: "Become a Reseller", href: "#apply" },
] as const;

export const hero = {
  eyebrow: "UK Reseller & Wholesale Partnerships",
  heading: "Partner With NU-GEN *Research*",
  body: "We are expanding our UK reseller network and are looking to work with established wholesalers, distributors and specialist retailers seeking professionally presented research products backed by traceability, documentation and product verification.",
  secondaryCta: { label: "View Product Range", href: "#products" },
  qualifier: "For qualified UK business enquiries only.",
  /** Replace with official packaging photography (transparent or light background works best). */
  images: {
    primary: { src: "/images/hero-product-01.webp", alt: "NU-GEN Research product packaging" },
    secondary: { src: "/images/hero-product-02.webp", alt: "NU-GEN Research product packaging" },
    tertiary: { src: "/images/hero-product-03.webp", alt: "NU-GEN Research product packaging" },
  },
  /** Annotations shown around the hero composition. */
  annotations: {
    batchLabel: "Batch ref.",
    batchValue: "NG-0000-00", // example format only — edit to match your batch numbering
    statusLabel: "Verification",
    statusValue: "Authenticity check",
  },
} as const;

export const trustItems = [
  { icon: "uk", title: "UK Based", detail: "UK-based supply partner" },
  { icon: "batch", title: "Batch Traceability", detail: "Clear batch identification" },
  { icon: "verify", title: "Product Verification", detail: "Authenticity check support" },
  { icon: "docs", title: "Quality Documentation", detail: "Available where applicable" },
] as const;

export const wholesale = {
  label: "01 — Wholesale",
  heading: "Built for Professional *Reseller* Partnerships",
  paragraphs: [
    "NU-GEN Research is building long-term relationships with qualified businesses across the United Kingdom. Our reseller programme is designed for companies that already serve a professional customer base and want a consistent, well-documented research brand to represent.",
  ],
  suitableHeading: "The programme is suitable for",
  suitableFor: [
    "Wholesalers",
    "Distributors",
    "Specialist online retailers",
    "Established resellers",
    "Businesses expanding an existing research-product catalogue",
  ],
  profile: {
    heading: "Ideal Partner Profile",
    reference: "Ref. RP-UK",
    items: [
      "Established business presence",
      "UK customer base",
      "Professional product presentation",
      "Capacity for repeat orders",
      "Commitment to responsible product representation",
    ],
  },
  cta: { label: "Discuss Reseller Opportunities", href: "#apply" },
} as const;

/**
 * PRODUCT RANGE
 * Replace each entry with official product data and photography.
 *   image      → /public/images/product-XX.webp (square or 4:5 portrait works best)
 *   name       → product name exactly as printed on packaging
 *   identifier → short technical / catalogue identifier
 *   pack       → optional pack information (set to "" to hide)
 *
 * Do not add descriptions that reference effects, uses, dosing or outcomes.
 */
export type Product = {
  name: string;
  identifier: string;
  pack?: string;
  image: string;
};

export const products: Product[] = [
  { name: "Product Name 01", identifier: "Cat. NG-001", pack: "Pack information", image: "/images/product-01.webp" },
  { name: "Product Name 02", identifier: "Cat. NG-002", pack: "Pack information", image: "/images/product-02.webp" },
  { name: "Product Name 03", identifier: "Cat. NG-003", pack: "Pack information", image: "/images/product-03.webp" },
  { name: "Product Name 04", identifier: "Cat. NG-004", pack: "Pack information", image: "/images/product-04.webp" },
  { name: "Product Name 05", identifier: "Cat. NG-005", pack: "Pack information", image: "/images/product-05.webp" },
  { name: "Product Name 06", identifier: "Cat. NG-006", pack: "Pack information", image: "/images/product-06.webp" },
  { name: "Product Name 07", identifier: "Cat. NG-007", pack: "Pack information", image: "/images/product-07.webp" },
  { name: "Product Name 08", identifier: "Cat. NG-008", pack: "Pack information", image: "/images/product-08.webp" },
];

export const productRange = {
  label: "02 — Product Range",
  heading: "Explore the NU-GEN Research *Range*",
  intro: "A consistent, technically presented range with clear identification on every pack.",
  badge: "Verified",
  note: "Full product availability, reseller pricing and wholesale information can be provided following application approval.",
  cta: { label: "Request Wholesale Information", href: "#apply" },
} as const;

export const benefits = {
  label: "03 — Partnership",
  heading: "Why Businesses Choose *NU-GEN*",
  intro:
    "Presentation, documentation and a direct working relationship — the foundations a professional reseller needs.",
  items: [
    {
      icon: "presentation",
      title: "Professional Brand Presentation",
      body: "Products designed with consistent, premium and technical visual presentation, so the range sits credibly within a professional catalogue.",
    },
    {
      icon: "traceability",
      title: "Traceability",
      body: "Clear product identification and batch-related documentation that make it straightforward to know exactly what you are supplying.",
    },
    {
      icon: "verification",
      title: "Verification",
      body: "Product verification infrastructure designed to support authenticity checks across the supply chain.",
    },
    {
      icon: "support",
      title: "Reseller Support",
      body: "A direct B2B relationship for approved reseller and wholesale partners, with direct contact for ordering and product information.",
    },
  ],
} as const;

/**
 * QUALITY & TRACEABILITY
 * `standards` is intentionally EMPTY. Only add entries you can evidence
 * (e.g. a named testing method, a GMP/ISO reference, a purity specification).
 * When empty, the "Specification" block is not rendered.
 * Example entry: { label: "Purity specification", value: "≥ XX% (HPLC)" }
 */
export const quality = {
  label: "04 — Quality & Traceability",
  heading: "Confidence Through *Verification* and Documentation",
  intro:
    "Partners need to know exactly what they are stocking. Our approach is built around identification, verification and documentation.",
  pillars: [
    {
      code: "QV-01",
      icon: "verify",
      title: "Product Verification",
      body: "Product verification and authenticity are central to how NU-GEN products are presented, helping partners and their customers distinguish genuine stock.",
    },
    {
      code: "QV-02",
      icon: "batch",
      title: "Batch Identification",
      body: "Products are organised around clear batch identification, so each unit can be traced back to its production batch.",
    },
    {
      code: "QV-03",
      icon: "docs",
      title: "Documentation",
      body: "Supporting quality documentation may be made available to approved partners where applicable, alongside product and batch information.",
    },
    {
      code: "QV-04",
      icon: "supply",
      title: "Professional Supply",
      body: "Approved reseller relationships are handled as professional B2B partnerships, with orders and enquiries managed directly.",
    },
  ],
  specimen: {
    title: "Product identification",
    caption: "Illustrative example — format shown for reference only",
    fields: [
      { label: "Batch no.", value: "NG-0000-00" },
      { label: "Catalogue ref.", value: "NG-000" },
      { label: "Verification", value: "Scan / code check" },
    ],
    documents: ["Batch documentation", "Product specification", "Supporting quality documents (where applicable)"],
    checks: ["Batch identified", "Packaging verified", "Documentation referenced"],
  },
  standards: [] as { label: string; value: string }[],
} as const;

export const statement = {
  label: "NU-GEN Research",
  heading: "A Research Brand Designed for *Professional Distribution*",
  body: "NU-GEN combines distinctive product presentation, verification and professional B2B support to create a stronger experience for approved reseller partners.",
} as const;

export const faq = {
  label: "FAQ",
  heading: "Reseller *Questions*",
  items: [
    {
      q: "Who can apply to become a reseller?",
      a: "Businesses operating as wholesalers, distributors, specialist retailers or established resellers may submit an application.",
    },
    {
      q: "Do you work with new businesses?",
      a: "Applications can be reviewed individually based on the business model and proposed order requirements.",
    },
    {
      q: "Do you supply businesses throughout the UK?",
      a: "The reseller programme is intended to support qualified businesses across the United Kingdom.",
    },
    {
      q: "How do I receive wholesale pricing?",
      a: "Wholesale and reseller information can be provided following review of the application.",
    },
    {
      q: "Does submitting the form guarantee approval?",
      a: "No. Applications are reviewed individually before a reseller relationship is established.",
    },
  ],
} as const;

export const application = {
  label: "05 — Become a Reseller",
  heading: "Apply to Become a NU-GEN *Reseller*",
  body: "Tell us about your business and our team can review whether there is a suitable opportunity to work together.",
  steps: [
    { title: "Submit your application", body: "Share your business details and how you currently trade." },
    { title: "Individual review", body: "Our team reviews each application against the partner profile." },
    { title: "Next steps", body: "Where there is a fit, we contact you to discuss wholesale information." },
  ],
  submitLabel: "Submit Reseller Application",
  submittingLabel: "Submitting application…",
  disclaimer: "Applications are reviewed individually. Submission does not guarantee reseller approval.",
  consent:
    "I agree that NU-GEN Research may use the information provided to contact me regarding reseller and wholesale opportunities.",
  success: {
    heading: "Application received",
    body: "Thank you. Your reseller application has been received. Our team will review your information and contact you regarding the next steps.",
  },
  error: {
    heading: "We couldn’t submit your application",
    body: "Something went wrong while sending your details. Please check your connection and try again — your answers have been kept.",
  },
  countries: ["United Kingdom", "Republic of Ireland", "Other"],
  defaultCountry: "United Kingdom",
  businessTypes: ["Wholesaler", "Distributor", "Online Retailer", "Physical Retailer", "Reseller", "Other"],
  volumes: ["Under £1,000", "£1,000–£2,500", "£2,500–£5,000", "£5,000–£10,000", "£10,000+", "Not sure yet"],
} as const;

export const footer = {
  tagline: "Research products supplied for professional research purposes.",
  notice: "Products presented on this website are not intended for human or veterinary use.",
  /** Point these at the hosted policy pages before launch. */
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Research Use Notice", href: "#" },
  ],
  copyright: "© 2026 NU-GEN Research. All rights reserved.",
} as const;
