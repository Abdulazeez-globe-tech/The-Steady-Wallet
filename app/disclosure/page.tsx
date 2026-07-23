import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Affiliate disclosure and financial content disclaimer for The Steady Wallet.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-16">
      <h1 className="font-display text-5xl font-semibold text-pine">
        Disclosure
      </h1>
      <p className="mt-3 text-sm text-sage">Last updated: July 2026</p>

      <div className="mt-10 prose-tsw pb-8">
        <h2>Affiliate links</h2>
        <p>
          Some posts on The Steady Wallet contain affiliate links to
          financial tools, apps, products, and services. If you click one of
          those links and make a purchase or sign up, we may earn a small
          commission at no extra cost to you.
        </p>
        <p>
          We only recommend tools we&apos;ve used ourselves or researched
          thoroughly. Affiliate partnerships never influence which products
          we recommend or what we say about them. If something isn&apos;t
          worth your money, we won&apos;t link to it.
        </p>
        <p>
          Any post containing affiliate links will carry a disclosure notice
          at the top of the article.
        </p>

        <h2>Sponsored content</h2>
        <p>
          If a post is sponsored or created in partnership with a brand, it
          will be clearly labeled. Sponsored content reflects our honest
          opinions. We don&apos;t accept sponsorships from companies whose
          products we wouldn&apos;t use ourselves.
        </p>

        <h2>Not financial advice</h2>
        <p>
          Everything on this site is for educational and informational
          purposes only. It is not professional financial, legal, tax, or
          investment advice. We share what has worked for us and what we&apos;ve
          learned through personal experience and research.
        </p>
        <p>
          Your financial situation is yours. Before making decisions about
          debt, investments, taxes, or any financial product, consult a
          licensed financial professional who can look at your specific
          circumstances.
        </p>

        <h2>Earnings disclaimer</h2>
        <p>
          When we share income numbers from side hustles or freelancing, those
          are real numbers from real experience. They are not guarantees. What
          you earn from any side hustle or income strategy depends on your
          effort, your market, your skills, and a dozen other factors we
          can&apos;t control.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have questions about any of this, email{" "}
          <a href="mailto:hello@thesteadywallet.com">
            hello@thesteadywallet.com
          </a>
          . Transparency matters here.
        </p>
      </div>
    </div>
  );
}
