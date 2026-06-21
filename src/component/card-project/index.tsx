import GradientImage from "@/src/component/gradient-image";
import { GoArrowUpRight } from "react-icons/go";

interface CardProjectProps {
    tags?: string[]
    tagline?: string
    title: string
    description: string
    images?: string[]
    techStack?: string[]
    year?: string | number
    caseStudyUrl?: string
}

export default function ComponentsCardProject({
    tags = [],
    tagline,
    title,
    description,
    images = [],
    techStack = [],
    year,
    caseStudyUrl = "#",
}: CardProjectProps) {
    return (
        <div className="w-full">
            {/* Dark card */}
            <div className="bg-[#1a1410] rounded-2xl overflow-hidden p-6 md:p-8">
                {/* Top tags */}
                {tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        {tags.map((tag, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {i > 0 && <span className="text-gray-500 text-10d">·</span>}
                                <span className="text-gray-400 font-mono text-10d uppercase tracking-widest">{tag}</span>
                            </span>
                        ))}
                    </div>
                )}

                {/* Tagline */}
                {tagline && (
                    <p className="text-gray-400 font-mono text-10d uppercase tracking-widest mb-2">
                        {tagline}
                    </p>
                )}

                {/* Italic serif title */}
                <h2 className="font-instrument-serif italic text-28d text-white mb-6 leading-tight">
                    {title}
                </h2>

                {/* Image grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((src, i) => (
                            <div key={i} className="aspect-3/4 relative rounded-lg overflow-hidden bg-[#2a1f15]">
                                <GradientImage
                                    src={src}
                                    alt={`${title} screenshot ${i + 1}`}
                                    unoptimized
                                    enableLightbox
                                    lightboxSize="large"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && (
                    <div className="grid grid-cols-4 gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-3/4 rounded-lg bg-[#2a1f15]" />
                        ))}
                    </div>
                )}
            </div>

            {/* Below card info */}
            <div className="mt-5 px-1">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="font-instrument-serif text-20d leading-snug">{title}</h3>
                    {year && <span className="font-mono text-12d text-gray-400 shrink-0">{year}</span>}
                </div>

                <p className="text-12d text-gray-500 mt-2 max-w-lg leading-relaxed">
                    {description}
                </p>

                {/* Tech stack chips */}
                {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <a
                    href={caseStudyUrl}
                    className="inline-flex items-center gap-2 mt-4 font-serif text-8d uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                >
                    VIEW CASE STUDY
                    <GoArrowUpRight />
                </a>
            </div>
        </div>
    )
}
