import { scrapeBlog } from '@/lib/scraper';
import { fakeSummarize } from '@/lib/summarizer';
import { translateToUrdu } from '@/lib/translator';
import { saveToSupabase } from '@/lib/supabase';
import { saveToMongo } from '@/lib/mongodb';

export async function POST(req: Request) {
  const { url } = await req.json();

  const fullText = await scrapeBlog(url);
  const summary = fakeSummarize(fullText);
  const urdu = await translateToUrdu(summary);

  await saveToSupabase(summary, urdu);
  await saveToMongo(fullText);
console.log('SUMMARY:', summary);
console.log('TRANSLATION:', urdu);

  return new Response(JSON.stringify({ summary, urdu }), { status: 200 });
}
