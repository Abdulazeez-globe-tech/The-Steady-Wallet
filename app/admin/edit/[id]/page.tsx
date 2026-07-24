"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

const categories = [
  "Budgeting",
  "Debt Payoff",
  "Side Hustles & Income",
  "Printables & Planners",
  "Money Mindset",
];

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    content: "",
    published: false,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/posts/${id}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        setError("Post not found.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        content: data.content,
        published: data.published,
      });
      setLoading(false);
    }
    load();
  }, [id, router]);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function save(publish?: boolean) {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError("");

    const body =
      publish !== undefined ? { ...form, published: publish } : form;

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      setSaving(false);
      return;
    }

    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-fern">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-pine text-paper">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin"
              className="text-xs text-mist/70 hover:text-paper"
            >
              &larr; Back to dashboard
            </Link>
            <h1 className="font-display text-xl font-semibold mt-1">
              Edit post
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {form.published ? (
              <button
                onClick={() => save(false)}
                disabled={saving}
                className="rounded-full border border-sage text-mist text-sm font-medium px-5 py-2 hover:bg-fern/50 transition-colors disabled:opacity-50"
              >
                Unpublish
              </button>
            ) : (
              <button
                onClick={() => save(true)}
                disabled={saving}
                className="rounded-full border border-sage text-mist text-sm font-medium px-5 py-2 hover:bg-fern/50 transition-colors disabled:opacity-50"
              >
                Publish
              </button>
            )}
            <button
              onClick={() => save()}
              disabled={saving}
              className="rounded-full bg-sage text-pine text-sm font-medium px-5 py-2 hover:bg-moss transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 text-lg font-display focus:outline-none focus:ring-2 focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Meta description
              <span className="text-sage font-normal ml-2">
                (17-20 words for SEO)
              </span>
            </label>
            <input
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <p className="mt-1 text-xs text-sage">
              {form.description.trim().split(/\s+/).filter(Boolean).length}{" "}
              words
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Content
              <span className="text-sage font-normal ml-2">
                (Markdown supported)
              </span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              rows={24}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage"
            />
            <p className="mt-1 text-xs text-sage">
              {form.content.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
