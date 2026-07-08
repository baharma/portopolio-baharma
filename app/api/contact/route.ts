import { NextResponse, type NextRequest } from "next/server"
import { http } from "@/src/service/api/http"

// Same-origin proxy for the contact form: the browser POSTs plain JSON here
// (no auth), and the server attaches the Authorization: Bearer API_SECRET_KEY
// header (via http()) before forwarding to the email API. Keeps the secret
// key and user_id off the client.
export async function POST(request: NextRequest) {
    const body = await request.json().catch(() => null)
    const email = body?.email?.toString().trim()
    const title = body?.title?.toString().trim()
    const description = body?.description?.toString().trim()

    if (!email || !title || !description) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    try {
        // user_id 3 = this portfolio's website id, same value used by productApi calls elsewhere.
        const { data } = await http().post("/email", { email, title, description, user_id: 3 })
        return NextResponse.json(data, { status: 201 })
    } catch {
        return NextResponse.json({ error: "Failed to send message." }, { status: 502 })
    }
}
