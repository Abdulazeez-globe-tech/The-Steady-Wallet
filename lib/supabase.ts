import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type DbPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type DbPageView = {
  id: string;
  slug: string;
  viewed_at: string;
};
