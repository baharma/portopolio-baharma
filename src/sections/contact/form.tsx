"use client"

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { GoArrowRight } from "react-icons/go";
import { sendContactMessage, type ContactFormState } from "@/src/service/api/contact";

const initialContactFormState: ContactFormState = { status: "idle", message: "" };

const inputClass =
    "bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="px-10 py-4 rounded-2xl transition-colors font-sans text-10d flex items-center gap-2 w-fit bg-primary text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <span>{pending ? "Sending..." : "Send message"}</span>
            <GoArrowRight />
        </button>
    );
}

export default function SectionsContactForm() {
    const [state, formAction] = useActionState(sendContactMessage, initialContactFormState);

    return (
        <form action={formAction} className="flex flex-col gap-5 w-full">
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

            {state.status !== "idle" && (
                <p
                    aria-live="polite"
                    className={`text-sm ${state.status === "success" ? "text-green-600" : "text-red-500"}`}
                >
                    {state.message}
                </p>
            )}

            <SubmitButton />
        </form>
    );
}
