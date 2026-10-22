"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Page-load stagger for [data-hero] and scroll reveals for [data-reveal]. Skipped under prefers-reduced-motion. */
export default function Motion() {
    const pathname = usePathname();

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const base = { y: 24, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" };
                const hero = gsap.utils.toArray<HTMLElement>("[data-hero]");
                if (hero.length) gsap.from(hero, { ...base, stagger: 0.12 });
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
                    gsap.from(el, { ...base, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
                });
            });
            return () => mm.revert();
        },
        { dependencies: [pathname], revertOnUpdate: true },
    );

    return null;
}
