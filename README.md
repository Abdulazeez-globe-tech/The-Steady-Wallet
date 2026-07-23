# The Steady Wallet

A Pinterest-style personal finance blog for women. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Content lives as Markdown files in the repo, so publishing a post is just adding a file.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Markdown content** parsed with `gray-matter` + `remark`
- Fonts: Cormorant Garamond (headings) and DM Sans (body) via Google Fonts
- SEO: static rendering, `sitemap.xml`, `robots.txt`, Open Graph tags, JSON-LD BlogPosting schema

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding a new post

Create a new `.md` file in `content/posts/`. The filename becomes the URL slug.

```markdown
---
title: "Your Post Title"
description: "A 17 to 20 word meta description with the focus keyword."
category: "Budgeting"
date: "2026-08-01"
---

Your content here. H2 headings with ##, H3 with ###.
```

Valid categories: `Budgeting`, `Debt Payoff`, `Side Hustles & Income`, `Printables & Planners`, `Money Mindset` (edit the list in `lib/posts.ts`).

Commit and push. Vercel redeploys automatically.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework preset: Next.js. No env vars needed. Deploy.
4. Update the `metadataBase` URL in `app/layout.tsx`, plus the base URL in `app/sitemap.ts` and `app/robots.ts`, to your real domain.

## Wiring up real integrations

- **Newsletter** (`components/Newsletter.tsx`): replace the local state with a MailerLite or ConvertKit embedded form / API call.
- **Contact form** (`app/contact/page.tsx`): point the submit handler at Formspree, Resend, or a Next.js API route.
- **Analytics**: add Vercel Analytics (`@vercel/analytics`) and the Pinterest Tag when you're ready.

## Project structure

```
app/              pages (home, blog, blog/[slug], about, contact, privacy, disclosure)
components/       Header, Footer, PostCard, Newsletter, WalletMark
content/posts/    Markdown blog posts
lib/posts.ts      post loading, parsing, categories
```
