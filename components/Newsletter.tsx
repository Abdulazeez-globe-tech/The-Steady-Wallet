"use client";

import { useState } from "react";
import WalletMark from "./WalletMark";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      id="newsletter"
      className="bg-fern rounded-[2.5rem] px-6 py-12 md:p-16 text-center relative overflow-hidden"
    >
      <WalletMark className="w-40 h-40 text-sage/20 absolute -top-10 -left-10 rotate-12" />
      <WalletMark className="w-28 h-28 text-sage/20 absolute -bottom-8 -right-6 -rotate-12" />

      <div className="relative max-w-xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-paper">
          Grab the free budget planner
        </h2>
        <p className="mt-4 text-mist/90 leading-relaxed">
          Join the newsletter and I&apos;ll send you the printable monthly
          budget planner I actually use. One useful email a week, no spam,
          no fluff. Unsubscribe whenever.
        </p>

        {done ? (
          <p className="mt-8 bg-paper/10 text-paper rounded-2xl py-4 px-6 font-medium">
            You&apos;re in. Check your inbox for the planner.
          </p>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-5 py-3 bg-paper text-pine placeholder:text-sage focus:outline-none focus:ring-2 focus:ring-petal"
            />
            <button
              onClick={() => email.includes("@") && setDone(true)}
              className="rounded-full bg-petal text-pine font-semibold px-6 py-3 hover:bg-petal-soft transition-colors"
            >
              Send it over
            </button>
          </div>
        )}
        <p className="mt-4 text-xs text-mist/60">
          Connect your email provider (MailerLite, ConvertKit) to make this
          form live.
        </p>
      </div>
    </section>
  );
}
