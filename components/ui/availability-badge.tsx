import { site } from "@/content/site";

export default function AvailabilityBadge() {
    return (
        <span className="badge">
            <span className="dot-live" aria-hidden="true" />
            {site.availability}
        </span>
    );
}
