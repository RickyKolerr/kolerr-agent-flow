
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const CompliancePage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('legal.compliance.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              {t('legal.compliance.description')}
            </p>
            
            <h3 className="text-xl font-semibold mt-6">{t('legal.compliance.standards')}</h3>
            <p className="text-muted-foreground">
              {t('legal.compliance.standardsDesc')}
            </p>

            <h3 className="text-xl font-semibold mt-6">{t('legal.compliance.dataHandling')}</h3>
            <p className="text-muted-foreground">
              {t('legal.compliance.dataHandlingDesc')}
            </p>

            <h3 className="text-xl font-semibold mt-6">{t('legal.compliance.certifications')}</h3>
            <p className="text-muted-foreground">
              {t('legal.compliance.certificationsDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompliancePage;
