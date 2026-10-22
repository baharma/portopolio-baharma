import Image from "next/image";
import Link from "next/link";
import { projects, splitTitle, type Project } from "@/content/projects";
import Breadcrumb from "@/components/ui/breadcrumb";
import BrowserMockup from "@/components/ui/browser-mockup";
import Button from "@/components/ui/button";
import CtaBand from "@/components/ui/cta-band";
import SectionLabel from "@/components/ui/section-label";
import StepIcon from "./step-icon";

export default function CaseStudy({ project: p }: { project: Project }) {
    const { head, accent } = splitTitle(p.title);
    const idx = projects.findIndex((x) => x.slug === p.slug);
    const next = projects[(idx + 1) % projects.length];
    const pad = (n: number) => String(n).padStart(2, "0");
    const meta: [string, string | undefined][] = [
        ["Role", p.role],
        ["Year", String(p.year)],
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
                        {p.featured && <span className="pill pill-chip">Featured</span>}
                        {p.category} · {p.year}
                    </p>
                    <h1 className="display h1" data-hero>{head} <em>{accent}</em></h1>
                    {p.tagline && <p className="lead" data-hero>{p.tagline}</p>}
                    {(p.liveUrl || p.sourceUrl) && (
                        <div className="btn-row" style={{ marginTop: 32 }} data-hero>
                            {p.liveUrl && <Button href={p.liveUrl} external>Live demo ↗</Button>}
                            {p.sourceUrl && <Button href={p.sourceUrl} external variant="secondary">Source code ↗</Button>}
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

            <section className="section" aria-label="Overview">
                <div className="container grid12">
                    <div className="s12"><SectionLabel n={num()}>Overview</SectionLabel></div>
                    <p className={`statement ${p.problem ? "s7" : "s9"}`} data-reveal>{p.description}</p>
                    {p.problem && <p className="body s4 c9 muted" data-reveal>{p.problem}</p>}
                </div>
            </section>

            {p.steps && (
                <section className="section" aria-labelledby="how-title">
                    <div className="container">
                        <div className="section-head">
                            <SectionLabel n={num()}>How it works</SectionLabel>
                            <h2 id="how-title" className="display h2" data-reveal style={{ marginTop: 20 }}>How it <em>works</em></h2>
                        </div>
                        <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {p.steps.map((s, i) => (
                                <li key={s.title} className="step" data-reveal>
                                    <StepIcon index={i} />
                                    <span className="accent-num">{pad(i + 1)}</span>
                                    <h3>{s.title}</h3>
                                    <p className="muted">{s.text}</p>
                                </li>
                            ))}
                        </ol>
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
                                    <div className="mock"><div className="mock-screen r43"><Image src={s.src} alt={s.caption} fill sizes="(max-width: 900px) 100vw, 50vw" /></div></div>
                                    <figcaption className="label">{s.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {p.stack && (
                <section className="section" aria-labelledby="stack-title">
                    <div className="container">
                        <div className="section-head">
                            <SectionLabel n={num()}>Stack</SectionLabel>
                            <h2 id="stack-title" className="display h2" data-reveal style={{ marginTop: 20 }}>Built <em>with</em></h2>
                        </div>
                        <ul>
                            {p.stack.map((s) => (
                                <li key={s.name} className="stack-row" data-reveal>
                                    <b>{s.name}</b>
                                    {s.note && <span className="body muted">{s.note}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {p.learnings && (p.learnings.hardest || p.learnings.next) && (
                <section className="section" aria-labelledby="learn-title">
                    <div className="container">
                        <div className="section-head">
                            <SectionLabel n={num()}>Learnings</SectionLabel>
                            <h2 id="learn-title" className="display h2" data-reveal style={{ marginTop: 20 }}>What I <em>learned</em></h2>
                        </div>
                        <div className="grid12 learn">
                            {p.learnings.hardest && <div className="s6" data-reveal><h3 className="label">Hardest problem</h3><p className="body">{p.learnings.hardest}</p></div>}
                            {p.learnings.next && <div className="s6" data-reveal><h3 className="label">What I&apos;d do next</h3><p className="body">{p.learnings.next}</p></div>}
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
