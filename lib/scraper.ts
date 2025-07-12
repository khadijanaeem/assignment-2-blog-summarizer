import axios from 'axios';
import { load } from 'cheerio';

const BLACKLIST_SELECTORS = [
  'footer',
  'nav',
  'aside',
  'header',
  'script',
  'style',
  'noscript',
  '.footer',
  '.copyright',
  '#footer',
  '#copyright',
  '.disclaimer',
  '.ads',
];

const BLACKLIST_TEXT = [
  'copyright',
  'all rights reserved',
  'terms of use',
  'privacy policy',
  'advertisement',
];

export async function scrapeBlog(url: string): Promise<string> {
  try {
    const { data, headers } = await axios.get<string>(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0 Safari/537.36',
      },
      timeout: 10000,
    });

    if (!headers['content-type']?.includes('text/html')) {
      throw new Error('URL did not return an HTML document.');
    }

    const $ = load(data);

    BLACKLIST_SELECTORS.forEach((selector) => {
      $(selector).remove();
    });

    let content =
      $('article').length ? $('article') :
      $('main').length ? $('main') :
      $('#content').length ? $('#content') :
      $('body');

    const allParagraphs = content.find('p')
      .map((_, el) => $(el).text().trim())
      .get();

    console.log(`Found ${allParagraphs.length} paragraphs inside main container.`);

    // Filter paragraphs with length > 20 chars
    const filtered = allParagraphs.filter(p => p.length > 20);

    console.log(`Filtered down to ${filtered.length} paragraphs with length > 20.`);

    if (filtered.length === 0) {
      return 'No meaningful content found.';
    }

    // Show first paragraph for debug
    console.log('First paragraph:', filtered[0]);

    return filtered.join('\n\n');
  } catch (err: any) {
    console.error('Scraping failed:', err.message || err);
    return 'Failed to scrape blog content.';
  }
}