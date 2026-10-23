import type { Experience } from "@/lib/cms";
import { formatDuration, formatRange } from "@/lib/format";
import TagPills from "@/components/ui/tag-pill";

export default function ExperienceList({ experience }: { experience: Experience[] }) {
    return (
        <section className="container" style={{ paddingBlock: "0 128px" }} aria-label="Roles">
            <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {experience.map((e) => (
                    <li key={e.id} className="exp-row grid12" data-reveal>
                        <div className="s3">
                            <p className="label">{formatRange(e)}</p>
                            {formatDuration(e) && <p className="exp-dur">{formatDuration(e)}</p>}
                            {!e.end && (
                                <span className="current-badge"><span className="dot-live" aria-hidden="true" />Current role</span>
                            )}
                        </div>
                        <div className="s6">
                            {e.role && <h2 className="exp-role">{e.role}</h2>}
                            {(e.company || e.type) && (
                                <p className="tl-sub">
                                    {e.company}
                                    {e.type && <span className={`pill${e.type === "Freelance" ? " pill-type" : ""}`}>{e.type}</span>}
                                </p>
                            )}
                            {e.bullets.length > 0 && <ul className="bullets body">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                        </div>
                        <div className="s3">
                            {e.stack.length > 0 && (
                                <>
                                    <p className="label" style={{ marginBottom: 12 }}>Stack</p>
                                    <TagPills tags={e.stack} />
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
