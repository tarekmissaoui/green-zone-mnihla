import { createContext, useContext, useMemo, useState } from "react";

const translations = {
  fr: {
    home: "Accueil",
    shop: "Boutique",
    admin: "Admin",
    cart: "Panier",
    search: "Rechercher",
    welcome: "Votre reference premium pour le jardinage, l'agricole et l'animalerie.",
  },
  en: {
    home: "Home",
    shop: "Shop",
    admin: "Admin",
    cart: "Cart",
    search: "Search",
    welcome: "Your premium destination for gardening, agriculture and pet supplies.",
  },
  ar: {
    home: "الرئيسية",
    shop: "المتجر",
    admin: "الادارة",
    cart: "السلة",
    search: "بحث",
    welcome: "وجهتكم المميزة لمستلزمات الفلاحة والحدائق والحيوانات.",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] ?? translations.fr }),
    [lang]
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
