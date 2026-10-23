import { getHome } from "@/lib/cms";
import SectionLabel from "@/components/ui/section-label";
import ToolkitGrid from "./toolkit-grid";

export default async function Toolkit() {
    const { tools } = await getHome();
    if (tools.length === 0) return null;
    const toolCategories = ["All", ...new Set(tools.map((t) => t.category))];
    return (
        <section className="section" aria-labelledby="tools-title">
            <div className="container">
                <div className="section-head">
                    <SectionLabel n="03">Toolkit</SectionLabel>
                    <h2 id="tools-title" className="display h2" data-reveal style={{ marginTop: 20 }}>Tools I <em>reach for</em></h2>
                </div>
                <div data-reveal>
                    <ToolkitGrid tools={tools} categories={toolCategories} />
                </div>
            </div>
        </section>
    );
}
