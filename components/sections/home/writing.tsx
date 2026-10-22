import { site } from "@/content/site";
import SectionLabel from "@/components/ui/section-label";

export default function Writing() {
    return (
        <section className="section" aria-labelledby="writing-title">
            <div className="container">
                <div className="section-head">
                    <SectionLabel n="04">Writing</SectionLabel>
                    <h2 id="writing-title" className="display h2" data-reveal style={{ marginTop: 20 }}>Thoughts I <em>wrote down</em></h2>
                </div>
                <div className="writing" data-reveal>
                    <span className="pill pill-chip">Coming soon</span>
                    <p className="writing-text">Notes on frontend, Go, and AI. <em>First posts dropping soon.</em></p>
                    <a className="arrow-link muted" href={site.github.url} target="_blank" rel="noopener noreferrer">
                        Follow on GitHub <span className="ext" aria-hidden="true">↗</span>
                    </a>
                    <span className="writing-bg" aria-hidden="true">Soon</span>
                </div>
            </div>
        </section>
    );
}
