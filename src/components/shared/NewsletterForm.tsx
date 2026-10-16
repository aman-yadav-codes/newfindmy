"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter sign-up is not connected yet. Your email was not saved.");
  }

  return <form onSubmit={handleSubmit} className="w-full max-w-md lg:w-[380px]">
    <div className="flex items-center gap-2">
      <input type="email" name="email" autoComplete="email" aria-label="Email address for FindMy newsletter" placeholder="Enter your email" required onChange={() => setMessage("")} className="min-w-0 flex-1 rounded-xl border border-white/25 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-slate-300 focus-visible:outline-2 focus-visible:outline-amber-300" />
      <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-amber-300"><Send aria-hidden="true" className="size-4" />Subscribe</button>
    </div>
    <p role="status" aria-live="polite" className="mt-2 text-xs text-slate-200">{message}</p>
  </form>;
}
