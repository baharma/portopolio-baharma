import Image from "next/image";
import Link from "next/link";
import { splitTitle, type Project } from "@/lib/cms";
import Breadcrumb from "@/components/ui/breadcrumb";
import BrowserMockup from "@/components/ui/browser-mockup";
import Button from "@/components/ui/button";
import CtaBand from "@/components/ui/cta-band";
import SectionLabel from "@/components/ui/section-label";

export default function CaseStudy({ project: p, projects }: { project: Project; projects: Project[] }) {
    const { head, accent } = splitTitle(p.title);
    const idx = projects.findIndex((x) => x.slug === p.slug);
    const next = projects[(idx + 1) % projects.length];
    const pad = (n: number) => String(n).padStart(2, "0");
    const meta: [string, string | undefined][] = [
        ["Year", p.year ? String(p.year) : undefined],
        ["Type", p.category],
        ["Stack", p.tags.join(", ")],
    ];
    let n = 0;
    const num = () => pad(++n);

    return (
        <>
            <section className="page-hero grain">
                <div className="container">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.title }]} />
                    <p className="label" data-hero style={{ marginTop: 28, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        {[p.category, p.year].filter(Boolean).join(" · ")}
                    </p>
                    <h1 className="display h1" data-hero>{head} <em>{accent}</em></h1>
                    {p.liveUrl && (
                        <div className="btn-row" style={{ marginTop: 32 }} data-hero>
                            <Button href={p.liveUrl} external>Live demo ↗</Button>
                        </div>
                    )}
                    <dl className="cs-meta" data-hero>
                        {meta.filter(([, v]) => v).map(([k, v]) => (
                            <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>
                        ))}
                    </dl>
                </div>
            </section>

            <div className="container" style={{ paddingBlock: "64px 0" }} data-reveal>
                <BrowserMockup label={p.slug} src={p.cover} alt={`${p.title} hero screenshot`} ratio="r169" priority />
            </div>

            {(p.description || (p.detail && p.detail.length > 0)) && (
                <section className="section" aria-label="Overview">
                    <div className="container grid12">
                        <div className="s12"><SectionLabel n={num()}>Overview</SectionLabel></div>
                        {p.description && <p className={`statement ${p.detail?.length ? "s7" : "s9"}`} data-reveal>{p.description}</p>}
                        {p.detail && p.detail.length > 0 && (
                            <div className="body s4 c9 muted" data-reveal>{p.detail.map((l) => <p key={l}>{l}</p>)}</div>
                        )}
                    </div>
                </section>
            )}

            {p.screens && p.screens.length > 0 && (
                <section className="section" aria-labelledby="screens-title">
                    <div className="container">
                        <div className="section-head">
                            <SectionLabel n={num()}>Screens</SectionLabel>
                            <h2 id="screens-title" className="display h2" data-reveal style={{ marginTop: 20 }}>A look <em>inside</em></h2>
                        </div>
                        <div className="screens">
                            {p.screens.map((s) => (
                                <figure key={s.src} data-reveal>
                                    <div className="mock"><div className="mock-screen r43"><Image src={s.src} alt={s.caption} fill sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div></div>
                                    <figcaption className="label">{s.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="container">
                <nav className="pn" aria-label="Project navigation">
                    <Link className="arrow-link" href="/projects">← All projects</Link>
                    {next.slug !== p.slug && (
                        <Link className="pn-next" href={`/projects/${next.slug}`}>
                            <span className="label">Next project · {pad(projects.indexOf(next) + 1)}</span>
                            <strong>{next.title} <span aria-hidden="true">→</span></strong>
                        </Link>
                    )}
                </nav>
            </div>
            <CtaBand label="Like what you see?" />
        </>
    );
}
