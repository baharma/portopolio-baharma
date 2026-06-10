import { GrSubtract } from "react-icons/gr";

const contacts = [
    { label: "EMAIL", value: "bagusaditya1899@gmail.com", href: "mailto:bagusaditya1899@gmail.com" },
    { label: "LINKEDIN", value: "Ngurah Aditya", href: "https://www.linkedin.com/in/ngurah-aditya-7404771b5/" },
    { label: "GITHUB", value: "@adityadharma", href: "https://github.com/adityadharma" },
    { label: "LOCATED", value: "Bali, ID · Available remote", href: null },
];

export default function SectionsHomeEmailShow() {
    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto py-20 px-10">

                {/* label */}
                <div className="flex items-center gap-4 mb-10">
                    <GrSubtract className="text-gray-500 w-6 h-6" />
                    <span className="text-8d font-mono text-gray-500">04 — Contact</span>
                </div>

                {/* big heading */}
                <div className="font-instrument-serif text-80d leading-none flex flex-col">
                    <span className="text-gray-900">{"Let's build"}</span>
                    <span className="text-gray-900">
                        {"something "}
                        <span className="italic text-primary">good.</span>
                    </span>
                    <a
                        href="mailto:bagusaditya1899@gmail.com"
                        className="text-gray-900 hover:text-primary transition-colors duration-300 cursor-pointer break-all"
                    >
                        bagusaditya1899@gmail.com
                    </a>
                </div>

                {/* primary divider */}
                <div className="w-full h-px bg-primary mt-10 mb-10" />

                {/* contact columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {contacts.map(({ label, value, href }) => (
                        <div key={label} className="flex flex-col gap-2">
                            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                                {label}
                            </span>
                            {href ? (
                                <a
                                    href={href}
                                    className="text-sm text-gray-700 hover:text-primary transition-colors duration-200 cursor-pointer"
                                >
                                    {value}
                                </a>
                            ) : (
                                <span className="text-sm text-gray-700">{value}</span>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
