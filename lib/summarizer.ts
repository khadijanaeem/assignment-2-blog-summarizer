export function fakeSummarize(text: string): string {
  // Split the full text by new lines or double newlines (paragraphs)
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 100);

  // Take the first 3 paragraphs that are longer than 100 chars
  const summaryParagraphs = paragraphs.slice(0, 3);

  // Join paragraphs with double newlines to keep paragraph spacing
  return summaryParagraphs.join('\n\n');
}
