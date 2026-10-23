import { revalidateTag } from "next/cache"
import { CMS_TAGS } from "@/lib/cms"
import { NextResponse, type NextRequest } from "next/server"

// Tags attached to the CMS fetches in lib/cms.ts (one per CMS page).
const KNOWN_TAGS = CMS_TAGS

// Manual cache-busting endpoint: call this after editing content in the CMS
// so the change shows up immediately instead of waiting out the 1h revalidate
// window. Protected by REVALIDATE_SECRET since it's unauthenticated otherwise.
// Usage: /api/revalidate?secret=...           -> revalidates every known tag
//        /api/revalidate?secret=...&tag=home  -> revalidates just that tag
function revalidate(secret: string | null, tag: string | null) {
    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret." }, { status: 401 })
    }

    if (tag && !(KNOWN_TAGS as readonly string[]).includes(tag)) {
        return NextResponse.json({ error: `Unknown tag. Expected one of: ${KNOWN_TAGS.join(", ")}` }, { status: 400 })
    }

    const tagsToRevalidate = tag ? [tag] : KNOWN_TAGS
    // "max" fully purges the tag immediately (Next.js 16 requires this second
    // argument; omitting it is deprecated in favor of updateTag/explicit profile).
    tagsToRevalidate.forEach((t) => revalidateTag(t, "max"))

    return NextResponse.json({ revalidated: tagsToRevalidate, now: Date.now() })
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    return revalidate(searchParams.get("secret"), searchParams.get("tag"))
}

// Webhook entry point for the CMS: POST after content is saved. Secret goes in
// the `x-revalidate-secret` header (or ?secret=); optional JSON body `{ "tag": "home" }`
// or ?tag=home limits it to one page, otherwise every page is revalidated.
export async function POST(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const body = await request.json().catch(() => null)
    const secret = request.headers.get("x-revalidate-secret") ?? searchParams.get("secret")
    const tag = body?.tag?.toString() || searchParams.get("tag")
    return revalidate(secret, tag)
}
