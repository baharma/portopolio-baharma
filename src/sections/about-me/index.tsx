import { apiAboutMe } from "@/src/service/api/server";
import SectionsTimeLine from "./timeline";

export default async function SectionsAboutMe() {
    const apidata = await apiAboutMe();
    const data = apidata?.data?.workflows?.[0]?.value?.about?.schoold
    console.log("data about me", apidata);

    return (
        <>
            <SectionsTimeLine data={data} />
        </>
    );
}