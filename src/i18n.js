import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';


/* import en from './locales/en/main.json';
import ro from './locales/ro/main.json';
 */
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
/*     supportedLngs: ['en', 'ro'],
    fallbackLng: 'en',
    ns: ['common', 'profile', 'main'],
    defaultNS: 'common',
    debug: true,
      interpolation: {
      escapeValue: false,
    },

    resources: {
      ro: {
        main: ro,
        profile: ro
      },
      en: {
        main: en,
        profile: en
      },
    },
 */

    lng: 'en',
    ns: ['main', 'profile'],

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;