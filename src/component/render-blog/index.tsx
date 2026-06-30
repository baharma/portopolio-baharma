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
            // `blog-content` is a stable hook for the Quill list styles in globals.css.
            // Quill renders ordered/bullet markers into an empty `.ql-ui` span via CSS
            // counters, so without these styles the 1. 2. 3. markers vanish on the site.
            className={`blog-content ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}