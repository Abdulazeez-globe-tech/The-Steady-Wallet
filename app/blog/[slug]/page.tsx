import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import WalletMark from "@/components/WalletMark";
import ViewTracker from "@/components/ViewTracker";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "The Steady Wallet" },
  };

  return (
    <article className="pt-16">
      <ViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mx-auto max-w-3xl px-5 text-center">
        <Link
          href={`/blog?category=${encodeURIComponent(post.category)}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-sage hover:text-fern"
        >
          <WalletMark className="w-4 h-4" /> {post.category}
        </Link>
        <h1 className="mt-5 font-display text-4xl md:text-[3.4rem] leading-[1.1] font-semibold text-pine">
          {post.title}
        </h1>
        <p className="mt-6 text-sm text-fern">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="mx-2 text-sage">&middot;</span>
          {post.readingTime}
        </p>
      </header>

      <div className="mx-auto max-w-2xl px-5 mt-12 prose-tsw">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>

      <div className="mx-auto max-w-2xl px-5 mt-14">
        <div className="rounded-3xl bg-mist p-8 text-center">
          <p className="font-display text-2xl font-semibold text-pine">
            Want more like this?
          </p>
          <p className="mt-2 text-fern text-sm leading-relaxed">
            The newsletter gets one practical money email a week, plus the
            free budget planner.
          </p>
          <Link
            href="/#newsletter"
            className="mt-5 inline-block rounded-full bg-fern text-paper font-medium px-6 py-3 hover:bg-pine transition-colors"
          >
            Join the newsletter
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 mt-20">
          <h2 className="font-display text-3xl font-semibold text-pine mb-8">
            Keep reading
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
