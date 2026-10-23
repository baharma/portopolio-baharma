import { getContact } from "@/lib/cms";

export default async function AvailabilityBadge() {
    const { availability } = await getContact();
    return (
        <span className="badge">
            <span className="dot-live" aria-hidden="true" />
            {availability}
        </span>
    );
}
