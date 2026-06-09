import GradientImage from "@/src/component/gradient-image";
import ComponentsLiveIndicator from "@/src/component/live-indicator";
import { GrSubtract } from "react-icons/gr";

export default function SectionsHomeMainHero() {
    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 mt-10 md:mt-40">
                <div className="flex items-center gap-4">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-8d font-mono text-gray-500">
                        Portofolio - 2026 - Baharma.MY.ID
                    </span>
                </div>
                <div className="flex">
                    <div className="grow">
                        <h1 className="text-80d leading-none font-instrument-serif mt-4">
                            Aditya <br />
                            <span className="inline-flex items-end gap-1">
                                Dharma
                                <ComponentsLiveIndicator className="size-[calc(8/var(--bw)*100vw)] mb-[calc(4/var(--bw)*100vw)]" />
                            </span>

                        </h1>
                        <p className="text-8d mt-4 text-gray-500 ">
                            I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building responsive web applications.
                        </p>
                        <div className="w-full h-px bg-gray-300" />
                        <div className="mt-10  py-3 w-full lg:w-500 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
                            <div className="flex flex-col gap-2">
                                <span className="text-8d text-gray-500 font-mono">Currently</span>
                                <span className="text-10d font-bold font-sans">Front-End Dev @ Taksu Tech</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-8d text-gray-500 font-mono">Based in</span>
                                <span className="text-10d font-bold font-sans">Bali, Indonesia · GMT+8</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-8d text-gray-500 font-mono">Focus</span>
                                <span className="text-10d font-bold font-sans">Fullstack Development</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-8d text-gray-500 font-mono">Open to</span>
                                <span className="text-10d font-bold font-sans">Freelance & full-time</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-10">
                        <div className="w-200 h-200 relative top-0 left-0 rounded-2xl overflow-hidden mt-20" >
                            <GradientImage src="https://picsum.photos/400/600" unoptimized />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}