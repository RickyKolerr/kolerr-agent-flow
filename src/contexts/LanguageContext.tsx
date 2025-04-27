
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get the initial language from localStorage or use English as default
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    setLanguageState(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Set the html lang attribute on initial load
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  // Translation function that gets the string from the appropriate language file
  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} in language ${language}`);
          return key;
        }
      }
      
      if (typeof value === 'string') {
        return value;
      } else {
        console.warn(`Translation value is not a string: ${key} in language ${language}`);
        return key;
      }
    } catch (error) {
      console.error(`Error translating key: ${key}`, error);
      return key;
    }
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

// Import translations
import en from '../translations/en';
import vi from '../translations/vi';

const translations = {
  en,
  vi,
};
