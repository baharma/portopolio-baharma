import { site } from "@/content/site";
import CopyButton from "@/components/ui/copy-button";

function Ext({ href, children }: { href?: string; children: string }) {
    if (!href) return <span className="val">{children}</span>;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children} <span className="ext" aria-hidden="true">↗</span>
        </a>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="section" aria-labelledby="contact-title">
            <div className="container">
                <p className="label" data-reveal>— 05 · Contact</p>
                <h2 id="contact-title" className="display contact-title" data-reveal>
                    Let&apos;s build something <em>good</em>.
                </h2>
                <div className="email-row" data-reveal>
                    <a className="email-big" href={`mailto:${site.email}`}>{site.email}</a>
                    <CopyButton text={site.email} />
                </div>
                <div className="contact-cols" data-reveal>
                    <div className="contact-col">
                        <span className="label">Email</span>
                        <a href={`mailto:${site.email}`}>Write to me <span className="ext" aria-hidden="true">↗</span></a>
                    </div>
                    <div className="contact-col">
                        <span className="label">LinkedIn</span>
                        <Ext href={site.linkedin.url}>{site.linkedin.label}</Ext>
                    </div>
                    <div className="contact-col">
                        <span className="label">GitHub</span>
                        <Ext href={site.github.url}>{site.github.handle}</Ext>
                    </div>
                    <div className="contact-col">
                        <span className="label">Location</span>
                        <span className="val">{site.location.short} · Available remote</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
