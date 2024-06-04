import i18n from "i18next";
import ArabicWords from "./languages/ArabicWords.json"
import EnglishWords from "./languages/EnglishWords.json"
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources:{
      en:{
        translation: EnglishWords
      },
      ar:{
       translation: ArabicWords 
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
});

export default i18n;