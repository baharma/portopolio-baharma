"use client";

import ComponentsButton from "@/src/component/button";
import ComponentsCardProject from "@/src/component/card-project";
import ComponentsLine from "@/src/component/line";

export default function SectionsHomeCardProject() {
    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto">
                <div className="flex gap-4 items-center  font-instrument-serif italic text-31d pt-20">
                    <span className="">Project,</span> <span className=" text-primary">recent</span>
                </div>
                <p className=" text-gray-500 font-sans text-8d mb-20 w-full md:w-400">
                    to many projects, to many works, to many experiences, to many stories, to many things that i want to share, but i don't have time to write it all here. so if you want to see my project, you can visit my github or linkedin. or you can contact me and i will share it with you. thank you for visiting my portfolio.
                </p>

                <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                    <ComponentsCardProject
                        tags={["Featured", "E-Commerce"]}
                        tagline="Where homes feel alive"
                        title="Solene Sofa, Arctic Cloud, Mira."
                        description="A warm, editorial commerce experience for a furniture brand."
                        images={["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"]}
                        techStack={["Angular 17", "SSR", "Tailwind", "Strapi", "GSAP"]}
                        year={2025}
                        caseStudyUrl="/projects/terraform"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                        <ComponentsCardProject
                            tags={["Featured", "E-Commerce"]}
                            tagline="Where homes feel alive"
                            title="Solene Sofa, Arctic Cloud, Mira."
                            description="A warm, editorial commerce experience for a furniture brand."
                            images={["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"]}
                            techStack={["Angular 17", "SSR", "Tailwind", "Strapi", "GSAP"]}
                            year={2025}
                            caseStudyUrl="/projects/terraform"
                        />
                    </div>
                    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                        <ComponentsCardProject
                            tags={["Featured", "E-Commerce"]}
                            tagline="Where homes feel alive"
                            title="Solene Sofa, Arctic Cloud, Mira."
                            description="A warm, editorial commerce experience for a furniture brand."
                            images={["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"]}
                            techStack={["Angular 17", "SSR", "Tailwind", "Strapi", "GSAP"]}
                            year={2025}
                            caseStudyUrl="/projects/terraform"
                        />
                    </div>
                </div>
                <ComponentsLine />
            </div>

            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto">
                <div className="flex justify-end items-end py-10 px-20">
                    <ComponentsButton title="View All Projects" onClick={() => { }} />
                </div>
            </div>
            <ComponentsLine />
        </div>
    )
}   