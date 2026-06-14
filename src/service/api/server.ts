import { unstable_cache } from "next/cache"
import { http } from "./http"

export const apiMain = unstable_cache(
    async () => {
        const { data } = await http().get('/website/slug/portopolio-baharma')
        return data
    },
    ['portopolio-baharma'],
    { revalidate: 3600 }
)

export const homePage = unstable_cache(
    async () => {
        const { data } = await http().get('website/slug/portopolio-baharma/page/home-page')
        return
    },
    ['home-page'],
    { revalidate: 3600 }
)