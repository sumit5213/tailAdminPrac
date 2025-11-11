import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  // load translation using http -> see /public/locales
  .use(HttpBackend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: "en",
    debug: false, // Set to true for debugging
    
    // languages to support
    supportedLngs: ["en", "hi"],

    // backend options
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    
    // options for language detector
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;