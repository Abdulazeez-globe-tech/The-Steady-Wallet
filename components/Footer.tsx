import Link from "next/link";
import WalletMark from "./WalletMark";

export default function Footer() {
  return (
    <footer className="bg-pine text-mist mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <WalletMark className="w-5 h-5 text-sage" />
            <span className="font-display text-xl font-semibold text-paper">
              The Steady Wallet
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist/80 max-w-xs">
            Practical, judgment-free money guidance for women. Budgeting
            that sticks, debt payoff that works, and side hustle ideas with
            real numbers.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <p className="font-semibold text-paper mb-4 tracking-wide uppercase text-xs">
            Explore
          </p>
          <ul className="space-y-2.5">
            <li>
              <Link href="/blog" className="hover:text-paper transition-colors">
                All posts
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-paper transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-paper transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-paper transition-colors"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/disclosure"
                className="hover:text-paper transition-colors"
              >
                Disclosure
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <p className="font-semibold text-paper mb-4 tracking-wide uppercase text-xs">
            A note on advice
          </p>
          <p className="text-mist/80 leading-relaxed">
            Everything here is education and personal experience, not
            professional financial advice. Your money, your call. Always
            consult a licensed professional for decisions specific to your
            situation.
          </p>
        </div>
      </div>
      <div className="border-t border-fern/40">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-mist/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>
            &copy; {new Date().getFullYear()} The Steady Wallet. All rights
            reserved.
          </span>
          <span>Built with intention (and a spreadsheet).</span>
        </div>
      </div>
    </footer>
  );
}
