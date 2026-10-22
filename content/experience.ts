export type Experience = {
    id: string;
    role: string;
    company: string;
    type: "Full-time" | "Freelance";
    start: string; // YYYY-MM
    end: string | null; // YYYY-MM, null = current role
    bullets: string[];
    stack: string[];
    location?: string; // TODO: location of each role
    companyNote?: string; // TODO: one-line company description
};

// Newest first.
export const experience: Experience[] = [
    {
        id: "taksu-tech",
        role: "Front End Developer",
        company: "Taksu Tech",
        type: "Full-time",
        start: "2025-06",
        end: null,
        bullets: ["Building and maintaining production front-ends in React.js and Angular, written in TypeScript."],
        stack: ["React.js", "Angular.js", "TypeScript"],
    },
    {
        id: "bali-promotion",
        role: "Web Developer",
        company: "Bali Promotion",
        type: "Full-time",
        start: "2025-01",
        end: "2025-06",
        bullets: [
            "Built and maintained web applications with Laravel and Livewire, with React.js on the front end.",
            "Worked with Docker-based environments and on-page SEO.",
        ],
        stack: ["Laravel", "React.js", "Docker", "Livewire", "SEO"],
    },
    {
        id: "catatia",
        role: "Full-stack Developer",
        company: "Catatia",
        type: "Freelance",
        start: "2024-12",
        end: "2025-02",
        bullets: ["Built features end-to-end with Next.js, React.js and Prisma."],
        stack: ["Next.js", "React.js", "Prisma.js"],
    },
];
