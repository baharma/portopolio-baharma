export default function TagPills({ tags }: { tags: string[] }) {
    return (
        <ul className="pills">
            {tags.map((t) => (
                <li key={t} className="pill">
                    {t}
                </li>
            ))}
        </ul>
    );
}
