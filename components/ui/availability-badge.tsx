export default function AvailabilityBadge({ text }: { text: string }) {
    return (
        <span className="badge">
            <span className="dot-live" aria-hidden="true" />
            {text}
        </span>
    );
}
