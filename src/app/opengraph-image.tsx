import { ImageResponse } from "next/og";

// Text-only social preview. Once the official logo is supplied you can
// replace this file with a static /src/app/opengraph-image.png (1200×630).
export const alt = "Partner With NU-GEN Research — UK reseller and wholesale partnerships";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F7F7F4",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(to right, rgba(17,19,21,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,19,21,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#5C6166", fontSize: 22, letterSpacing: 3 }}>
        <div style={{ width: 40, height: 2, background: "#4A8B2C" }} />
        UK RESELLER &amp; WHOLESALE PARTNERSHIPS
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 92, fontWeight: 700, color: "#111315", letterSpacing: -3, lineHeight: 1.02 }}>
          Partner With
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#111315",
            letterSpacing: -3,
            lineHeight: 1.02,
          }}
        >
          <span>NU-GEN</span>
          <span style={{ color: "#4A8B2C", fontStyle: "italic", marginLeft: 22 }}>Research</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#34383C",
        }}
      >
        <div style={{ display: "flex", gap: 36 }}>
          <span>Batch traceability</span>
          <span>Product verification</span>
          <span>Quality documentation</span>
        </div>
        <div
          style={{
            display: "flex",
            background: "#0F5FA8",
            color: "#fff",
            padding: "16px 32px",
            fontSize: 24,
            borderRadius: 999,
          }}
        >
          Apply to become a reseller
        </div>
      </div>
    </div>,
    size,
  );
}
