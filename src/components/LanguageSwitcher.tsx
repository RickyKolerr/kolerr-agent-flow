
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    // Toggle between 'en' and 'vi'
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-sm hover:text-brand-pink transition-colors"
      onClick={toggleLanguage}
    >
      <Languages className="h-5 w-5 mr-1" />
      <span className="sr-only md:not-sr-only md:ml-2">{i18n.language === 'en' ? 'VI' : 'EN'}</span>
    </Button>
  );
}
