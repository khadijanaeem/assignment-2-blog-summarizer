"use client";

import { useState } from 'react';
import axios from 'axios';
// types.ts (or at the top of your file)
type SummaryResponse = {
  summary: string;
  summaryUrdu: string;
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  type SummarizeResponse = {
    summary: string;
    summaryUrdu: string;
  };

  const res = await axios.post<SummarizeResponse>('/api/summarize', { url });
const data = res.data as SummaryResponse;
  setSummary(data.summary);
  setSummaryUrdu(data.summaryUrdu);
}



  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Summariser</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Summarise
        </button>
      </form>

      {summary && (
        <div className="mt-6">
          <h2 className="font-semibold">English Summary</h2>
          <p>{summary}</p>

          <h2 className="font-semibold mt-4">Urdu Translation</h2>
          <p>{summaryUrdu}</p>
        </div>
      )}
    </main>
  );
}
