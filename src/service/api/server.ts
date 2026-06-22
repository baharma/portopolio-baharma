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
        return data
    },
    ['home-page'],
    { revalidate: 3600 }
)

export const productApi = unstable_cache(
    async ({ countLimit, id }: {
        countLimit: number;
        id: string | number;
    }) => {
        const { data } = await http().get(`product?website_id=${id}&limit=${countLimit}&sort=newest`);

        return data;
    },
    ['product-api'],
    {
        revalidate: 3600, // (Opsional) Waktu cache dalam detik, misalnya 1 jam
        tags: ['products'] // (Opsional) Tag untuk on-demand revalidation
    }
);