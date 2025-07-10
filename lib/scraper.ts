import axios from 'axios';
import { load } from 'cheerio';

export async function scrapeBlog(url: string): Promise<string> {
  const { data } = await axios.get<string>(url);
  const $ = load(data);
  const paragraphs = $('p').map((_, el) => $(el).text()).get();
  return paragraphs.join('\n\n');
}
