
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export const LanguagePreferences = () => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          {t('settings.language')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {t('settings.changeLanguage')}
          </span>
          <LanguageSwitcher />
        </div>
      </CardContent>
    </Card>
  );
};
