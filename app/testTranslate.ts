import { translateToUrdu } from '../lib/translator';

(async () => {
  const translated = await translateToUrdu("This is a test blog summary.");
  console.log("Translated:", translated);
})();
