"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import ComponentsLiveIndicator from "@/src/component/live-indicator";
import { gsapShowTextOnTop, gsapShowTextOnLeft } from "@/src/uitls/gsapUtils";
import SectionsContactForm from "./form";

const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ngurah-aditya-7404771b5/", icon: FaLinkedinIn },
    { label: "GitHub", href: "https://github.com/adityadharma", icon: FaGithub },
];

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
        <div ref={containerRef} className="bg-secondary border-b border-gray-200 flex-1 flex flex-col">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto px-6 py-20 w-full flex-1 flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-start">
                    {/* Left — intro copy + direct contact details */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 show-text-on-top w-fit">
                            <ComponentsLiveIndicator className="h-2 w-2" />
                            <span className="font-mono text-8d text-gray-500 border border-gray-200 rounded-full px-3 py-1 uppercase tracking-widest">
                                Get in touch
                            </span>
                        </div>

                        <h1 className="text-80d leading-none font-instrument-serif show-text-on-top">
                            {"Let's "}<span className="italic text-primary">talk.</span>
                        </h1>

                        <p className="text-gray-500 text-14d max-w-md show-text-on-left">
                            Have a project, a role, or just a question? Fill in the form and I&apos;ll get back to you as soon as I can.
                        </p>

                        <div className="w-full h-px bg-gray-200 mt-4 contact-item" />

                        <a
                            href="mailto:bagusaditya1899@gmail.com"
                            className="contact-item group flex items-center gap-2 font-instrument-serif text-24d text-gray-900 hover:text-primary transition-colors duration-300 w-fit"
                        >
                            bagusaditya1899@gmail.com
                            <GoArrowUpRight className="text-16d opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </a>

                        <div className="contact-item flex flex-col gap-1">
                            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Located</span>
                            <span className="text-sm text-gray-700">Bali, ID · Available remote</span>
                        </div>

                        <div className="contact-item flex items-center gap-3 mt-2">
                            {socials.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Icon className="w-[18px] h-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — form card */}
                    <div className="w-full bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_0_rgba(15,23,42,0.06)] show-text-on-left">
                        <SectionsContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
