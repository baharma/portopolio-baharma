"use client";

import { useEffect, useRef, useState } from "react";

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

    async function copy() {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            // Clipboard unavailable (insecure context / denied): the mailto link still works.
        }
    }

    return (
        <button type="button" className="btn btn-secondary copy-btn" onClick={copy} data-copied={copied}>
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.5l3.2 3L13 4.5" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="5" y="5" width="8" height="8" rx="1.5" />
                    <path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" />
                </svg>
            )}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
    );
}
