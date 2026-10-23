import { site } from "@/content/site";
import { getContact } from "@/lib/cms";
import CopyButton from "@/components/ui/copy-button";

function Ext({ href, children }: { href?: string; children: string }) {
    if (!href) return <span className="val">{children}</span>;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {children} <span className="ext" aria-hidden="true">↗</span>
        </a>
    );
}

export default async function Contact() {
    const contact = await getContact();
    const social = (name: string) => contact.socials.find((s) => s.label.toLowerCase() === name);
    const linkedin = social("linkedin");
    const github = social("github");
    return (
        <section id="contact" className="section" aria-labelledby="contact-title">
            <div className="container">
                <p className="label" data-reveal>— 05 · Contact</p>
                <h2 id="contact-title" className="display contact-title" data-reveal>
                    Let&apos;s build something <em>good</em>.
                </h2>
                <div className="email-row" data-reveal>
                    <a className="email-big" href={`mailto:${contact.email}`}>{contact.email}</a>
                    <CopyButton text={contact.email} />
                </div>
                <div className="contact-cols" data-reveal>
                    <div className="contact-col">
                        <span className="label">Email</span>
                        <a href={`mailto:${contact.email}`}>Write to me <span className="ext" aria-hidden="true">↗</span></a>
                    </div>
                    <div className="contact-col">
                        <span className="label">LinkedIn</span>
                        <Ext href={linkedin?.url ?? site.linkedin.url}>{site.linkedin.label}</Ext>
                    </div>
                    <div className="contact-col">
                        <span className="label">GitHub</span>
                        <Ext href={github?.url ?? site.github.url}>{site.github.handle}</Ext>
                    </div>
                    <div className="contact-col">
                        <span className="label">Location</span>
                        <span className="val">{contact.location}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
