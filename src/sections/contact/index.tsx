"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { gsapShowTextOnTop, gsapShowTextOnLeft } from "@/src/uitls/gsapUtils";
import SectionsContactForm from "./form";

export default function SectionsContact() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsapShowTextOnTop();
        gsapShowTextOnLeft();

        gsap.from(".contact-item", {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            },
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-secondary border-b border-gray-200">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 flex flex-col gap-6 w-full">
                <div className="flex items-center gap-3 show-text-on-top mt-20">
                    <span className="font-mono text-8d text-gray-500 border border-gray-200 rounded-full px-3 py-1">
                        Get in touch
                    </span>
                </div>

                <h1 className="text-80d leading-none font-instrument-serif show-text-on-top">
                    {"Let's "}<span className="italic text-primary">talk.</span>
                </h1>

                <p className="text-gray-500 text-14d max-w-xl show-text-on-left">
                    Have a project, a role, or just a question? Fill in the form and I&apos;ll get back to you as soon as I can.
                </p>

                {/* Form — wrapped in a card and constrained so it reads comfortably */}
                <div className="w-full  bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mt-16 show-text-on-left">
                    <SectionsContactForm />
                </div>

            </div>
        </div>
    );
}
