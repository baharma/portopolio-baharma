import type { Metadata } from "next";
import ExperienceList from "@/components/sections/experience-list";
import Breadcrumb from "@/components/ui/breadcrumb";
import CtaBand from "@/components/ui/cta-band";
import { getExperience } from "@/lib/cms";
import { formatMonth } from "@/lib/format";

export const revalidate = 86400; // durations are computed from today's date

export const metadata: Metadata = {
  title: "Experience",
  description: "Full-time and freelance roles building web products, from front-end interfaces to full-stack applications.",
  alternates: { canonical: "/experience" },
};

export default async function ExperiencePage() {
  const { intro, items: experience } = await getExperience();
  const current = experience.find((e) => !e.end && e.company);
  const since = experience.filter((e) => e.start).sort((a, b) => a.start!.localeCompare(b.start!))[0];
  const stats: [string, string][] = [
    [String(experience.length), "Roles"],
    ...(since ? ([[formatMonth(since.start!), "Since"]] as [string, string][]) : []),
    ...(current ? ([[current.company!, "Now at"]] as [string, string][]) : []),
  ];
  return (
    <>
      <section className="page-hero grain" style={{ marginBottom: 0 }}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Experience" }]} />
          <h1 className="display h1" data-hero>Where I&apos;ve <em>worked</em>.</h1>
          <p className="lead" data-hero>
            {intro ?? "Full-time and freelance roles building web products, from front-end interfaces to full-stack applications."}
          </p>
          <dl className="stats" data-hero>
            {stats.map(([v, k]) => (
              <div key={k} className="stat"><dd><strong>{v}</strong></dd><dt className="label">{k}</dt></div>
            ))}
          </dl>
        </div>
      </section>
      <div style={{ height: 0 }} />
      <ExperienceList experience={experience} />
      <CtaBand label="Want the full picture?" />
    </>
  );
}
