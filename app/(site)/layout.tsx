import Footer from "@/components/sections/footer";
import Motion from "@/components/sections/motion";
import Navbar from "@/components/sections/navbar";
import { site } from "@/content/site";
import { getContact } from "@/lib/cms";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Full-stack Software Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
  sameAs: [site.github.url, site.linkedin.url].filter(Boolean),
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { availability } = await getContact();
  return (
    <div className="site" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Navbar availability={availability} />
      <main>{children}</main>
      <Footer />
      <Motion />
    </div>
  );
}
