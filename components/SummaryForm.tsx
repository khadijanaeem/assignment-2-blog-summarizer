'use client';
import { useState } from 'react';

export default function SummaryForm() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);

  const submit = async () => {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-4">
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter blog URL" className="border p-2 w-full mb-2" />
      <button onClick={submit} className="bg-blue-500 text-white px-4 py-2 rounded">Summarize</button>
      {result && (
        <div className="mt-4">
          <h2>Summary:</h2>
          <p>{result.summary}</p>
          <h2 className="mt-2">Urdu:</h2>
          <p>{result.urdu}</p>
        </div>
      )}
    </div>
  );
}
