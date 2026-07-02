"use server"

import { http } from "./http"

export type ContactFormState = {
    status: "idle" | "success" | "error"
    message: string
}

export async function sendContactMessage(
    _prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const email = formData.get("email")?.toString().trim() ?? ""
    const title = formData.get("title")?.toString().trim() ?? ""
    const description = formData.get("description")?.toString().trim() ?? ""

    if (!email || !title || !description) {
        return { status: "error", message: "Please fill in every field before sending." }
    }

    try {
        // user_id 3 = this portfolio's website id, same value used by productApi calls elsewhere.
        await http().post("/email", { email, title, description, user_id: 3 })
        return {
            status: "success",
            message: "Thanks — your message has been sent. I'll get back to you soon.",
        }
    } catch {
        return {
            status: "error",
            message: "Something went wrong sending your message. Please try again.",
        }
    }
}
