interface BlogContentProps {
    content: string;
    className?: string; // prop className opsional
}

export default function BlogContent({
    content,
    className = "",
}: BlogContentProps) {
    return (
        <div
            className={`text-[18px] lg:text-[22px] ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}