import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "eg_lang";

function readInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(() => {
    const dict = translations[language] || translations.en;
    const fallbackDict = translations.en;

    function t(path) {
      const parts = path.split(".");
      let node = dict;
      for (const part of parts) {
        node = node?.[part];
      }
      if (node !== undefined) return node;

      // fall back to English so a missing key never renders blank
      let fallbackNode = fallbackDict;
      for (const part of parts) {
        fallbackNode = fallbackNode?.[part];
      }
      return fallbackNode ?? path;
    }

    return {
      language,
      isArabic: language === "ar",
      dir: language === "ar" ? "rtl" : "ltr",
      setLanguage,
      toggleLanguage: () => setLanguage((l) => (l === "ar" ? "en" : "ar")),
      t,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
