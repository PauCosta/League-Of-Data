import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import traduccioCA from './traduccio/catala.js';
import traduccioEN from './traduccio/english.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ca: { translation: traduccioCA },
      en: { translation: traduccioEN },
    },
    lng: 'ca', //Idioma per defecte
    fallbackLng: 'ca',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

