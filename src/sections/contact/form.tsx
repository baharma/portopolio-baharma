"use client"

import { useState } from "react";
import { GoAlertFill, GoArrowRight, GoCheckCircleFill } from "react-icons/go";

const inputClass =
    "bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-300 transition-all";

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
                    className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${status === "success"
                        ? "text-green-700 bg-green-50 border border-green-200"
                        : "text-red-600 bg-red-50 border border-red-200"
                        }`}
                >
                    {status === "success" ? (
                        <GoCheckCircleFill className="shrink-0" />
                    ) : (
                        <GoAlertFill className="shrink-0" />
                    )}
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="px-10 py-4 rounded-2xl transition-all font-sans text-10d flex items-center gap-2 w-fit bg-primary text-white hover:bg-primary/90 hover:shadow-[0_8px_24px_0_rgba(30,58,95,0.25)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
                <span>{pending ? "Sending..." : "Send message"}</span>
                <GoArrowRight />
            </button>
        </form>
    );
}
