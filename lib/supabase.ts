import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
export async function saveToSupabase(summary: string, urdu: string) {
  const { data, error } = await supabase.from('summaries').insert({ summary, urdu }).select();
  console.log('Insert successful:', data);
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert successful:', data);
  }
  return { data, error };
}
