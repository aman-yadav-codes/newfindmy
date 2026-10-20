"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Newsletter sign-up is not connected yet. Your email was not saved.");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md lg:w-[400px]">
      <div className="flex flex-col min-[340px]:flex-row items-stretch min-[340px]:items-center gap-2">
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email address for FindMy newsletter"
          placeholder="Enter your email"
          required
          onChange={() => setMessage("")}
          className="h-10 min-w-0 w-full flex-1 rounded-full border border-white/20 bg-black/40 px-3.5 sm:px-4 text-xs sm:text-sm text-white placeholder:text-slate-400 transition-colors focus:border-orange-500/80 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-4 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-600/30 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
        >
          <Send aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Subscribe</span>
        </button>
      </div>
      {message && (
        <p role="status" aria-live="polite" className="mt-2 text-xs text-orange-400">
          {message}
        </p>
      )}
    </form>
  );
}
