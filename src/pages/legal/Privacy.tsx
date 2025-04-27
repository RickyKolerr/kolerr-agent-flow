
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('legal.privacy.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              {t('legal.privacy.description')}
            </p>
            
            <h3 className="text-xl font-semibold mt-6">{t('legal.privacy.dataCollection')}</h3>
            <p className="text-muted-foreground">
              {t('legal.privacy.dataCollectionDesc')}
            </p>

            <h3 className="text-xl font-semibold mt-6">{t('legal.privacy.dataUsage')}</h3>
            <p className="text-muted-foreground">
              {t('legal.privacy.dataUsageDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPage;
