import ComponentsLine from "@/src/component/line";
import { GrSubtract } from "react-icons/gr";

export default function SectionsHomeShortTimeline() {
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
                <div className="flex flex-col gap-9 show-text-on-right">
                    <ComponentsLine />
                    <div className="flex md:flex-row flex-col gap-30 mt-10 justify-between items-center px-10 ">
                        <div className="flex-none font-sans text-10d text-gray-500">
                            Jun 2025 — Present
                        </div>
                        <div className="grow">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold "><span className="text-primary font-instrument-serif text-24d">Front-End Developer</span> <span className="text-gray-500 font-mono text-18d">— Taksu Tech</span></span>
                                <span className="text-gray-500 w-600">Building key modules of Fei Yue, a complex education & therapy platform. Responsible for responsive, scalable, UX-aligned interfaces and cross-team collaboration on maintainable solutions.</span>

                            </div>
                        </div>
                        <div className="flex-none">
                            <div className="flex flex-col md:flex-row gap-4 mt-4 items-start">
                                <span
                                    className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary"
                                >
                                    Angular 17
                                </span>
                            </div>
                        </div>
                    </div>
                    <ComponentsLine />
                </div>
                <div className="flex flex-col gap-9 show-text-on-right">
                    <ComponentsLine />
                    <div className="flex md:flex-row flex-col gap-30 mt-10 justify-between items-center px-10 ">
                        <div className="flex-none font-sans text-10d text-gray-500">
                            Jun 2025 — Present
                        </div>
                        <div className="grow">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold "><span className="text-primary font-instrument-serif text-24d">Front-End Developer</span> <span className="text-gray-500 font-mono text-18d">— Taksu Tech</span></span>
                                <span className="text-gray-500 w-600">Building key modules of Fei Yue, a complex education & therapy platform. Responsible for responsive, scalable, UX-aligned interfaces and cross-team collaboration on maintainable solutions.</span>

                            </div>
                        </div>
                        <div className="flex-none">
                            <div className="flex flex-col md:flex-row gap-4 mt-4 items-start">
                                <span
                                    className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary"
                                >
                                    Angular 17
                                </span>
                            </div>
                        </div>
                    </div>
                    <ComponentsLine />
                </div>
                <div className="flex flex-col gap-9 show-text-on-right">
                    <ComponentsLine />
                    <div className="flex md:flex-row flex-col gap-30 mt-10 justify-between items-center px-10 ">
                        <div className="flex-none font-sans text-10d text-gray-500">
                            Jun 2025 — Present
                        </div>
                        <div className="grow">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold "><span className="text-primary font-instrument-serif text-24d">Front-End Developer</span> <span className="text-gray-500 font-mono text-18d">— Taksu Tech</span></span>
                                <span className="text-gray-500 w-600">Building key modules of Fei Yue, a complex education & therapy platform. Responsible for responsive, scalable, UX-aligned interfaces and cross-team collaboration on maintainable solutions.</span>

                            </div>
                        </div>
                        <div className="flex-none">
                            <div className="flex flex-col md:flex-row gap-4 mt-4 items-start">
                                <span
                                    className="px-3 py-1 border border-gray-300 rounded-full text-8d font-mono text-gray-600 bg-secondary"
                                >
                                    Angular 17
                                </span>
                            </div>
                        </div>
                    </div>
                    <ComponentsLine />
                </div>

            </div>
        </div>
    )
}