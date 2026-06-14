import SectionsHomeBlogs from "./blog";
import SectionsHomeCardProject from "./card-project";
import SectionsHomeEmailShow from "./email-show";
import SectionsHomeMainHero from "./main-hero";
import SectionsHomeShortTimeline from "./short-timeline";
import SectionsHomeTextMove from "./text-move";
import SectionsHomeToolkit from "./toolkit";

export default function PagesHome() {

    return (
        <>
            <SectionsHomeMainHero />
            <SectionsHomeTextMove />
            <SectionsHomeCardProject />
            <SectionsHomeShortTimeline />
            <SectionsHomeToolkit />
            <SectionsHomeBlogs />
            <SectionsHomeEmailShow />
        </>
    )
}