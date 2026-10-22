import { experience } from "@/content/experience";
import { formatDuration, formatRange } from "@/lib/format";
import TagPills from "@/components/ui/tag-pill";

export default function ExperienceList() {
    return (
        <section className="container" style={{ paddingBlock: "0 128px" }} aria-label="Roles">
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {experience.map((e) => (
                    <li key={e.id} className="exp-row grid12" data-reveal>
                        <div className="s3">
                            <p className="label">{formatRange(e)}</p>
                            <p className="exp-dur">{formatDuration(e)}</p>
                            {!e.end && (
                                <span className="current-badge"><span className="dot-live" aria-hidden="true" />Current role</span>
                            )}
                        </div>
                        <div className="s6">
                            <h2 className="exp-role">{e.role}</h2>
                            <p className="tl-sub">
                                {e.company}
                                <span className={`pill${e.type === "Freelance" ? " pill-type" : ""}`}>{e.type}</span>
                                {e.location && <span className="muted" style={{ fontWeight: 400 }}>{e.location}</span>}
                            </p>
                            {e.companyNote && <p className="body muted" style={{ marginBottom: 16 }}>{e.companyNote}</p>}
                            <ul className="bullets body">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                        </div>
                        <div className="s3">
                            <p className="label" style={{ marginBottom: 12 }}>Stack</p>
                            <TagPills tags={e.stack} />
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
