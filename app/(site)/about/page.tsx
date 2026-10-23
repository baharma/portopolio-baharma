import type { Metadata } from "next";
import Portrait from "@/components/sections/portrait";
import Breadcrumb from "@/components/ui/breadcrumb";
import CtaBand from "@/components/ui/cta-band";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Full-stack software engineer based in Bali, working with React, Angular, Laravel, Golang and React Native.",
  alternates: { canonical: "/about" },
};

const doing = [
  { title: "Web front-ends", tech: "React · Angular · Next.js · TypeScript" },
  { title: "Back-ends & APIs", tech: "Golang · Gin · Laravel · Node.js" },
  { title: "Mobile", tech: "React Native" },
  { title: "AI in products", tech: "Transformers.js · Qwen LLM" },
];

const now: [string, string][] = [
  ["Working", "Front-End Developer at Taksu Tech"],
  ["Learning", "AI and emerging technologies, models in the browser, LLMs in products"],
  ["Based in", `${site.location.city} · ${site.location.tz}`],
  ["Open to", `${site.openTo}, available remote`],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero grain">
        <div className="container">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="grid12">
            <h1 className="display h1 s8" data-hero>Hi, I&apos;m <em>Aditya</em>.</h1>
          </div>
          <div className="grid12" style={{ marginTop: 24 }}>
            <div className="bio s7" data-hero>
              <p>I&apos;m a full-stack software engineer based in Bali, crafting web and mobile experiences.</p>
              <p>Right now I&apos;m a Front-End Developer at Taksu Tech, building interfaces in React and Angular with TypeScript. Before that I built Laravel and Livewire applications at Bali Promotion, and took on freelance full-stack work in Next.js.</p>
              <p>I specialize in React Native for cross-platform apps, and I&apos;m deepening my knowledge in AI and emerging technologies — from running models directly in the browser to wiring language models into real products.</p>
              {/* TODO: personal line (interests, hobbies) */}
            </div>
            <div className="s4 c9"><Portrait /></div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="do-title">
        <div className="container">
          <div className="section-head">
            <h2 id="do-title" className="display h2" data-reveal>What I <em>do</em></h2>
          </div>
          <ul className="do-grid">
            {doing.map((d) => (
              <li key={d.title} className="do-card" data-reveal>
                <h3>{d.title}</h3>
                <p className="label">{d.tech}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="now-title">
        <div className="container">
          <div className="section-head">
            <h2 id="now-title" className="display h2" data-reveal>Right <em>now</em></h2>
          </div>
          <dl>
            {now.map(([k, v]) => (
              <div key={k} className="def-row" data-reveal><dt className="label">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand label="Say hello" secondary={{ label: "See my experience", href: "/experience" }} />
    </>
  );
}
