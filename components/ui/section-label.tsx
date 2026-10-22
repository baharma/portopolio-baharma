export default function SectionLabel({ n, children }: { n: string; children: string }) {
    return (
        <p className="label" data-reveal>
            — {n} · {children}
        </p>
    );
}
