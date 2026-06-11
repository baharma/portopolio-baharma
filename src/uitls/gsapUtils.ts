import gsap from "gsap"


export const gsapShowTextOnTop = () => {
    gsap.from(".show-text-on-top", {
        y: -50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".show-text-on-top",
            start: "top top",
        }
    })
}



export const gsapShowTextOnRight = () => {
    gsap.from(".show-text-on-right", {
        x: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".show-text-on-right",
            start: "top top",
        }
    })
}

export const gsapShowTextOnLeft = () => {
    gsap.from(".show-text-on-left", {
        x: -50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".show-text-on-left",
            start: "top top",
        }
    })
}   