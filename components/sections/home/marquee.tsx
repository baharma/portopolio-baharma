import { getHome } from "@/lib/cms";

function Group({ words, hidden }: { words: string[]; hidden?: boolean }) {
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

export default async function Marquee() {
    const { marquee: words } = await getHome();
    if (words.length === 0) return null;
    return (
        <div className="marquee" aria-label="Technologies I work with">
            <div className="marquee-track">
                <Group words={words} />
                <Group words={words} hidden />
            </div>
        </div>
    );
}
