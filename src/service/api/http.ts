import axios from "axios"

export const http = (endPoint?: string) => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { "Content-Type": "application/json" }
    })
    if (process.env.API_SECRET_KEY) {
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${process.env.API_SECRET_KEY}`
            return config
        })
    }
    return instance
}


