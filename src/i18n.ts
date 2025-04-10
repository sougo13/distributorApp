import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";


import enTranslations from "./locales/en.json";
import kaTranslations from "./locales/ka.json";

export const defaultNS = "translation"; 

export const resources = {
  en: {
    translation: enTranslations, 
  },
  ka: {
    translation: kaTranslations, 
  },
} as const;

const LANG_CODES = Object.keys(resources);

const ASYNC_STORAGE_LANG_KEY = "user-language";


const languageDetector = {
  type: "languageDetector" as const, 
  async: true, 
  detect: async (callback: (lang: string) => void) => {
    try {

      const savedLang = await AsyncStorage.getItem(ASYNC_STORAGE_LANG_KEY);
      if (savedLang && LANG_CODES.includes(savedLang)) {
        console.log("i18n: Loaded language from AsyncStorage:", savedLang);
        callback(savedLang);
        return;
      }


      const deviceLang = Localization.locale.split("-")[0]; 
      if (LANG_CODES.includes(deviceLang)) {
        console.log("i18n: Detected device language:", deviceLang);
        callback(deviceLang);
      } else {

        console.log(
          "i18n: Device language not supported, falling back to 'en'"
        );
        callback("en");
      }
    } catch (error) {
      console.error("i18n: Error detecting language:", error);

      callback("en");
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {

      await AsyncStorage.setItem(ASYNC_STORAGE_LANG_KEY, language);
      console.log("i18n: Saved language to AsyncStorage:", language);
    } catch (error) {
      console.error("i18n: Error saving language:", error);
    }
  },
};

i18n
  .use(languageDetector) 
  .use(initReactI18next) 
  .init({

    defaultNS,
    resources,
    react: {
      useSuspense: false, 
    },
    interpolation: {
      escapeValue: false, 
    },
    fallbackLng: "en", 
    ns: ["translation"], 
  });

export default i18n;
