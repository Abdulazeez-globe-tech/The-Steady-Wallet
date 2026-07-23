"use client";

import { useState } from "react";
import WalletMark from "@/components/WalletMark";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-5 pt-16">
      <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sage flex items-center gap-2">
        <WalletMark className="w-4 h-4" /> Contact
      </p>
      <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold text-pine">
        Say hello
      </h1>
      <p className="mt-6 text-fern leading-relaxed">
        Questions, post requests, or a money win you want to share? I read
        every message. For partnerships and press, use the form or email{" "}
        <a
          href="mailto:hello@thesteadywallet.com"
          className="underline underline-offset-4 decoration-sage hover:text-pine"
        >
          hello@thesteadywallet.com
        </a>
        .
      </p>

      {sent ? (
        <div className="mt-10 mb-10 rounded-3xl bg-mist p-8 text-center">
          <p className="font-display text-2xl font-semibold text-pine">
            Message sent
          </p>
          <p className="mt-2 text-fern text-sm">
            Thanks for reaching out. I&apos;ll get back to you within a
            few days.
          </p>
        </div>
      ) : (
        <form
          className="mt-10 mb-10 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-pine mb-1.5"
              >
                Your name
              </label>
              <input
                id="name"
                required
                className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-pine mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-pine mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              required
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-fern text-paper font-medium px-7 py-3.5 hover:bg-pine transition-colors"
          >
            Send message
          </button>
          <p className="text-xs text-sage">
            Wire this form to Formspree, Resend, or an API route to receive
            messages.
          </p>
        </form>
      )}
    </div>
  );
}
