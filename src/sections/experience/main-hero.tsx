import ComponentsLiveIndicator from "@/src/component/live-indicator";
import BlogContent from "@/src/component/render-blog";

export default function SectionExperienceMainHero({ description }: { description: string }) {
    return (
        <div className="bg-secondary border-b border-gray-200">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 flex justify-center items-center  flex-col w-full gap-6">
                <div className="flex items-center gap-3 show-text-on-top">
                    <span className="font-mono text-8d text-gray-500 border border-gray-200 rounded-full px-3 py-1">
                        Curriculum Vitae
                    </span>
                    <span className="font-mono text-8d text-gray-500 border border-gray-200 rounded-full px-3 py-1">
                        Work History
                    </span>
                </div>

                {/* Judul + deskripsi dalam satu kolom */}
                <div className="flex items-center flex-col gap-4">
                    <h1 className="text-80d leading-none font-instrument-serif show-text-on-top flex gap-20">
                        <span className="block">Work</span>
                        <span className="inline-flex items-end gap-1 text-primary italic">
                            history
                            <ComponentsLiveIndicator className="size-[calc(8/var(--bw)*100vw)] mb-[calc(4/var(--bw)*100vw)]" />
                        </span>
                    </h1>
                    {/* Deskripsi dengan left border accent */}
                    <div className="flex  gap-3 show-text-on-left ">


                        <BlogContent className="font-instrument-serif italic text-16d text-gray-500 leading-relaxed" content={description} />
                    </div>
                </div>

            </div>
        </div>
    )
}