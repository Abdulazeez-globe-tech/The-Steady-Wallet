import type { Metadata } from "next";
import Link from "next/link";
import WalletMark from "@/components/WalletMark";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind The Steady Wallet and why this blog exists: practical, judgment-free money guidance for women.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
      <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sage flex items-center gap-2">
        <WalletMark className="w-4 h-4" /> About
      </p>
      <h1 className="mt-5 font-display text-5xl md:text-6xl font-semibold leading-[1.08] text-pine">
        I&apos;m the friend who got her money together and will actually
        tell you how.
      </h1>

      <div className="mt-10 prose-tsw">
        <p>
          A few years ago I was Googling &ldquo;why do I have no money left
          after payday&rdquo; at midnight, phone propped on my chest. I had
          a decent job. I wasn&apos;t reckless. And somehow every month
          ended with $12 in my checking account and a quiet knot of dread
          about what would break next.
        </p>
        <p>
          Nobody had taught me how to manage money on purpose. Not school,
          not my parents, not the bank that kept mailing me credit card
          offers. So I taught myself. Slowly, messily, with a lot of
          spreadsheets that didn&apos;t survive past week two.
        </p>
        <p>
          Eventually some things stuck. I paid off $9,300 in credit card
          debt over 19 months. I built a three-month emergency fund from
          nothing. I picked up $600 a month in side income on top of my day
          job. None of it was glamorous. All of it worked.
        </p>
        <h2>Why The Steady Wallet exists</h2>
        <p>
          Most money content talks down to women or assumes we&apos;re
          starting from zero. It hands out vague advice like &ldquo;spend
          less than you earn&rdquo; and calls it a strategy. You already
          know that. What you need is the actual plan, the real numbers,
          and someone who won&apos;t shame you for where you&apos;re
          starting.
        </p>
        <p>
          That&apos;s what this site is. Budgeting guides that assume you
          have a real life. Debt payoff strategies with actual timelines.
          Side hustle posts with honest dollar amounts and honest hours, not
          &ldquo;make $10k from your phone&rdquo; nonsense. And free
          printable planners you&apos;ll actually use, because a tool that
          sits in a drawer helps no one.
        </p>
        <h2>What I believe about money</h2>
        <ul>
          <li>
            You&apos;re not bad with money. You were never taught. Those
            are different things.
          </li>
          <li>
            A budget you&apos;ll follow at 80% beats a perfect one
            you&apos;ll abandon by the 9th.
          </li>
          <li>
            Specific numbers beat percentages. &ldquo;Save $50 a
            week&rdquo; lands. &ldquo;Save 10%&rdquo; floats away.
          </li>
          <li>
            Shame has never balanced a single budget. Ever.
          </li>
        </ul>
        <p>
          One honest note: I&apos;m not a financial advisor. I&apos;m
          someone who figured it out and wants you to skip some of the trial
          and error I went through. For big decisions specific to your
          situation, talk to a licensed professional.
        </p>
      </div>

      <div className="mt-12 mb-8 rounded-3xl bg-mist p-8 text-center">
        <p className="font-display text-2xl font-semibold text-pine">
          Start where I&apos;d start
        </p>
        <p className="mt-2 text-fern text-sm">
          The budgeting posts are the foundation. Everything else builds on
          them.
        </p>
        <Link
          href="/blog?category=Budgeting"
          className="mt-5 inline-block rounded-full bg-fern text-paper font-medium px-6 py-3 hover:bg-pine transition-colors"
        >
          Read the budgeting guides
        </Link>
      </div>
    </div>
  );
}
