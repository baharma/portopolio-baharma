
import GradientImage from "@/src/component/gradient-image";
import ComponentsLiveIndicator from "@/src/component/live-indicator";
import { value } from "@/src/service/type/value";
import { GrSubtract } from "react-icons/gr";

type Props = {
    data: any
}

export default function SectionsHomeMainHero({ data: _data }: Props) {
    const imageProfile = _data?.image_profile
    const description = _data?.description
    const dateNow = new Date()
    const dataCurrently = _data?.currently


    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 mt-10 md:mt-40">
                <div className="flex items-center gap-4  show-text-on-top">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-8d font-mono text-gray-500">
                        Portofolio - {dateNow.getFullYear()} - Baharma.MY.ID
                    </span>
                </div>
                <div className="flex">
                    <div className="grow">
                        <h1 className="text-80d leading-none font-instrument-serif mt-4 ">
                            <span className="block show-text-on-top">Aditya</span>
                            <span className="inline-flex items-end gap-1 show-text-on-top">
                                Dharma
                                <ComponentsLiveIndicator className="size-[calc(8/var(--bw)*100vw)] mb-[calc(4/var(--bw)*100vw)]" />
                            </span>

                        </h1>
                        <p className="text-8d mt-4 text-gray-500 show-text-on-top">
                            {description.value}
                        </p>
                        <div className="w-full h-px bg-gray-300 show-text-on-top" />
                        <div className="mt-10  py-3 w-full lg:w-500 grid md:grid-cols-2 lg:grid-cols-4 justify-between gap-6 md:gap-0">
                            {
                                dataCurrently.map((data: value, index: number) => (
                                    <div className="flex flex-col gap-2 show-text-on-top" key={index}>
                                        <span className="text-8d text-gray-500 font-mono">{data.label}</span>
                                        <span className="text-10d font-bold font-sans">{data.value}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-10">
                        <div className="w-200 h-200 relative top-0 left-0 rounded-2xl overflow-hidden mt-20 show-text-on-top" >
                            <GradientImage src={imageProfile?.value} unoptimized />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}