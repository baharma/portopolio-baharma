export default function ComponentsButtonUnderline({ title }: { title: string }) {
    return (
        <div className="group relative w-fit cursor-pointer pb-1 font-instrument-serif  hover:-translate-y-2 transition-transform text-d" >
            {title}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
        </div>
    );
}