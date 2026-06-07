export default function ComponentsLiveIndicator(
    { className = "h-4 w-4" }: { className?: string }) {
    return (
        <span className={`relative flex  ${className}`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
        </span>
    );
}