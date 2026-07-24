import Link from "next/link";
import WalletMark from "./WalletMark";
import { PostMeta, formatDate } from "@/lib/posts";

const tints: Record<string, { bg: string; mark: string }> = {
  Budgeting: { bg: "bg-mist", mark: "text-sage" },
  "Debt Payoff": { bg: "bg-petal-soft", mark: "text-petal" },
  "Side Hustles & Income": { bg: "bg-[#e7ebde]", mark: "text-fern" },
  "Printables & Planners": { bg: "bg-moss", mark: "text-fern" },
  "Money Mindset": { bg: "bg-[#eef0ea]", mark: "text-sage" },
};

export default function PostCard({
  post,
  tall = false,
}: {
  post: PostMeta;
  tall?: boolean;
}) {
  const tint = tints[post.category] ?? tints.Budgeting;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col rounded-3xl overflow-hidden border border-moss/70 bg-white/60 hover:shadow-lg hover:shadow-sage/10 hover:-translate-y-0.5 transition-all duration-200 break-inside-avoid`}
    >
      {post.featuredImage ? (
        <div className="relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className={`w-full object-cover ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
          />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-white/90 backdrop-blur text-[11px] uppercase tracking-[0.15em] font-semibold text-fern px-3 py-1 rounded-full">
              {post.category}
            </span>
            <WalletMark
              className={`w-5 h-5 text-white drop-shadow group-hover:rotate-12 transition-transform duration-300`}
            />
          </div>
        </div>
      ) : (
        <div
          className={`${tint.bg} ${
            tall ? "aspect-[3/4]" : "aspect-[4/3]"
          } relative flex flex-col justify-between p-6`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-fern">
              {post.category}
            </span>
            <WalletMark
              className={`w-5 h-5 ${tint.mark} group-hover:rotate-12 transition-transform duration-300`}
            />
          </div>
          <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight font-semibold text-pine">
            {post.title}
          </h3>
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {post.featuredImage && (
          <h3 className="font-display text-xl leading-tight font-semibold text-pine">
            {post.title}
          </h3>
        )}
        <p className="text-sm text-fern/90 leading-relaxed line-clamp-3">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-sage">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
