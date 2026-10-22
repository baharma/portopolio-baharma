import { site } from "@/content/site";
import AvailabilityBadge from "@/components/ui/availability-badge";
import Button from "@/components/ui/button";
import Portrait from "../portrait";

const meta = [
    ["Currently", site.currently],
    ["Based in", site.location.city],
    ["Focus", site.focus],
    ["Open to", site.openTo],
];

export default function Hero() {
    return (
        <section className="hero grain" aria-labelledby="hero-name">
            <div className="container">
                <p className="label" data-hero>— Portfolio · {site.year} · {site.domain}</p>
                <h1 id="hero-name" className="display h-hero hero-name" data-hero>
                    Aditya Dharma<span className="dot">.</span>
                </h1>
                <div className="grid12">
                    <div className="s7 hero-left">
                        <div data-hero><AvailabilityBadge /></div>
                        <p className="lead" data-hero>{site.intro}</p>
                        <div className="btn-row" data-hero>
                            <Button href="#work">View projects →</Button>
                            <Button href="#contact" variant="secondary">Get in touch</Button>
                        </div>
                    </div>
                    <div className="s4 c9">
                        <Portrait />
                    </div>
                </div>
                <dl className="meta-row" data-hero>
                    {meta.map(([k, v]) => (
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
