"use client";

import ComponentsButton from "@/src/component/button";
import ComponentsCardProject from "@/src/component/card-project";
import ComponentsLine from "@/src/component/line";
import { productApi } from "@/src/service/api/server";
import { useEffect, useState } from "react";

export default function SectionsHomeCardProject({ dataProduct }: any) {

    console.log(dataProduct)
    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto">
                <div className="flex gap-4 items-center  font-instrument-serif italic text-31d pt-20">
                    <span className="show-text-on-left">Project,</span> <span className=" text-primary show-text-on-right">recent</span>
                </div>
                <p className=" text-gray-500 font-sans text-8d mb-20 w-full md:w-400 show-text-on-top">
                    to many projects, to many works, to many experiences, to many stories, to many things that i want to share, but i don't have time to write it all here. so if you want to see my project, you can visit my github or linkedin. or you can contact me and i will share it with you. thank you for visiting my portfolio.
                </p>

                <div className="border border-gray-200 rounded-2xl p-6 bg-white show-text-on-top">

                    <ComponentsCardProject
                        // tags={["Featured", "E-Commerce"]}
                        tagline={dataProduct?.[0].description?.value?.description?.type_project}
                        title={dataProduct?.[0].description?.value?.description?.name_project}
                        description={dataProduct?.[0].description?.value?.description?.description_short}
                        images={dataProduct?.[0].description?.value?.description?.image_list}
                        techStack={dataProduct?.description?.value?.description?.list_stack}
                        year={2025}
                        caseStudyUrl="/projects/terraform"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {
                        dataProduct.slice(1).map((data: any, index: number) => (
                            <div className="border border-gray-200 rounded-2xl p-6 bg-white show-text-on-left" key={index}>
                                <ComponentsCardProject
                                    tags={data?.category?.nama}
                                    tagline={data?.description?.value?.description?.type_project}
                                    title={data?.description?.value?.description?.name_project}
                                    description={data?.description?.value?.description?.description_short}
                                    images={data?.description?.value?.description?.image_list}
                                    techStack={data?.description?.value?.description?.list_stack}
                                    year={2025}
                                    caseStudyUrl="/projects/terraform"
                                />
                            </div>
                        ))
                    }
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