import axios from 'axios';

type LibreTranslateResponse = {
  translatedText: string;
};

export async function translateToUrdu(text: string): Promise<string> {
  try {
   const res = await axios.post<LibreTranslateResponse>(
  'https://translate.argosopentech.com/translate',
  {
    q: text,
    source: 'en',
    target: 'ur',
    format: 'text'
  },
  {
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000 // 10 seconds
  }
);

    return res.data.translatedText;
  } catch (err) {
    const result = await translateToUrdu("Hello, how are you?");
console.log(result); // Should output in Urdu

    console.error('Translation error:', err);
    return 'ترجمہ دستیاب نہیں ہے'; // fallback message
  }
}
