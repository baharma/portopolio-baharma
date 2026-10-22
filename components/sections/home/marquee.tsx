const words = ["Laravel", "Docker", "Next.js", "React.js", "PHP", "TypeScript", "Livewire", "Angular", "Golang", "Freelance", "Design"];

function Group({ hidden }: { hidden?: boolean }) {
    return (
        <ul className="marquee-group" aria-hidden={hidden || undefined}>
            {words.map((w, i) => (
                <li key={w} style={{ display: "contents" }}>
                    <span className={`marquee-word${i % 2 ? " outline" : ""}`}>{w}</span>
                    <span className="marquee-star" aria-hidden="true">✦</span>
                </li>
            ))}
        </ul>
    );
}

export default function Marquee() {
    return (
        <div className="marquee" aria-label="Technologies I work with">
            <div className="marquee-track">
                <Group />
                <Group hidden />
            </div>
        </div>
    );
}
