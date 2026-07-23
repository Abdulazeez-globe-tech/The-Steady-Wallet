import Link from "next/link";
import WalletMark from "@/components/WalletMark";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-24 pb-16 text-center">
      <WalletMark className="w-12 h-12 text-sage mx-auto" />
      <h1 className="mt-6 font-display text-5xl font-semibold text-pine">
        Page not found
      </h1>
      <p className="mt-4 text-fern leading-relaxed">
        That page doesn&apos;t exist, or it moved. The blog is the best
        place to start looking.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block rounded-full bg-fern text-paper font-medium px-7 py-3.5 hover:bg-pine transition-colors"
      >
        Browse all posts
      </Link>
    </div>
  );
}
