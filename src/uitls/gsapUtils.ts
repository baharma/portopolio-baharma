import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const gsapShowTextOnTop = () => {
    gsap.utils.toArray<Element>(".show-text-on-top").forEach((el) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
            },
        })
    })
}

export const gsapShowTextOnRight = () => {
    gsap.utils.toArray<Element>(".show-text-on-right").forEach((el) => {
        gsap.from(el, {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
            },
        })
    })
}

export const gsapShowTextOnLeft = () => {
    gsap.utils.toArray<Element>(".show-text-on-left").forEach((el) => {
        gsap.from(el, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
            },
        })
    })
}
