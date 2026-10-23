import { getExperience } from "@/lib/cms";
import { formatRange } from "@/lib/format";
import Button from "@/components/ui/button";
import SectionLabel from "@/components/ui/section-label";
import TagPills from "@/components/ui/tag-pill";

export default async function ExperiencePreview() {
    const { items: experience } = await getExperience();
    if (experience.length === 0) return null;
    return (
        <section id="experience" className="section" aria-labelledby="exp-title">
            <div className="container">
                <div className="section-head">
                    <SectionLabel n="02">Experience</SectionLabel>
                    <h2 id="exp-title" className="display h2" data-reveal style={{ marginTop: 20 }}>A short <em>timeline</em></h2>
                </div>
                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {experience.map((e) => (
                        <li key={e.id} className="tl-row grid12" data-reveal>
                            <p className="tl-date s3">{formatRange(e)}</p>
                            <div className={`tl-main s6${e.end ? "" : " current"}`}>
                                {e.role && <h3 className="tl-role">{e.role}</h3>}
                                {(e.company || e.type) && (
                                    <p className="tl-sub">
                                        {e.company}
                                        {e.type && <span className={`pill${e.type === "Freelance" ? " pill-type" : ""}`}>{e.type}</span>}
                                    </p>
                                )}
                                {e.bullets.length > 0 && <ul className="bullets">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                            </div>
                            <div className="s3"><TagPills tags={e.stack} /></div>
                        </li>
                    ))}
                </ol>
                <div className="center-row">
                    <Button href="/experience">View full experience →</Button>
                </div>
            </div>
        </section>
    );
}
