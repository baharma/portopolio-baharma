import type { Metadata } from "next";
import ProjectsExplorer from "@/components/sections/projects-explorer";
import Breadcrumb from "@/components/ui/breadcrumb";
import Button from "@/components/ui/button";
import CtaBand from "@/components/ui/cta-band";
import { getProjects } from "@/lib/cms";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've designed and built recently: a browser meeting recorder, a multi-tenant CMS and this portfolio.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <section className="page-hero grain" style={{ borderBottom: 0 }}>
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <h1 className="display h1" data-hero>All <em>projects</em>.</h1>
          <p className="lead" data-hero>
            Things I&apos;ve designed and built recently. More on my GitHub, or reach out and I&apos;ll walk you through them.
          </p>
          <ProjectsExplorer projects={projects} />
        </div>
      </section>
      <div className="container" style={{ paddingBlock: "64px" }}>
        <div className="gh-card" data-reveal>
          <p className="display">Smaller experiments live on <em>GitHub</em>.</p>
          <Button href={site.github.url} external variant="secondary">{site.github.handle} on GitHub ↗</Button>
        </div>
      </div>
      <CtaBand label="Have a project in mind?" />
    </>
  );
}
