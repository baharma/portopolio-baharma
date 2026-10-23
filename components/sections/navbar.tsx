"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import AvailabilityBadge from "@/components/ui/availability-badge";
import Button from "@/components/ui/button";

const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
    </svg>
);

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

    return (
        <header className="nav">
            <div className="container">
                <Link href="/" className="logo" aria-label={`${site.domain} home`}>
                    <i aria-hidden="true" />
                    {site.domain}
                </Link>

                <nav aria-label="Primary" className="nav-links">
                    {site.nav.map((l) => (
                        l.href.includes("#") ? (
                            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
                        ) : (
                            <Link key={l.href} href={l.href} className="nav-link" aria-current={isActive(l.href) ? "page" : undefined}>
                                {l.label}
                            </Link>
                        )
                    ))}
                </nav>

                <a className="btn btn-secondary nav-cv nav-cv-desktop" href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                    <DownloadIcon /> Download CV
                </a>

                <button type="button" className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                        <path d="M2 5.5h14M2 12.5h14" />
                    </svg>
                </button>
            </div>

            <div id="mobile-menu" className="menu" data-open={open} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
                <div className="menu-top">
                    <Link href="/" className="logo" onClick={() => setOpen(false)}>
                        <i aria-hidden="true" />
                        {site.domain}
                    </Link>
                    <button ref={closeRef} type="button" className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                            <path d="M3 3l10 10M13 3 3 13" />
                        </svg>
                    </button>
                </div>
                <div className="menu-body">
                    <ul className="menu-links">
                        {site.nav.map((l, i) => (
                            <li key={l.href}>
                                {l.href.includes("#") ? (
                                    <a href={l.href} onClick={() => setOpen(false)}>
                                        <span>{String(i + 1).padStart(2, "0")}</span>
                                        {l.label}
                                    </a>
                                ) : (
                                    <Link href={l.href} onClick={() => setOpen(false)} aria-current={isActive(l.href) ? "page" : undefined}>
                                        <span>{String(i + 1).padStart(2, "0")}</span>
                                        {l.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <AvailabilityBadge />
                    <Button href={site.cvUrl} external full>
                        <DownloadIcon /> Download CV
                    </Button>
                    <div className="menu-mini">
                        <a href={`mailto:${site.email}`}>Email</a>
                        {site.linkedin.url && <a href={site.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                        <a href={site.github.url} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <span>{site.location.tz}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
