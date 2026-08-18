import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

// All tags currently attached to unstable_cache() calls in src/service/api/server.ts.
const KNOWN_TAGS = ["main", "home", "experience", "about-me", "products"] as const

// Manual cache-busting endpoint: call this after editing content in the CMS
// so the change shows up immediately instead of waiting out the 1h revalidate
// window. Protected by REVALIDATE_SECRET since it's unauthenticated otherwise.
// Usage: /api/revalidate?secret=...           -> revalidates every known tag
//        /api/revalidate?secret=...&tag=home  -> revalidates just that tag
export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret")
    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ error: "Invalid secret." }, { status: 401 })
    }

    const tag = request.nextUrl.searchParams.get("tag")
    if (tag && !KNOWN_TAGS.includes(tag as (typeof KNOWN_TAGS)[number])) {
        return NextResponse.json({ error: `Unknown tag. Expected one of: ${KNOWN_TAGS.join(", ")}` }, { status: 400 })
    }

    const tagsToRevalidate = tag ? [tag] : KNOWN_TAGS
    // "max" fully purges the tag immediately (Next.js 16 requires this second
    // argument; omitting it is deprecated in favor of updateTag/explicit profile).
    tagsToRevalidate.forEach((t) => revalidateTag(t, "max"))

    return NextResponse.json({ revalidated: tagsToRevalidate, now: Date.now() })
}
