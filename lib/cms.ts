// Content comes from the headless CMS (https://api.baharma.my.id, site slug "baharma").
// Every getter returns safe empty values when the API is down or a field is unfilled, so the UI omits that spot.
import * as simpleIcons from "simple-icons";
import { site } from "@/content/site";

const API = process.env.CMS_API_URL ?? "https://api.baharma.my.id/api";
const SLUG = "baharma";
const REVALIDATE = 3600;

export const CMS_TAGS = ["home", "experience", "about", "projects", "contact"] as const;
export type CmsPage = (typeof CMS_TAGS)[number];

/* ---------- raw API plumbing ---------- */

type Field = { key?: string; value?: unknown };
type Raw = unknown;

async function fetchPage(page: CmsPage): Promise<Record<string, Raw> | null> {
    try {
        const res = await fetch(`${API}/website/slug/${SLUG}/page/${page}`, {
            next: { revalidate: REVALIDATE, tags: [page] },
        });
        if (!res.ok) return null;
        const json = await res.json();
        const value = json?.data?.workflows?.[0]?.value;
        // value is `{ <workflow_name>: { ...fields } }`
        return value ? (Object.values(value)[0] as Record<string, Raw>) ?? null : null;
    } catch {
        return null;
    }
}

/** A CMS field is `{ key, label, type, value }`; plain values pass through. */
const unwrap = (v: Raw): Raw => (v && typeof v === "object" && !Array.isArray(v) && "value" in (v as Field) ? (v as Field).value : v);

const str = (v: Raw): string | undefined => {
    const u = unwrap(v);
    if (typeof u === "number") return String(u);
    return typeof u === "string" && u.trim() ? u.trim() : undefined;
};

/** Repeated items arrive as single fields, arrays of fields or objects of fields; flatten them to `{ key: value }`. */
function record(item: Raw): Record<string, Raw> {
    if (Array.isArray(item)) return Object.assign({}, ...item.map(record));
    if (item && typeof item === "object") {
        const f = item as Field & Record<string, Raw>;
        if (typeof f.key === "string" && "value" in f) {
            const inner = f.value;
            const nested = inner && typeof inner === "object" && !Array.isArray(inner) ? record(inner) : {};
            return { [f.key.split(".").pop()!]: inner, ...nested };
        }
        return Object.fromEntries(Object.entries(f).map(([k, v]) => [k, unwrap(v)]));
    }
    return {};
}

const list = (v: Raw): Raw[] => {
    const u = unwrap(v);
    return Array.isArray(u) ? u : [];
};

/** String list from `["a", "b"]`, `[{key:"item",value:"a"}]` or `[{ item: "a" }]`. */
const strings = (v: Raw): string[] =>
    list(v)
        .map((i) => str(i) ?? str(record(i).item) ?? str(record(i).name))
        .filter((s): s is string => !!s);

const images = (v: Raw): string[] => list(v).map((i) => str(i) ?? str(record(i).url) ?? str(record(i).src)).filter((s): s is string => !!s);

