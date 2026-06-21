
import { homePage, productApi } from "@/src/service/api/server";
import SectionsHomeBlogs from "./blog";
import SectionsHomeCardProject from "./card-project";
import SectionsHomeEmailShow from "./email-show";
import SectionsHomeMainHero from "./main-hero";
import SectionsHomeShortTimeline from "./short-timeline";
import SectionsHomeTextMove from "./text-move";
import SectionsHomeToolkit from "./toolkit";


export default async function PagesHome() {
    const data = await homePage()
    const productData = await productApi({ countLimit: 3, id: 3 })
    const heroValues = data?.data?.workflows?.[0].value?.home_page

    return (
        <>
            <SectionsHomeMainHero data={heroValues?.hero_main} />
            <SectionsHomeTextMove data={heroValues.list} />
            <SectionsHomeCardProject dataProduct={productData.data} />
            <SectionsHomeShortTimeline />
            <SectionsHomeToolkit />
            <SectionsHomeBlogs />
            <SectionsHomeEmailShow />
        </>
    )
}