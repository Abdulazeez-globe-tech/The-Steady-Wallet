"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import WalletMark from "./WalletMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-moss">
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="The Steady Wallet home"
        >
          <WalletMark className="w-6 h-6 text-sage group-hover:text-petal transition-colors" />
          <span className="font-display text-2xl font-semibold tracking-tight text-pine">
            The Steady{" "}
            <span className="text-sage italic font-medium">Wallet</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm tracking-wide transition-colors ${
                  active
                    ? "text-pine font-semibold"
                    : "text-fern hover:text-pine"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/#newsletter"
            className="text-sm font-medium bg-fern text-paper px-4 py-2 rounded-full hover:bg-pine transition-colors"
          >
            Free budget planner
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-pine"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-moss bg-paper px-5 py-4 flex flex-col gap-4"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-fern hover:text-pine text-base"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-fern text-paper px-4 py-2.5 rounded-full text-center"
          >
            Free budget planner
          </Link>
        </nav>
      )}
    </header>
  );
}
