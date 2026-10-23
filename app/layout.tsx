import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";
import "./portfolio.css";

// Display: Newsreader (Production Type) for headings and the italic accent word.
// Body text uses the system UI stack (set in portfolio.css); labels use IBM Plex Mono.
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description = site.intro;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Full-stack software engineer`, template: `%s — ${site.name}` },
  description,
  openGraph: { type: "website", siteName: site.name, title: site.name, description, url: site.url },
  twitter: { card: "summary_large_image", title: site.name, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
