"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Wrong password. Try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-4xl font-semibold text-pine text-center">
          The Steady Wallet
        </h1>
        <p className="mt-2 text-center text-sm text-fern">Admin dashboard</p>

        <form onSubmit={handleLogin} className="mt-10 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pine mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-moss bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-fern text-paper font-medium py-3 hover:bg-pine transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
