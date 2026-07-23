import Link from "next/link";
import { getAllPosts, categories } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Newsletter from "@/components/Newsletter";
import WalletMark from "@/components/WalletMark";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <WalletMark className="w-[420px] h-[420px] text-moss/60 absolute -top-32 -right-32 rotate-12 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sage flex items-center gap-2">
            <WalletMark className="w-4 h-4" /> Money guidance for women
          </p>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[1.05] text-pine max-w-3xl">
            Your money can be{" "}
            <em className="text-fern font-medium">steady</em>. Let&apos;s
            get it there.
          </h1>
          <p className="mt-6 text-lg text-fern max-w-xl leading-relaxed">
            Budgeting that sticks, debt payoff that works, and side hustle
            ideas with real numbers behind them. No shame, no jargon, no
            &ldquo;just stop buying coffee.&rdquo;
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-fern text-paper font-medium px-7 py-3.5 hover:bg-pine transition-colors"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-sage text-fern font-medium px-7 py-3.5 hover:bg-mist transition-colors"
            >
              My story
            </Link>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog?category=${encodeURIComponent(c)}`}
              className="rounded-full bg-mist text-fern text-sm font-medium px-5 py-2.5 hover:bg-moss hover:text-pine transition-colors"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured posts */}
      <section className="mx-auto max-w-6xl px-5 mt-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-pine">
            Latest posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-fern hover:text-pine underline underline-offset-4 decoration-sage"
          >
            View all posts
          </Link>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>a]:mb-6">
          {featured.map((post, i) => (
            <PostCard key={post.slug} post={post} tall={i % 3 !== 1} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-5 mt-20">
        <Newsletter />
      </section>
    </>
  );
}
