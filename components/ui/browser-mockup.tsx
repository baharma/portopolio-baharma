import Image from "next/image";

type Props = {
    label: string;
    src?: string;
    alt: string;
    ratio?: "r169" | "r43" | "";
    priority?: boolean;
};

const PLACEHOLDER = "/placeholders/screen.svg";

export default function BrowserMockup({ label, src, alt, ratio = "", priority }: Props) {
    return (
        <div className="mock">
            <div className="mock-bar">
                <div className="mock-dots" aria-hidden="true">
                    <i style={{ background: "#FF5F57" }} />
                    <i style={{ background: "#FEBC2E" }} />
                    <i style={{ background: "#28C840" }} />
                </div>
                <span className="mock-url">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                        <rect x="1" y="5" width="8" height="6" rx="1.5" />
                        <path d="M3 5V3.5a2 2 0 0 1 4 0V5" />
                    </svg>
                    {label}
                </span>
            </div>
            <div className={`mock-screen ${ratio}`}>
                <Image
                    src={src ?? PLACEHOLDER}
                    alt={src ? alt : ""}
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                    priority={priority}
                    unoptimized={!src}
                />
            </div>
        </div>
    );
}
