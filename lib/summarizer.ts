export function fakeSummarize(text: string): string {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 100);
  const summaryParagraphs = paragraphs.slice(0, );
  return summaryParagraphs.join('\n');
}
