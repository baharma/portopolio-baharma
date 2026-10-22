import Link from "next/link";
import type { Project } from "@/content/projects";
import BrowserMockup from "./browser-mockup";
import TagPills from "./tag-pill";

export default function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
    const href = `/projects/${project.slug}`;
    return (
        <article className={`card${featured ? " card-featured" : ""}`} data-reveal>
            <BrowserMockup label={project.slug} src={project.cover} alt={`${project.title} screenshot`} />
            <div className="card-body">
                {featured && (
                    <span className="pill pill-chip" style={{ alignSelf: "flex-start" }}>
                        Featured
                    </span>
                )}
                <div className="card-top label">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                </div>
                <h3 className="card-title">
                    <Link href={href}>{project.title}</Link>
                </h3>
                <p className="card-desc">{project.description}</p>
                <TagPills tags={project.tags} />
                <div className="card-foot">
                    <span className="arrow-link">
                        View case study <span className="ext" aria-hidden="true">↗</span>
                    </span>
                </div>
            </div>
        </article>
    );
}
