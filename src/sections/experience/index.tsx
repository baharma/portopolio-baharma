import { apiExperience, productApi } from "@/src/service/api/server";
import SectionsExperienceList from "./list";
import SectionExperienceMainHero from "./main-hero";

export default async function SectionExperience({ slug }: { slug: string }) {
    let valueData;
    let productData;

    if (slug === 'project') {
        productData = await productApi({ countLimit: 10, id: 3 });
    } else {
        const data = await apiExperience();
        valueData = data?.data?.workflows?.[0]?.value?.experience;
    }

    return (
        <>
            <SectionExperienceMainHero description={valueData?.description?.value ?? productData} slug={slug} />
            <SectionsExperienceList data={valueData?.history ?? productData?.data} slug={slug} />
        </>
    )
}