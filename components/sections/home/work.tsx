import { getProjects } from "@/lib/cms";
import Button from "@/components/ui/button";
import ProjectCard from "@/components/ui/project-card";

export default async function Work() {
    const [featured, ...rest] = await getProjects();
    if (!featured) return null;
    return (
        <section id="work" className="section" aria-labelledby="work-title">
            <div className="container">
                <div className="grid12 section-head">
                    <div className="s7">
                        <h2 id="work-title" className="display h2" data-reveal>Selected <em>work</em></h2>
                    </div>
                    <p className="s4 c9 body muted" data-reveal>
                        A few things I&apos;ve built recently. More on my GitHub, or reach out and I&apos;ll walk you through them.
                    </p>
                </div>
                <div className="bento">
                    <ProjectCard project={featured} featured />
                    {rest.slice(0, 2).map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
                <div className="center-row">
                    <Button href="/projects">View all projects →</Button>
                </div>
            </div>
        </section>
    );
}
