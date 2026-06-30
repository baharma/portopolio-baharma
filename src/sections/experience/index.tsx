import { apiExperience } from "@/src/service/api/server";
import SectionsExperienceList from "./list";
import SectionExperienceMainHero from "./main-hero";

export default async function SectionExperience({ slug }: { slug: string }) {
    const data = await apiExperience()
    const valueData = data?.data?.workflows?.[0].value.experience

    return (
        <>
            <SectionExperienceMainHero description={valueData?.description?.value} slug={slug} />
            <SectionsExperienceList data={valueData?.history} slug={slug} />
        </>
    )
}