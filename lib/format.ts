import type { Experience } from "@/lib/cms";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string) {
    const [y, m] = ym.split("-").map(Number);
    return `${MONTHS[m - 1]} ${y}`;
}

/** Falls back to the CMS date label when the range can't be parsed. */
export function formatRange(e: Pick<Experience, "start" | "end" | "dates">) {
    if (!e.start) return e.dates ?? "";
    return `${formatMonth(e.start)} – ${e.end ? formatMonth(e.end) : "Present"}`;
}

/** Inclusive month count between start and end (or today for the current role). */
export function formatDuration(e: Pick<Experience, "start" | "end">, now = new Date()) {
    if (!e.start) return "";
    const [sy, sm] = e.start.split("-").map(Number);
    const [ey, em] = e.end ? e.end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
    const total = (ey - sy) * 12 + (em - sm) + 1;
    const years = Math.floor(total / 12);
    const months = total % 12;
    const parts = [];
    if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
    return parts.join(" ") || "1 mo";
}
