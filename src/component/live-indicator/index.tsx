export default function ComponentsLiveIndicator() {
    return (
        <span className="relative flex h-4 w-4">
            {/* Lingkaran luar yang beranimasi (membesar dan memudar) */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>

            {/* Lingkaran dalam yang statis (solid) */}
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
        </span>
    );
}