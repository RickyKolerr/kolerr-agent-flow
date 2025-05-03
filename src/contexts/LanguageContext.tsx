
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n, t: translate } = useTranslation();
  
  // Get the initial language from localStorage or use English as default
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  // Update localStorage and i18n when language changes
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    setLanguageState(newLanguage);
    i18n.changeLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Set the html lang attribute and i18n language on initial load
  useEffect(() => {
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, []);

  // Translation function
  const t = (key: string): string => {
    return translate(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
