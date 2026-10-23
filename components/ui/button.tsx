import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "paper" | "light";

type Props = {
    href: string;
    variant?: Variant;
    children: ReactNode;
    external?: boolean;
    full?: boolean;
    className?: string;
};

export default function Button({ href, variant = "primary", children, external, full, className = "" }: Props) {
    const cls = `btn btn-${variant}${full ? " btn-full" : ""} ${className}`.trim();
    if (external || /^(https?:|mailto:|#)/.test(href)) {
        return (
            <a className={cls} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
            </a>
        );
    }
    return (
        <Link className={cls} href={href}>
            {children}
        </Link>
    );
}
