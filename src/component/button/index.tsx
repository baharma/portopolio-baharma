"use client";

import { GoArrowRight } from "react-icons/go";

const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-transparent text-primary border border-primary hover:bg-primary/10",
}

export default function ComponentsButton({
    title,
    onClick,
    variant = "primary",
}: {
    title: string;
    onClick?: () => void;
    variant?: keyof typeof variants;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-10 py-4 rounded-2xl transition-colors font-sans text-10d flex items-center gap-2 ${variants[variant]}`}
        >
            <span>{title}</span> <GoArrowRight />
        </button>
    );
}
