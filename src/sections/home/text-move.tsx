"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"



export default function SectionsHomeTextMove(data: any) {

    const marqueeRef = useRef<HTMLDivElement>(null)
    const skills = data.data?.[0]?.value || []
    const items = [...skills, ...skills]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 50,
                ease: "none",
                repeat: -1,
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-tertiary border-t border-b border-gray-200 py-3 overflow-hidden w-full">
            <div ref={marqueeRef} className="flex whitespace-nowrap">
                {items.map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-4 px-6">
                        <span className="text-primary font-mono text-24d">+</span>
                        <span className="font-instrument-serif italic text-31d">{skill}</span>
                    </span>
                ))}
            </div>
        </div>
    )
}
