"use client"

import { useState } from "react";
import { GoArrowRight } from "react-icons/go";

const inputClass =
    "bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors";

type Status = "idle" | "loading" | "success" | "error";

export default function SectionsContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email")?.toString().trim() ?? "";
        const title = formData.get("title")?.toString().trim() ?? "";
        const description = formData.get("description")?.toString().trim() ?? "";

        if (!email || !title || !description) {
            setStatus("error");
            setMessage("Please fill in every field before sending.");
            return;
        }

        setStatus("loading");
        try {
            // Plain JSON POST to our same-origin proxy (app/api/contact), which
            // attaches the API secret key and forwards to the email API server-side.
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, title, description }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            setMessage("Thanks — your message has been sent. I'll get back to you soon.");
            form.reset();
        } catch {
            setStatus("error");
            setMessage("Something went wrong sending your message. Please try again.");
        }
    }

    const pending = status === "loading";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="visitor@example.com"
                    className={inputClass}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                    Subject
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Product Inquiry"
                    className={inputClass}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                    Message
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Hello, I would like to ask about your packages..."
                    className={`${inputClass} resize-none`}
                />
            </div>

            {(status === "success" || status === "error") && (
                <p
                    aria-live="polite"
                    className={`text-sm ${status === "success" ? "text-green-600" : "text-red-500"}`}
                >
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="px-10 py-4 rounded-2xl transition-colors font-sans text-10d flex items-center gap-2 w-fit bg-primary text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                <span>{pending ? "Sending..." : "Send message"}</span>
                <GoArrowRight />
            </button>
        </form>
    );
}
