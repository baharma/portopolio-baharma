import ComponentsLiveIndicator from "@/src/component/live-indicator";
import { GrSubtract } from "react-icons/gr";

export default function SectionsHomeMainHero() {
    return (
        <div className="bg-secondary">
            <div className="max-w-10xl mx-auto p-6">
                <div className="flex items-center gap-4">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-sm font-mono text-gray-500">
                        Portofolio - 2026 - Baharma.MY.ID
                    </span>
                </div>
                <div className="flex">
                    <div className="grow">
                        <h1 className="text-51d leading-none font-instrument-serif mt-4">
                            <span className="inline-flex items-end gap-1">
                                Aditya
                                <ComponentsLiveIndicator className="size-[calc(8/var(--bw)*100vw)] mb-[calc(4/var(--bw)*100vw)]" />
                            </span>
                            <br />Dharma
                        </h1>
                        <p className="text-8d mt-4 text-gray-500">
                            I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building responsive web applications.
                        </p>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </div >
    )
}