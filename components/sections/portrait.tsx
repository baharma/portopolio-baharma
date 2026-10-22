import Image from "next/image";
import { site } from "@/content/site";

// TODO: replace /placeholders/portrait.svg with a real photo (e.g. /portrait.jpg).
const PORTRAIT = "/placeholders/portrait.svg";

export default function Portrait() {
    return (
        <div className="portrait-wrap" data-hero>
            <div className="duotone">
                <Image src={PORTRAIT} alt="" fill priority sizes="(max-width: 900px) 100vw, 33vw" unoptimized />
            </div>
            <div className="float-card">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 15s5-4.5 5-8.5a5 5 0 0 0-10 0C2 10.5 7 15 7 15Z" />
                    <circle cx="7" cy="6.5" r="1.8" />
                </svg>
                {site.location.short} · {site.location.tz}
            </div>
        </div>
    );
}
