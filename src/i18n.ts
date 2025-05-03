
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations (we'll use our existing translations)
import enTranslations from './translations/en';
import viTranslations from './translations/vi';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    resources: {
      en: {
        translation: enTranslations
      },
      vi: {
        translation: viTranslations
      }
    }
  });

export default i18n;
