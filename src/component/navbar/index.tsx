"use client"

import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import ComponentsButtonUnderline from "../button-underline";
import ComponentsLiveIndicator from "../live-indicator";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ComponentsNavbar() {
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 740) {
                setButtonActive(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="bg-secondary border-b border-gray-200">
            <div className=" md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto p-6 flex items-center justify-between w-full ">
                <div className="flex gap-3 items-center">
                    <div className="flex items-center justify-center">
                        <ComponentsLiveIndicator />
                        <Link className="ml-2 text-14d  font-instrument-serif " href={`/`}>
                            BAHARMA.MY.ID
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex gap-10 ">
                    <ComponentsButtonUnderline title="experience" url="/experience" />
                    <ComponentsButtonUnderline title="About" url="/project" />
                    <ComponentsButtonUnderline title="Projects" />
                    <ComponentsButtonUnderline title="Contacts" />
                </div>
                <div className="hidden md:flex items-center gap-3 ">
                    <button className="px-4 py-2 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors font-sans text-10d">
                        Download CV
                    </button>
                </div>
                <div className=" md:hidden flex items-center gap-3 ">
                    <button className="px-4 py-2  cursor-pointer  rounded-2xl" onClick={() => setButtonActive(!buttonActive)}>
                        {
                            buttonActive ? (
                                <SlArrowUp className="text-2xl" />
                            ) : (
                                <SlArrowDown className="text-2xl" />
                            )
                        }
                    </button>
                </div>
            </div>
            {buttonActive && (
                <div className="md:hidden relative top-full left-0 w-full bg-secondary border-b border-gray-200 shadow-lg flex flex-col p-6 gap-6">
                    <div className="flex flex-col gap-4">
                        <ComponentsButtonUnderline title="Work History" />
                        <ComponentsButtonUnderline title="About" />
                        <ComponentsButtonUnderline title="Projects" />
                        <ComponentsButtonUnderline title="Contacts" />
                    </div>
                    <button className="w-full py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors font-sans text-center mt-2">
                        Download CV
                    </button>
                </div>
            )}
        </div>
    );
}