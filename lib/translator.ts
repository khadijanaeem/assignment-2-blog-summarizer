import axios from 'axios';

type LibreTranslateResponse = {
  translatedText: string;
};

export async function translateToUrdu(text: string): Promise<string> {
  try {
    const res = await axios.post<LibreTranslateResponse>('https://libretranslate.de/translate', {
      q: text,
      source: 'en',
      target: 'ur',
      format: 'text'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    return res.data.translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    return 'ترجمہ دستیاب نہیں ہے'; // fallback message
  }
}
