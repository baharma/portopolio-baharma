import { site } from "@/content/site";
import { getContact, getHome } from "@/lib/cms";
import AvailabilityBadge from "@/components/ui/availability-badge";
import Button from "@/components/ui/button";
import Portrait from "../portrait";

export default async function Hero() {
    const [home, contact] = await Promise.all([getHome(), getContact()]);
    const meta: [string, string | undefined][] = home.currently.length
        ? home.currently.map((c) => [c.label, c.value])
        : [["Based in", contact.location]];
    return (
        <section className="hero grain" aria-labelledby="hero-name">
            <div className="container">
                <p className="kicker" data-hero>Portfolio, {site.year}</p>
                <h1 id="hero-name" className="display h-hero hero-name" data-hero>
                    Aditya Dharma<span className="dot">.</span>
                </h1>
                <div className="grid12">
                    <div className="s7 hero-left">
                        <div data-hero><AvailabilityBadge text={contact.availability} /></div>
                        {home.intro && <p className="lead" data-hero>{home.intro}</p>}
                        <div className="btn-row" data-hero>
                            <Button href="#work">View projects →</Button>
                            <Button href="#contact" variant="secondary">Get in touch</Button>
                        </div>
                    </div>
                    <div className="s4 c9">
                        <Portrait src={home.photo} />
                    </div>
                </div>
                <dl className="meta-row" data-hero>
                    {meta.filter(([, v]) => v).map(([k, v]) => (
                        <div key={k}>
                            <dt className="label">{k}</dt>
                            <dd>{v}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
