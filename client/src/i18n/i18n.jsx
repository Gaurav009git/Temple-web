import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import mr from "./locales/mr.json";
import hi from "./locales/hi.json";

// Read saved language from localStorage (default: English)
const savedLang = localStorage.getItem("appLang") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mr: { translation: mr },
      hi: { translation: hi },
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language choice
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("appLang", lng);
});

export default i18n;