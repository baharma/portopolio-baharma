"use client";

import { useState } from "react";
import BrandLogo from "@/components/ui/brand-logo";

type Tool = { name: string; category: string; path: string; hex: string; gradient?: [string, string]; darkTile?: boolean };

export default function ToolkitGrid({ tools, categories }: { tools: Tool[]; categories: string[] }) {
    const [active, setActive] = useState("All");
    const count = (c: string) => (c === "All" ? tools.length : tools.filter((t) => t.category === c).length);
    const visible = active === "All" ? tools : tools.filter((t) => t.category === active);

    return (
        <>
            <div className="chips" role="group" aria-label="Filter tools" style={{ marginBottom: 40 }}>
                {categories.map((c) => (
                    <button key={c} type="button" className="chip" aria-pressed={active === c} onClick={() => setActive(c)}>
                        {c} {count(c)}
                    </button>
                ))}
            </div>
            <ul className="tools">
                {visible.map((t) => (
                    <li key={t.name} className="tool">
                        <div className="tool-top">
                            <div className={`logo-tile${t.darkTile ? " dark" : ""}`}>
                                <BrandLogo name={t.name} path={t.path} hex={t.hex} gradient={t.gradient} />
                            </div>
                            <span className="label">{t.category}</span>
                        </div>
                        <p className="tool-name">{t.name}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
