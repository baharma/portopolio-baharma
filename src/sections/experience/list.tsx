import GradientImage from "@/src/component/gradient-image";
import BlogContent from "@/src/component/render-blog";

export default function SectionsExperienceList({ data }: { data: any[] }) {
    const experiences = data?.filter((item) => item?.position?.value) ?? [];

    return (
        <div className="bg-secondary border-b border-gray-200">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 flex-col w-full gap-6">
                {experiences.length > 0 ? (
                    experiences.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col md:flex-row justify-between gap-[10vw] p-20"
                        >
                            <div className="flex flex-col col-end-2 gap-2 w-150">
                                <div className="font-sans text-10d text-gray-500">
                                    {item.time_line?.value}
                                </div>
                                <div className="font-sans text-8d text-white bg-primary py-2 px-3 rounded-2xl text-center">
                                    {item.end_date?.value ? "Completed" : "Current"}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="bg-white rounded-2xl w-full border-primary px-10 py-5 flex flex-col gap-5">
                                    {item.image?.value?.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {item.image.value.map((src: string, i: number) => (
                                                <div
                                                    key={i}
                                                    className="aspect-2/2 relative rounded-lg overflow-hidden bg-quinary"
                                                >
                                                    <GradientImage
                                                        src={src}
                                                        alt={item.position?.value || ""}
                                                        unoptimized
                                                        enableLightbox
                                                        lightboxSize="large"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex flex-col text-8d">
                                        <span className="font-instrument-serif text-21d">
                                            {item.position?.value}
                                        </span>
                                        <span className="font-mono">
                                            {item.detail?.value}
                                        </span>
                                    </div>
                                    <div>
                                        <BlogContent
                                            className="text-10d"
                                            content={item.description?.value || ""}
                                        />
                                    </div>
                                    {item.stack_tech?.value?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {item.stack_tech.value.map((tech: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}