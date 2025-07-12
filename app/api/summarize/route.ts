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
  
    console.log('✅ Scraping complete');
  const summary = fakeSummarize(fullText);
  
    console.log('📝 Summary created');
  const urdu = await translateToUrdu(summary);

    console.log('🌐 Urdu translation complete');
  await saveToSupabase(summary, urdu);
  await saveToMongo(fullText);
console.log('SUMMARY:', summary);
console.log('TRANSLATION:', urdu);

  return new Response(JSON.stringify({ summary, summaryUrdu: urdu }), { status: 200 });
}

// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';
// import OpenAI from 'openai';
// import { JSDOM } from 'jsdom';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// function extractText(html: string): string {
//   const dom = new JSDOM(html);
//   const text = dom.window.document.body.textContent || '';
//   return text.replace(/\s+/g, ' ').trim();
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { url } = await req.json();

//     if (!url) {
//       return NextResponse.json({ error: 'URL is required' }, { status: 400 });
//     }

//     const blogHtml = await axios.get(url);
//     const textContent = extractText(blogHtml.data);

//     const summaryResponse = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: `Summarize this blog:\n\n${textContent}` }],
//       temperature: 0.5,
//     });
//     const summary = summaryResponse.choices[0].message.content;

//     const urduResponse = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',  // Use the same model or whichever you have access to
//       messages: [{ role: 'user', content: `Translate this to Urdu:\n\n${summary}` }],
//     });
//     const summaryUrdu = urduResponse.choices[0].message.content;

//     return NextResponse.json({ summary, summaryUrdu });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Failed to summarize blog' }, { status: 500 });
//   }
// }
