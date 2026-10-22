import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F4F3EF", padding: 80, color: "#0E1420" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#5B6474" }}>{`— Portfolio · ${site.year} · ${site.domain}`}</div>
        <div style={{ display: "flex", fontSize: 170, lineHeight: 0.95, letterSpacing: -4 }}>
          {site.name}
          <span style={{ color: "#1F3A68" }}>.</span>
        </div>
        <div style={{ fontSize: 34, color: "#262E3C" }}>Full-stack software engineer · Bali, Indonesia</div>
      </div>
    ),
    size,
  );
}
