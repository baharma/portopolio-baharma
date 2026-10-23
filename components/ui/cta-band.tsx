import { site } from "@/content/site";
import { getContact } from "@/lib/cms";
import Button from "./button";

type Props = {
    label: string;
    secondary?: { label: string; href: string };
};

export default async function CtaBand({ label, secondary }: Props) {
    const { email } = await getContact();
    return (
        <div className="container cta-wrap">
            <section className="cta grain" aria-labelledby="cta-title" data-reveal>
                <p className="label">— {label}</p>
                <h2 id="cta-title" className="display">
                    Let&apos;s build something <em>good</em>.
                </h2>
                <a className="cta-email" href={`mailto:${email}`}>
                    {email}
                </a>
                <div className="btn-row">
                    <Button variant="paper" href={`mailto:${email}`}>
                        Get in touch
                    </Button>
                    {secondary ? (
                        <Button variant="light" href={secondary.href}>
                            {secondary.label}
                        </Button>
                    ) : (
                        <Button variant="light" href={site.cvUrl} external>
                            Download CV
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
}
