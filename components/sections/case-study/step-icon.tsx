const icons = [
    // capture: mic
    <path key="a" d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3" />,
    // transcribe: lines
    <path key="b" d="M4 6h16M4 11h16M4 16h10M4 21h6" />,
    // keep: shield
    <path key="c" d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3ZM9 12l2.2 2.2L15 10" />,
];

export default function StepIcon({ index }: { index: number }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            {icons[index % icons.length]}
        </svg>
    );
}
