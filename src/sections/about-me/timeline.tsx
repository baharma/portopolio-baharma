"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { GrSubtract } from "react-icons/gr";
import { gsapShowTextOnRight, gsapShowTextOnTop } from "@/src/uitls/gsapUtils";
import BlogContent from "@/src/component/render-blog";

export default function SectionsTimeLine({ data }: { data: any[] }) {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsapShowTextOnTop();
        gsapShowTextOnRight();

        gsap.utils.toArray<Element>(".timeline-item").forEach((el) => {
            gsap.from(el, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                clearProps: "opacity,transform",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    once: true,
                },
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="bg-secondary border-b border-gray-200">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 flex justify-center flex-col w-full gap-6">
                <div className="flex items-center gap-4 show-text-on-right mt-50">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-8d font-mono text-gray-500">
                        My academic background
                    </span>
                </div>
                <div className="flex gap-4 items-center font-instrument-serif italic text-31d pt-20">
                    <span className="show-text-on-top">Where I </span> <span className="show-text-on-top text-primary">studied.</span>
                </div>

                <div className="ms-5 md:ms-20 mt-20 mb-40">
                    {data.map((item, index) => (
                        <div key={index} className="timeline-item relative flex gap-10 pb-30 last:pb-0">
                            {index < data.length - 1 && (
                                <div className="absolute left-5 top-14 bottom-0 w-2 -translate-x-1/2 rounded-full bg-primary/25" />
                            )}
                            <div className="w-10 h-10 mt-1 shrink-0 rounded-full bg-white border-2 border-primary" />
                            <div className="flex flex-col gap-3">
                                <span className="font-sans text-10d text-gray-500">
                                    {item?.timeline.value}
                                </span>
                                <span>
                                    <span className="text-primary font-instrument-serif text-24d">
                                        {item.name.value}
                                    </span>{" "}
                                    <span className="text-gray-500 font-mono text-18d">
                                        — {item?.major?.value}
                                    </span>
                                </span>
                                <BlogContent content={item.description.value} className="text-gray-500 text-12d leading-relaxed max-w-3xl" />

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
