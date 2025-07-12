// import axios from 'axios';

// type LibreTranslateResponse = {
//   translatedText: string;
// };

// export async function translateToUrdu(text: string): Promise<string> {
//   try {
//    const res = await axios.post<LibreTranslateResponse>(
//   'https://translate.argosopentech.com/translate',
//   {
//     q: text,
//     source: 'en',
//     target: 'ur',
//     format: 'text'
//   },
//   {
//     headers: { 'Content-Type': 'application/json' },
//     timeout: 10000 // 10 seconds
//   }
// );
// if (!res.data?.translatedText) {
//       console.error('No translatedText in response:', res.data);
//       return 'ترجمہ دستیاب نہیں ہے'; // fallback
//     }

//     return res.data.translatedText;
//   } catch (err: any) {
//     console.error('Translation error:', err.message || err);
//     if (err.response) {
//       console.error('Response data:', err.response.data);
//     }
//     return 'ترجمہ دستیاب نہیں ہے'; // fallback message
//   }
// // }
// import translate from '@vitalets/google-translate-api';

// export async function translateToUrdu(text: string): Promise<string> {
//   try {
//     const res = await translate(text, { to: 'ur' });
//     return res.text;
//   } catch (err) {
//     console.error('Translation error:', err);
//     return 'ترجمہ دستیاب نہیں ہے';
//   }
// }
import axios from 'axios';

type LingvaResponse = {
  translation: string;
};

export async function translateToUrdu(text: string): Promise<string> {
  try {
    const res = await axios.get<LingvaResponse>(
      'https://lingva.ml/api/v1/en/ur/' + encodeURIComponent(text),
      { timeout: 10000 }
    );
    return res.data.translation;
  } catch (err) {
    console.error('Lingva translation error:', err);
    return 'ترجمہ دستیاب نہیں ہے';
  }
}
