import { scrapeBlog } from '@/lib/scraper';
import { fakeSummarize } from '@/lib/summarizer';
import { translateToUrdu } from '@/lib/translator';
import { saveToSupabase } from '@/lib/supabase';
import { saveToMongo } from '@/lib/mongodb';

export async function POST(req: Request) {
   console.log('🔁 Received request');
  const { url } = await req.json();

  console.log('🌐 URL received:', url);
   console.log('🪝 Starting scrape...');
  const fullText = await scrapeBlog(url);
console.log('🔍 Scraped content preview:\n', fullText); // First 300 characters

  
    console.log('✅ Scraping complete');
  const summary = fakeSummarize(fullText);
  
    console.log('📝 Summary created');
  const urdu = await translateToUrdu(summary);

    console.log('🌐 Urdu translation complete');
  await saveToSupabase(summary, urdu);
  
    console.log('🌐 written to supabase');
  await saveToMongo(fullText);
      console.log('🌐 written to mongodb',fullText);

//console.log('SUMMARY:', summary);
//console.log('TRANSLATION:', urdu);


  return new Response(JSON.stringify({ summary, summaryUrdu: urdu }), { status: 200 });
}
