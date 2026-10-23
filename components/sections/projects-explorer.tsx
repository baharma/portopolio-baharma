"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/cms";
import BrowserMockup from "@/components/ui/browser-mockup";
import TagPills from "@/components/ui/tag-pill";

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
    const projectFilters = ["All", ...new Set(projects.map((p) => p.filter))];
    const [active, setActive] = useState<string>("All");
    const count = (f: string) => (f === "All" ? projects.length : projects.filter((p) => p.filter === f).length);
    const visible = active === "All" ? projects : projects.filter((p) => p.filter === active);
    const pad = (n: number) => String(n).padStart(2, "0");

    return (
        <>
            <div className="chips" role="group" aria-label="Filter projects" style={{ marginTop: 40 }}>
                {projectFilters.map((f) => (
                    <button key={f} type="button" className="chip" aria-pressed={active === f} onClick={() => setActive(f)}>
                        {f} {count(f)}
                    </button>
                ))}
            </div>
            <div className="container" style={{ padding: 0, marginTop: 72 }}>
                {visible.map((p, i) => {
                    const flip = i % 2 === 1;
                    const href = `/projects/${p.slug}`;
                    return (
                        <article key={p.slug} className={`proj-row grid12${flip ? " flip" : ""}`}>
                            <Link href={href} className={`lift s7 ${flip ? "c6" : "c1"}`} aria-label={`${p.title} case study`}>
                                <BrowserMockup label={p.slug} src={p.cover} alt={`${p.title} screenshot`} />
                            </Link>
                            <div className={`s4 ${flip ? "c1" : "c9"}`}>
                                <p className="accent-num">{pad(i + 1)} / {pad(visible.length)}</p>
                                <h2 className="proj-title">{p.title}</h2>
                                {p.description && <p className="body">{p.description}</p>}
                                <div className="meta-pairs">
                                    {p.category && <div><span className="label">Type</span><b>{p.category}</b></div>}
                                    {p.year && <div><span className="label">Year</span><b>{p.year}</b></div>}
                                </div>
                                <TagPills tags={p.tags} />
                                <p style={{ marginTop: 28 }}>
                                    <Link className="arrow-link" href={href}>View case study <span className="ext" aria-hidden="true">↗</span></Link>
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </>
    );
}
