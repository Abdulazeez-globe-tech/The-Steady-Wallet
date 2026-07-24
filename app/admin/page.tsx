"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  created_at: string;
};

type Views = {
  total: Record<string, number>;
  today: Record<string, number>;
  last7: Record<string, number>;
  totalViews: number;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [views, setViews] = useState<Views | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const [postsRes, viewsRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/views"),
      ]);

      if (postsRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (postsRes.ok) setPosts(await postsRes.json());
      if (viewsRes.ok) setViews(await viewsRes.json());
      setLoading(false);
    }
    load();
  }, [router]);

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-fern">Loading dashboard...</p>
      </div>
    );
  }

  const totalViewsToday = views
    ? Object.values(views.today).reduce((a, b) => a + b, 0)
    : 0;
  const totalViewsWeek = views
    ? Object.values(views.last7).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-pine text-paper">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold">
              The Steady Wallet
            </h1>
            <p className="text-xs text-mist/70">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-mist/70 hover:text-paper underline underline-offset-4"
            >
              View site
            </Link>
            <Link
              href="/admin/new"
              className="rounded-full bg-sage text-pine text-sm font-medium px-5 py-2 hover:bg-moss transition-colors"
            >
              + New post
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8">
        {/* Analytics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-moss p-5">
            <p className="text-xs text-sage uppercase tracking-wide font-semibold">
              Total views
            </p>
            <p className="mt-2 text-3xl font-display font-semibold text-pine">
              {views?.totalViews || 0}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-moss p-5">
            <p className="text-xs text-sage uppercase tracking-wide font-semibold">
              Views today
            </p>
            <p className="mt-2 text-3xl font-display font-semibold text-pine">
              {totalViewsToday}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-moss p-5">
            <p className="text-xs text-sage uppercase tracking-wide font-semibold">
              Last 7 days
            </p>
            <p className="mt-2 text-3xl font-display font-semibold text-pine">
              {totalViewsWeek}
            </p>
          </div>
        </div>

        {/* Posts table */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-semibold text-pine">
            Posts
          </h2>
          <p className="text-sm text-sage">
            {posts.length} post{posts.length !== 1 ? "s" : ""} in database
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-moss p-10 text-center">
            <p className="text-fern">No posts yet.</p>
            <Link
              href="/admin/new"
              className="mt-4 inline-block rounded-full bg-fern text-paper font-medium px-6 py-2.5 hover:bg-pine transition-colors"
            >
              Write your first post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-moss overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-mist text-left">
                  <th className="px-5 py-3 font-semibold text-pine">Title</th>
                  <th className="px-5 py-3 font-semibold text-pine hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-5 py-3 font-semibold text-pine text-center">
                    Views
                  </th>
                  <th className="px-5 py-3 font-semibold text-pine text-center">
                    Status
                  </th>
                  <th className="px-5 py-3 font-semibold text-pine text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-mist/50 last:border-none"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-pine">{post.title}</p>
                      <p className="text-xs text-sage mt-0.5">
                        /blog/{post.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-fern hidden sm:table-cell">
                      {post.category}
                    </td>
                    <td className="px-5 py-4 text-center text-fern">
                      {views?.total[post.slug] || 0}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => togglePublish(post.id, post.published)}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          post.published
                            ? "bg-sage/20 text-fern"
                            : "bg-petal-soft text-petal"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/edit/${post.id}`}
                          className="text-xs text-fern hover:text-pine underline underline-offset-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deletePost(post.id, post.title)}
                          className="text-xs text-red-400 hover:text-red-600 underline underline-offset-4"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Per-post view breakdown */}
        {views && Object.keys(views.total).length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-pine mb-4">
              Views by post
            </h2>
            <div className="bg-white rounded-2xl border border-moss overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-mist text-left">
                    <th className="px-5 py-3 font-semibold text-pine">
                      Page
                    </th>
                    <th className="px-5 py-3 font-semibold text-pine text-right">
                      Today
                    </th>
                    <th className="px-5 py-3 font-semibold text-pine text-right">
                      7 days
                    </th>
                    <th className="px-5 py-3 font-semibold text-pine text-right">
                      All time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(views.total)
                    .sort(([, a], [, b]) => b - a)
                    .map(([slug, total]) => (
                      <tr
                        key={slug}
                        className="border-b border-mist/50 last:border-none"
                      >
                        <td className="px-5 py-3 text-fern">/blog/{slug}</td>
                        <td className="px-5 py-3 text-right text-pine">
                          {views.today[slug] || 0}
                        </td>
                        <td className="px-5 py-3 text-right text-pine">
                          {views.last7[slug] || 0}
                        </td>
                        <td className="px-5 py-3 text-right font-medium text-pine">
                          {total}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
