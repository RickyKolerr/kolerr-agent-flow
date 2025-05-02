
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const SecurityPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('legal.security.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              {t('legal.security.description')}
            </p>
            
            <h3 className="text-xl font-semibold mt-6">{t('legal.security.dataProtection')}</h3>
            <p className="text-muted-foreground">
              {t('legal.security.dataProtectionDesc')}
            </p>

            <h3 className="text-xl font-semibold mt-6">{t('legal.security.compliance')}</h3>
            <p className="text-muted-foreground">
              {t('legal.security.complianceDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;
