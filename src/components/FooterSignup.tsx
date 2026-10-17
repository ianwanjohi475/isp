"use client";

import { useState, type FormEvent } from "react";
import { Send } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export function FooterSignup() {
  const [done, setDone] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    window.open(
      whatsappLink(`Hi SNET Networks 👋, I'd like to get connected.\nName: ${d.get("name")}\nPhone: ${d.get("phone")}`),
      "_blank",
      "noopener,noreferrer",
    );
    setDone(true);
  }
  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
      <input name="name" required placeholder="Your name" aria-label="Your name" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-white placeholder:text-slate-400 outline-none focus:border-sky-brand" />
      <input name="phone" required type="tel" placeholder="Phone number" aria-label="Phone number" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-white placeholder:text-slate-400 outline-none focus:border-sky-brand" />
      <button type="submit" className="btn shrink-0 whitespace-nowrap bg-white text-navy-900 shadow-lg hover:bg-navy-900 hover:text-white">
        <Send className="h-4 w-4" /> {done ? "Sent" : "Connect me"}
      </button>
    </form>
  );
}
