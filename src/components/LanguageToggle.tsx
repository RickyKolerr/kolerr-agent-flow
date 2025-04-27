
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    // Toggle between 'en' and 'vi'
    const newLanguage = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-sm hover:text-brand-pink transition-colors"
      onClick={toggleLanguage}
      title={language === 'en' ? t('language.vi') : t('language.en')}
    >
      <Languages className="h-5 w-5 mr-1" />
      <span className="sr-only md:not-sr-only md:ml-2">{language === 'en' ? 'VI' : 'EN'}</span>
    </Button>
  );
}
