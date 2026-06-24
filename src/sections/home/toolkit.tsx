"use client";
import { GrSubtract } from "react-icons/gr";
import {
    SiTypescript,
    SiReact,
    SiNodedotjs,
    SiAngular,
    SiGo,
    SiLaravel,
    SiDocker,
} from "react-icons/si";
import { IconType } from "react-icons";
import ComponentsLine from "@/src/component/line";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Tool = {
    name: string;
    icon: IconType;
    category: string;
};

const iconMap: Record<string, IconType> = {
    SiTypescript,
    SiReact,
    SiNodedotjs,
    SiAngular,
    SiGo,
    SiLaravel,
    SiDocker,
};




export default function SectionsHomeToolkit({ datas }: { datas: any }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<Element>(".box-item");
        gsap.from(items, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            },
        })

    }, { scope: containerRef });

    return (
        <div className="bg-secondary" ref={containerRef}>
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto py-20 px-10">
                <div className="flex gap-4 items-center font-instrument-serif italic text-31d pt-20">
                    <span className="show-text-on-left">Tools I</span>
                    <span className="text-primary show-text-on-right">reach for.</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 ">
                    {datas.map((dataTool: any, index: number) => {
                        const Icon = iconMap[dataTool.icon.value];
                        return (
                        <div
                            key={index}
                            className="box-item group bg-white border border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-[0_4px_24px_0_rgba(194,65,13,0.08)] hover:-translate-y-0.5 transition-[border-color,box-shadow] duration-300 cursor-default"
                        >
                            {/* icon */}
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                                {Icon && <Icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />}
                            </div>

                            <p className="font-semibold text-gray-800 text-sm mb-1">{dataTool.name.value}</p>

                            <span className="text-xs font-mono text-gray-400 group-hover:text-primary/60 transition-colors duration-300">
                                {dataTool.category.value}
                            </span>
                        </div>
                        );
                    })}
                </div>

            </div>
            <ComponentsLine />
        </div>
    );
}