const stripHtml = (html: string) =>
    html
        .replace(/<\/(p|li|h\d|div)>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

const lines = (v: Raw): string[] =>
    (str(v) ? stripHtml(str(v)!) : "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

/* ---------- experience ---------- */

export type Experience = {
    id: string;
    role?: string;
    company?: string;
    type?: string;
    start?: string; // YYYY-MM
    end: string | null; // YYYY-MM, null = current role
    bullets: string[];
    stack: string[];
    dates?: string; // original label, used when the range can't be parsed
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** "Jun 2025 – Present" → { start: "2025-06", end: null } */
function parseRange(label?: string): { start?: string; end: string | null } {
    const found = [...(label ?? "").matchAll(/([A-Za-z]{3})[a-z]*\.?\s+(\d{4})/g)].map((m) => {
        const mi = MONTHS.indexOf(m[1].toLowerCase());
        return mi === -1 ? undefined : `${m[2]}-${String(mi + 1).padStart(2, "0")}`;
    });
    const start = found[0];
    const open = /present|now|current|ongoing/i.test(label ?? "");
    return { start, end: open ? null : found[1] ?? start ?? null };
}

export async function getExperience(): Promise<{ intro?: string; items: Experience[] }> {
    const data = await fetchPage("experience");
    const items = list(data?.history).map((raw, i): Experience => {
        const r = record(raw);
        const dates = str(r.time_line) ?? str(r.timeline);
        const range = parseRange(dates);
        const endDate = str(r.end_date);
        return {
            id: `exp-${i}`,
            role: str(r.position),
            company: str(r.detail),
            start: range.start,
            end: endDate ? endDate.slice(0, 7) : range.end,
            bullets: lines(r.description),
            stack: strings(r.stack_tech),
            dates,
        };
    });
    return { intro: data?.description ? lines(data.description).join(" ") || undefined : undefined, items };
}

/* ---------- projects ---------- */

export type Project = {
    slug: string;
    title: string;
    category?: string;
    filter: string;
    year?: number;
    description?: string;
    detail?: string[];
    tags: string[];
    liveUrl?: string;
    cover?: string;
    screens?: { src: string; caption: string }[];
};

export async function getProjects(): Promise<Project[]> {
    const data = await fetchPage("projects");
    const seen = new Set<string>();
    return list(data?.products).flatMap((raw): Project[] => {
        const r = record(raw);
        const d = record(r.description);
        const title = str(d.name_project) ?? str(r.name);
        if (!title) return [];
        let slug = slugify(title) || "project";
        for (let n = 2; seen.has(slug); n++) slug = `${slugify(title)}-${n}`;
        seen.add(slug);
        const imgs = images(d.image_list);
        const year = Number(str(d.year));
        const category = str(d.type_project) ?? str(r.category);
        return [
            {
                slug,
                title,
                category,
                filter: category ?? "Other",
                year: Number.isFinite(year) && year > 0 ? year : undefined,
                description: str(d.description_short),
                detail: lines(d.description_detail),
                tags: strings(d.list_stack),
                liveUrl: str(d.project_url),
                cover: imgs[0],
                screens: imgs.slice(1).map((src) => ({ src, caption: title })),
            },
        ];
    });
}

export const getProject = async (slug: string) => (await getProjects()).find((p) => p.slug === slug);

/** Italic accent goes on the last word of the title: "Baharma *Record*". */
export function splitTitle(title: string) {
    const i = title.lastIndexOf(" ");
    return i === -1 ? { head: "", accent: title } : { head: title.slice(0, i), accent: title.slice(i + 1) };
}

/* ---------- home ---------- */

export type Tool = { name: string; category: string; path: string; hex: string };

const iconIndex = new Map<string, { path: string; hex: string }>();
for (const v of Object.values(simpleIcons)) {
    if (v && typeof v === "object" && "slug" in v && "path" in v) {
        const i = v as { slug: string; path: string; hex: string; title: string };
        iconIndex.set(i.slug, i);
        iconIndex.set(slugify(i.title).replace(/-/g, ""), i);
    }
}

const findIcon = (...names: (string | undefined)[]) => {
    for (const n of names) {
        if (!n) continue;
        const hit = iconIndex.get(n.toLowerCase()) ?? iconIndex.get(slugify(n).replace(/-/g, "")) ?? iconIndex.get(slugify(n).replace(/-?js$/, ""));
        if (hit) return hit;
    }
};

export type Home = {
    intro?: string;
    currently: { label: string; value?: string }[];
    marquee: string[];
    tools: Tool[];
};

export async function getHome(): Promise<Home> {
    const data = await fetchPage("home");
    const hero = record(data?.hero_main);
    const currently = list(hero.currently)
        .map((c) => {
            const r = record(c);
            return { label: str(r.label) ?? "", value: str(r.value) };
        })
        .filter((c) => c.label);
    const tools = list(data?.tool).flatMap((raw): Tool[] => {
        const r = record(raw);
        const name = str(r.name);
        const icon = findIcon(str(r.icon), name);
        return name && icon ? [{ name, category: str(r.category) ?? "Other", path: icon.path, hex: `#${icon.hex}` }] : [];
    });
    return {
        intro: str(hero.description),
        currently,
        marquee: strings(unwrap(data?.list)),
        tools,
    };
}

/* ---------- contact ---------- */

export type SocialLink = { label: string; url?: string };

export type Contact = {
    email: string;
    location: string;
    availability: string;
    intro?: string;
    socials: SocialLink[];
};

export async function getContact(): Promise<Contact> {
    const data = await fetchPage("contact");
    return {
        email: str(data?.email) ?? site.email,
        location: str(data?.location) ?? site.location.city,
        availability: str(data?.availability) ?? site.availability,
        intro: str(data?.intro),
        socials: list(data?.social_links).flatMap((raw): SocialLink[] => {
            const r = record(raw);
            const label = str(r.label);
            return label ? [{ label, url: str(r.url) }] : [];
        }),
    };
}
