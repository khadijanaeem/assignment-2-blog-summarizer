import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function saveToSupabase(summary: string, urdu: string) {
  return supabase.from('summaries').insert({ summary, urdu });
}
