import ComponentsLine from "@/src/component/line";
import GradientImage from "@/src/component/gradient-image";
import { GrSubtract } from "react-icons/gr";
import { HiArrowRight } from "react-icons/hi";

type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tag: string;
    image: string;
};

const posts: BlogPost[] = [
    {
        slug: "typescript-strict-mode",
        title: "Why I always enable strict mode in TypeScript",
        excerpt: "Strict mode catches an entire class of bugs at compile time that would otherwise slip into production. Here's how I set it up and what it saved me from.",
        date: "May 12, 2025",
        readTime: "4 min read",
        tag: "TypeScript",
        image: "/img/toolkit-1.jpg",
    },
    {
        slug: "golang-concurrency-patterns",
        title: "Golang concurrency patterns I actually use",
        excerpt: "Goroutines and channels are powerful, but the patterns that matter day-to-day are just a handful. I break down the three I reach for most.",
        date: "Apr 3, 2025",
        readTime: "6 min read",
        tag: "Golang",
        image: "/img/toolkit-2.jpg",
    },
    {
        slug: "react-server-components",
        title: "React Server Components changed how I think about data fetching",
        excerpt: "After six months of using RSC in production, the mental model shift is real. No more waterfall fetches, no more useEffect spaghetti.",
        date: "Mar 18, 2025",
        readTime: "5 min read",
        tag: "React",
        image: "/img/toolkit-3.jpg",
    },
    {
        slug: "docker-compose-dev",
        title: "My Docker Compose setup for local development",
        excerpt: "A single compose file that spins up a Postgres database, Redis cache, and the app itself — with hot reload and zero port conflicts.",
        date: "Feb 27, 2025",
        readTime: "3 min read",
        tag: "Docker",
        image: "/img/toolkit-1.jpg",
    },
];

export default function SectionsHomeBlogs() {
    return (
        <div className="bg-secondary">
            <div className="md:max-w-6xl lg:max-w-8xl xl:max-w-10xl mx-auto py-20 px-10">
                {/* header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <GrSubtract className="text-gray-500 w-6 h-6" />
                            <span className="text-8d font-mono text-gray-500">Writing</span>
                        </div>
                        <div className="flex gap-4 items-center font-instrument-serif italic text-31d">
                            <span>Thoughts I</span>
                            <span className="text-primary">wrote down.</span>
                        </div>
                    </div>

                    <a
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-colors duration-200 group cursor-pointer"
                    >
                        All posts
                        <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </a>
                </div>

                {/* list */}
                <div className="mt-12">
                    {posts.map((post) => (
                        <div key={post.slug}>
                            <ComponentsLine />
                            <a
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col md:flex-row md:items-center gap-6 py-7 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                            >
                                {/* thumbnail */}
                                <div className="relative w-full md:w-48 h-32 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                    <GradientImage
                                        src={post.image}
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>

                                {/* content */}
                                <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div className="flex-1 max-w-xl space-y-2">
                                        <span className="inline-block text-xs font-mono text-primary/70 bg-primary/8 px-2 py-0.5 rounded-full">
                                            {post.tag}
                                        </span>
                                        <p className="font-semibold text-gray-800 leading-snug group-hover:text-primary transition-colors duration-200">
                                            {post.title}
                                        </p>
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex md:flex-col md:items-end gap-3 md:gap-1 shrink-0">
                                        <span className="text-xs font-mono text-gray-400">{post.date}</span>
                                        <span className="text-xs font-mono text-gray-400">{post.readTime}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                    <ComponentsLine />
                </div>

                {/* mobile all posts link */}
                <a
                    href="/blog"
                    className="md:hidden flex items-center gap-2 mt-8 text-sm font-mono text-gray-400 hover:text-primary transition-colors duration-200 group cursor-pointer"
                >
                    All posts
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
            </div>
            <ComponentsLine />
        </div>
    );
}
