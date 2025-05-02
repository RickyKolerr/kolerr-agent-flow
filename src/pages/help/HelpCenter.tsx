
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchTutorial } from "@/components/docs/SearchTutorial";
import { CreditFAQ } from "@/components/docs/CreditFAQ";
import { SearchTips } from "@/components/docs/SearchTips";
import { FeatureComparison } from "@/components/docs/FeatureComparison";
import { useLanguage } from "@/contexts/LanguageContext";

const HelpCenter = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('help.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('help.description')}
          </p>
          
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t('help.searchPlaceholder')}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="space-y-8">
          <SearchTutorial />
          <CreditFAQ />
          <SearchTips />
          <FeatureComparison />
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
