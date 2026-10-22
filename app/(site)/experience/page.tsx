import type { Metadata } from "next";
import ExperienceList from "@/components/sections/experience-list";
import Breadcrumb from "@/components/ui/breadcrumb";
import CtaBand from "@/components/ui/cta-band";
import { experience } from "@/content/experience";
import { formatMonth } from "@/lib/format";

export const revalidate = 86400; // durations are computed from today's date

export const metadata: Metadata = {
  title: "Experience",
  description: "Full-time and freelance roles building web products, from front-end interfaces to full-stack applications.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  const current = experience.find((e) => !e.end);
  const since = [...experience].sort((a, b) => a.start.localeCompare(b.start))[0];
  const stats: [string, string][] = [
    [String(experience.length), "Roles"],
    [formatMonth(since.start), "Since"],
    ...(current ? ([[current.company, "Now at"]] as [string, string][]) : []),
  ];
  return (
    <>
      <section className="page-hero grain" style={{ marginBottom: 0 }}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Experience" }]} />
          <h1 className="display h1" data-hero>Where I&apos;ve <em>worked</em>.</h1>
          <p className="lead" data-hero>
            Full-time and freelance roles building web products, from front-end interfaces to full-stack applications. Newest first.
          </p>
          <dl className="stats" data-hero>
            {stats.map(([v, k]) => (
              <div key={k} className="stat"><dd><strong>{v}</strong></dd><dt className="label">{k}</dt></div>
            ))}
          </dl>
        </div>
      </section>
      <div style={{ height: 0 }} />
      <ExperienceList />
      <CtaBand label="Want the full picture?" />
    </>
  );
}
