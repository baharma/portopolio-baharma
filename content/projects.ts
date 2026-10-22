export type ProjectFilter = "Web App" | "SaaS" | "Personal";

export type Project = {
    slug: string;
    title: string;
    category: string;
    filter: ProjectFilter;
    year: number;
    featured?: boolean;
    description: string;
    tags: string[];
    // Everything below is case-study detail. `undefined` = TODO, the UI leaves it out.
    tagline?: string; // TODO
    role?: string; // TODO
    liveUrl?: string; // TODO
    sourceUrl?: string; // TODO
    problem?: string; // TODO
    cover?: string; // TODO: hero screenshot path in /public
    steps?: { title: string; text: string }[];
    screens?: { src: string; caption: string }[]; // TODO
    stack?: { name: string; note?: string }[];
    learnings?: { hardest?: string; next?: string }; // TODO
};

export const projects: Project[] = [
    {
        slug: "baharma-record",
        title: "Baharma Record",
        category: "Web Application",
        filter: "Web App",
        year: 2025,
        featured: true,
        description:
            "A meeting recorder that lives entirely in your browser. Record a tab (Zoom, Meet, Discord) plus your mic, get a timestamped transcript, and keep all audio and data on your machine.",
        tags: ["Next.js", "TypeScript", "Transformers.js"],
        steps: [
            { title: "Capture", text: "Tab audio + your mic" },
            { title: "Transcribe", text: "Timestamped transcript" },
            { title: "Keep", text: "Stays on your machine" },
        ],
        stack: [
            { name: "Next.js", note: "App framework and UI" },
            { name: "TypeScript", note: "Typed codebase end to end" },
            { name: "Transformers.js", note: "In-browser speech-to-text" },
        ],
    },
    {
        slug: "cms-all-api-management",
        title: "CMS All API Management",
        category: "Multi-tenant SaaS Platform",
        filter: "SaaS",
        year: 2025,
        description:
            "A multi-tenant CMS for generating client wedding websites, with a drag-and-drop JSON-schema form builder, template cloning, and a token-secured public content API.",
        tags: ["Angular 21", "TypeScript", "Golang", "Gin", "Gorm", "Qwen LLM"],
        stack: ["Angular 21", "TypeScript", "Golang", "Gin", "Gorm", "Qwen LLM"].map((name) => ({ name })),
    },
    {
        slug: "portfolio-aditya-dharma",
        title: "Portfolio Aditya Dharma",
        category: "Personal Showcase",
        filter: "Personal",
        year: 2025,
        description: "A server-rendered personal portfolio with a custom responsive design system and GSAP scroll animations.",
        tags: ["Next.js 16", "React 19", "Tailwind v4", "GSAP"],
        stack: ["Next.js 16", "React 19", "Tailwind v4", "GSAP"].map((name) => ({ name })),
    },
];

export const projectFilters: ("All" | ProjectFilter)[] = ["All", "Web App", "SaaS", "Personal"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Italic accent goes on the last word of the title: "Baharma *Record*". */
export function splitTitle(title: string) {
    const i = title.lastIndexOf(" ");
    return i === -1 ? { head: "", accent: title } : { head: title.slice(0, i), accent: title.slice(i + 1) };
}
