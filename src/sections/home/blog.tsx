"use client"
import ComponentsLine from "@/src/component/line";
import GradientImage from "@/src/component/gradient-image";
import { GrSubtract } from "react-icons/gr";
import { HiArrowRight } from "react-icons/hi";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";

type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tag: string;
    image: string;
};

const posts: BlogPost[] = [

];

export default function SectionsHomeBlogs() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<Element>(".box-item");
        gsap.from(items, {
            opacity: 0,
            y: 30,
            duration: 1.5,
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
                {/* header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 show-text-on-left">
                            <GrSubtract className="text-gray-500 w-6 h-6" />
                            <span className="text-8d font-mono text-gray-500">Writing</span>
                        </div>
                        <div className="flex gap-4 items-center font-instrument-serif italic text-31d ">
                            <span className="show-text-on-left">Thoughts I</span>
                            <span className="text-primary show-text-on-right">wrote down.</span>
                        </div>
                    </div>

                    <a
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-colors duration-200 group cursor-pointer"
                    >
                        All posts
                        <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </a>
                </div>

                {/* list */}
                <div className="mt-12">
                    {posts && posts.length > 0 ? (
                        // Kondisi TRUE: Jika posts ada dan panjang array lebih dari 0
                        posts.map((post) => (
                            <div key={post.slug} className="box-item">
                                <ComponentsLine />
                                <a
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col md:flex-row md:items-center gap-6 py-7 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                                >
                                    {/* thumbnail */}
                                    <div className="relative w-full md:w-48 h-32 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                        <GradientImage
                                            src={post.image}
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* content */}
                                    <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                        <div className="flex-1 max-w-xl space-y-2">
                                            <span className="inline-block text-xs font-mono text-primary/70 bg-primary/8 px-2 py-0.5 rounded-full">
                                                {post.tag}
                                            </span>
                                            <p className="font-semibold text-gray-800 leading-snug group-hover:text-primary transition-colors duration-200">
                                                {post.title}
                                            </p>
                                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex md:flex-col md:items-end gap-3 md:gap-1 shrink-0">
                                            <span className="text-xs font-mono text-gray-400">{post.date}</span>
                                            <span className="text-xs font-mono text-gray-400">{post.readTime}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    ) : (
                        // Kondisi FALSE: Jika posts null atau kosong
                        <div className="box-item">
                            <p className="py-7 text-gray-500 text-sm">Not Yet Create.</p>
                        </div>
                    )}
                    <ComponentsLine />
                </div>

                {/* mobile all posts link */}
                <a
                    href="/blog"
                    className="md:hidden flex items-center gap-2 mt-8 text-sm font-mono text-gray-400 hover:text-primary transition-colors duration-200 group cursor-pointer"
                >
                    All posts
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
            </div>
            <ComponentsLine />
        </div>
    );
}
