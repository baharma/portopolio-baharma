import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <nav aria-label="Breadcrumb" className="crumbs label">
            {items.map((item, i) => (
                <span key={item.label} style={{ display: "contents" }}>
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                    ) : (
                        <span aria-current="page">{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
