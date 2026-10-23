import axios from "axios"

export const http = (endPoint?: string) => {
    const instance = axios.create({
        baseURL: process.env.CMS_API_URL ?? "https://api.baharma.my.id/api",
        headers: { "Content-Type": "application/json" }
    })
    if (process.env.API_SECRET) {
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${process.env.API_SECRET}`
            return config
        })
    }
    return instance
}


