import { useId } from "react";

type Props = {
    name: string;
    path: string;
    hex: string;
    gradient?: [string, string];
};

export default function BrandLogo({ name, path, hex, gradient }: Props) {
    const id = useId();
    return (
        <svg viewBox="0 0 24 24" role="img" aria-label={`${name} logo`}>
            {gradient && (
                <defs>
                    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={gradient[0]} />
                        <stop offset="1" stopColor={gradient[1]} />
                    </linearGradient>
                </defs>
            )}
            <path d={path} fill={gradient ? `url(#${id})` : hex} />
        </svg>
    );
}
