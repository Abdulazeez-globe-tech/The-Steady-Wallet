import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabase: SupabaseClient;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  supabase = createClient("https://placeholder.supabase.co", "placeholder");
}

export { supabase };

export type DbPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: string;
  published: boolean;
  featured_image: string;
  created_at: string;
  updated_at: string;
};

export type DbPageView = {
  id: string;
  slug: string;
  viewed_at: string;
};
