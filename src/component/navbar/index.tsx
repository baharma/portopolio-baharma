import ComponentsButtonUnderline from "../button-underline";
import ComponentsLiveIndicator from "../live-indicator";

export default function ComponentsNavbar() {
    return (
        <div className="bg-secondary border-b border-gray-200">
            <div className="max-w-7xl mx-auto p-4 flex items-center justify-between w-full ">
                <div className="flex gap-3 ">
                    <div className="flex items-center">
                        <ComponentsLiveIndicator />
                        <div className="ml-2 text-xl  font-instrument-serif ">
                            BAHARMA.MY.ID
                        </div>
                    </div>
                </div>
                <div className="flex gap-10">
                    <ComponentsButtonUnderline title="Work History" />
                    <ComponentsButtonUnderline title="About" />
                    <ComponentsButtonUnderline title="Projects" />
                    <ComponentsButtonUnderline title="Contacts" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors">
                        Download CV
                    </button>
                </div>
            </div>
        </div>
    );
}