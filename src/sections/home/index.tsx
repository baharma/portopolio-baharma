import SectionsHomeCardProject from "./card-project";
import SectionsHomeMainHero from "./main-hero";
import SectionsHomeTextMove from "./text-move";

export default function PagesHome() {
    return (
        <>
            <SectionsHomeMainHero />
            <SectionsHomeTextMove />
            <SectionsHomeCardProject />

        </>
    )
}