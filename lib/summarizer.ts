export function fakeSummarize(text: string): string {
  const sentences = text.split('.').filter(s => s.trim().length > 20);
  return sentences.slice(0, 3).join('. ') + '.';
}
