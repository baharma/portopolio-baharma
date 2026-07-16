'use client'
import ComponentsButton from "@/src/component/button";
import ComponentsLine from "@/src/component/line";
import BlogContent from "@/src/component/render-blog";
import { useRouter } from "next/navigation";
import { GrSubtract } from "react-icons/gr";

export default function SectionsHomeShortTimeline(data: any) {
    const router = useRouter();

    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 mt-10 md:mt-40">
                <div className="flex items-center gap-4 show-text-on-right">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-8d font-mono text-gray-500">
                        Experience - Timeline
                    </span>
                </div>
                <div className="flex gap-4 items-center  font-instrument-serif italic text-31d pt-20">
                    <span className="show-text-on-top">A Short</span> <span className="show-text-on-top text-primary">Timeline</span>
                </div>
                {data?.data.map((datas: any, index: number) => (
                    <div className="flex flex-col gap-9 show-text-on-right" key={index}>
                        <ComponentsLine />
                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_120px] gap-10 mt-10 items-start px-10">
                            {/* Kolom kiri: tanggal (lebar tetap) */}
                            <div className="font-sans text-10d text-gray-500">
                                {datas?.timeline?.value}
                            </div>

                            {/* Kolom tengah: konten */}
                            <div className="min-w-0">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold">
                                        <span className="text-primary font-instrument-serif text-24d">
                                            {datas?.name_position?.value}
                                        </span>{" "}
                                        <span className="text-gray-500 font-mono text-18d">
                                            — {datas?.company?.value}
                                        </span>
                                    </span>
                                    <span className="text-gray-500">
                                        <BlogContent content={datas?.description?.value} />
                                    </span>
                                </div>
                            </div>

                            {/* Kolom kanan: badge (lebar tetap) */}
                            <div className="flex md:justify-end gap-1">
                                {
                                    datas?.tech_stack?.value.map((stack: any, index: number) => (
                                        <span key={index} className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary whitespace-nowrap">
                                            {stack}
                                        </span>
                                    ))
                                }

                            </div>
                        </div>
                        <ComponentsLine />
                    </div>
                ))}
            </div>
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto">
                <div className="flex justify-end items-end py-10 px-20">
                    <ComponentsButton title="View All Projects" onClick={() => {
                        router.push("/experience")
                    }} />
                </div>
            </div>
        </div>
    )
}