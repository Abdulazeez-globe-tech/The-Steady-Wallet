import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, categories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Every Steady Wallet post on budgeting, debt payoff, side hustles, printables, and money mindset.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const all = getAllPosts();
  const posts = category ? all.filter((p) => p.category === category) : all;

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 pb-8">
      <h1 className="font-display text-5xl md:text-6xl font-semibold text-pine">
        The blog
      </h1>
      <p className="mt-4 text-fern max-w-xl leading-relaxed">
        Every post lives here. Filter by what your money needs this week.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/blog"
          className={`rounded-full text-sm font-medium px-5 py-2.5 transition-colors ${
            !category
              ? "bg-fern text-paper"
              : "bg-mist text-fern hover:bg-moss"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/blog?category=${encodeURIComponent(c)}`}
            className={`rounded-full text-sm font-medium px-5 py-2.5 transition-colors ${
              category === c
                ? "bg-fern text-paper"
                : "bg-mist text-fern hover:bg-moss"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-fern">
          Nothing in this category yet. New posts are on the way.
        </p>
      ) : (
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-6 [&>a]:mb-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} tall={i % 2 === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
