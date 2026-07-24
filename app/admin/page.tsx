"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";

const categories = [
  "Budgeting",
  "Debt Payoff",
  "Side Hustles & Income",
  "Printables & Planners",
  "Money Mindset",
];

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: categories[0],
    content: "",
    published: false,
    featured_image: "",
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function insertImageInContent(url: string) {
    const textarea = contentRef.current;
    if (!textarea) {
      update("content", form.content + `\n\n![Image description](${url})\n\n`);
      return;
    }
    const start = textarea.selectionStart;
    const before = form.content.slice(0, start);
    const after = form.content.slice(start);
    const imageMarkdown = `\n\n![Image description](${url})\n\n`;
    update("content", before + imageMarkdown + after);
    setTimeout(() => {
      textarea.focus();
      const newPos = start + imageMarkdown.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 50);
  }

  async function save(publish: boolean) {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required for SEO.");
      return;
    }

    setSaving(true);
    setError("");

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: publish }),
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

  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-pine text-paper">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-xs text-mist/70 hover:text-paper">
              &larr; Back to dashboard
            </Link>
            <h1 className="font-display text-xl font-semibold mt-1">New post</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => save(false)} disabled={saving}
              className="rounded-full border border-sage text-mist text-sm font-medium px-5 py-2 hover:bg-fern/50 transition-colors disabled:opacity-50">
              Save draft
            </button>
            <button onClick={() => save(true)} disabled={saving}
              className="rounded-full bg-sage text-pine text-sm font-medium px-5 py-2 hover:bg-moss transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">Title</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)}
              placeholder="How to Budget on an Irregular Income"
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 text-lg font-display focus:outline-none focus:ring-2 focus:ring-sage" />
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Meta description <span className="text-sage font-normal ml-2">(17-20 words for SEO)</span>
            </label>
            <input value={form.description} onChange={(e) => update("description", e.target.value)}
              placeholder="A step-by-step budgeting plan for women who are done living paycheck to paycheck."
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage" />
            <p className="mt-1 text-xs text-sage">
              {form.description.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">Category</label>
            <select value={form.category} onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage">
              {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-pine mb-1.5">
              Featured image <span className="text-sage font-normal ml-2">(shows at the top of the post and on cards)</span>
            </label>
            {form.featured_image ? (
              <div className="mt-2">
                <img src={form.featured_image} alt="Featured preview"
                  className="w-full max-w-md rounded-2xl border border-moss object-cover max-h-64" />
                <div className="mt-3 flex gap-3">
                  <ImageUploader label="Replace image" onUpload={(url) => update("featured_image", url)} />
                  <button onClick={() => update("featured_image", "")}
                    className="text-xs text-red-400 hover:text-red-600 underline underline-offset-4">Remove</button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <ImageUploader label="Upload featured image" onUpload={(url) => update("featured_image", url)} />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-pine">
                Content <span className="text-sage font-normal ml-2">(Markdown supported)</span>
              </label>
              <ImageUploader label="Insert image" onUpload={insertImageInContent} />
            </div>
            <textarea ref={contentRef} value={form.content} onChange={(e) => update("content", e.target.value)}
              rows={24}
              placeholder={`Write your post in Markdown...\n\n## This is a heading\n\nThis is a paragraph. You can use **bold text** for emphasis.\n\n### This is a subheading\n\n- Bullet point one\n- Bullet point two`}
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage" />
            <p className="mt-1 text-xs text-sage">
              {form.content.trim().split(/\s+/).filter(Boolean).length} words
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
