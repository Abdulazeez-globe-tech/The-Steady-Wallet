import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  await supabase.from("page_views").insert({ slug });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tsw-admin")?.value;
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("page_views")
    .select("slug, viewed_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate views by slug
  const counts: Record<string, number> = {};
  const today = new Date().toISOString().split("T")[0];
  const todayCounts: Record<string, number> = {};
  const last7: Record<string, number> = {};
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  for (const row of data || []) {
    counts[row.slug] = (counts[row.slug] || 0) + 1;
    if (row.viewed_at?.startsWith(today)) {
      todayCounts[row.slug] = (todayCounts[row.slug] || 0) + 1;
    }
    if (row.viewed_at && row.viewed_at >= sevenDaysAgo) {
      last7[row.slug] = (last7[row.slug] || 0) + 1;
    }
  }

  return NextResponse.json({
    total: counts,
    today: todayCounts,
    last7,
    totalViews: data?.length || 0,
  });
}
