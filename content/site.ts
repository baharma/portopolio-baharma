// Single source of truth for site-wide facts.
// Missing values are `undefined` with a TODO; the UI leaves those spots empty.
export const site = {
    name: "Aditya Dharma",
    domain: "baharma.my.id",
    url: "https://baharma.my.id",
    year: 2026,
    email: "bagusaditya1899@gmail.com",
    github: { handle: "@adityadharma", url: "https://github.com/adityadharma" },
    linkedin: {
        label: "Ngurah Aditya",
        url: undefined as string | undefined, // TODO: LinkedIn profile URL
    },
    // TODO: switch to "/cv.pdf" once public/cv.pdf exists. Until then this is the CV link the site already used.
    cvUrl: "https://docs.google.com/document/d/e/2PACX-1vRMS2DgLLAcl08YZj37S4pIARkkEApXsQ2YMldiwy3sZt_fvIG2wQBwfkrIzR1rVH-ZGDxEtGN_GGyy/pub",
    location: { city: "Bali, Indonesia", short: "Bali, ID", tz: "UTC+8" },
    availability: "Available for freelance & full-time",
    currently: "Front-End Dev @ Taksu Tech",
    focus: "Full-stack Development",
    openTo: "Freelance & full-time",
    intro:
        "Full-stack software engineer crafting web and mobile experiences. I specialize in React Native for cross-platform development and I'm deepening my knowledge in AI and emerging technologies.",
    nav: [
        { label: "Experience", href: "/experience" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/#contact" },
    ],
} as const;
