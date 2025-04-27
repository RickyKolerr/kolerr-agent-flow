
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages } from "lucide-react";
import { LanguageToggle } from "../LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguagePreferences = () => {
  const { t } = useLanguage();
  
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
          <LanguageToggle />
        </div>
      </CardContent>
    </Card>
  );
};
