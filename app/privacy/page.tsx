import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Steady Wallet collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
      <h1 className="font-display text-5xl font-semibold text-pine">
        Privacy policy
      </h1>
      <p className="mt-3 text-sm text-sage">Last updated: July 2026</p>

      <div className="mt-10 prose-tsw pb-8">
        <p>
          The Steady Wallet (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information we collect when you visit the site, how we use it, and
          the choices you have.
        </p>

        <h2>Information we collect</h2>
        <p>
          <strong>Information you give us.</strong> If you subscribe to the
          newsletter or use the contact form, we collect your name and email
          address so we can respond and send you the content you asked for.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most
          websites, we use analytics tools that collect anonymous usage data:
          pages visited, time on site, device type, and general location at
          the country or city level. This helps us understand which content
          is useful.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To send the newsletter and free downloads you signed up for</li>
          <li>To reply to messages you send through the contact form</li>
          <li>To improve the site and understand what readers find helpful</li>
          <li>To comply with legal obligations where required</li>
        </ul>
        <p>
          We never sell your personal information. We never share your email
          with third parties for their own marketing.
        </p>

        <h2>Cookies</h2>
        <p>
          The site uses cookies for analytics and, if enabled in the future,
          for advertising and Pinterest conversion tracking. You can disable
          cookies in your browser settings at any time. The site will still
          work.
        </p>

        <h2>Email communications</h2>
        <p>
          Every newsletter email includes an unsubscribe link. Click it once
          and you&apos;re out, no questions asked. We use a third-party email
          provider to deliver messages, and your email is stored securely
          with them.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, or delete the personal data we hold about you. To exercise
          any of these rights, email{" "}
          <a href="mailto:hello@thesteadywallet.com">
            hello@thesteadywallet.com
          </a>{" "}
          and we&apos;ll handle it promptly.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we update this policy, we&apos;ll change the date at the top of
          this page. Significant changes will be noted in the newsletter.
        </p>

        <p className="mt-8 text-sm text-sage">
          For information about affiliate links and financial content, see
          our{" "}
          <Link
            href="/disclosure"
            className="underline underline-offset-4 decoration-sage hover:text-pine"
          >
            disclosure page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
