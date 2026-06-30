import SectionExperience from "@/src/sections/experience";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <>
            <SectionExperience slug={slug} />
        </>
    )
}