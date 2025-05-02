
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('legal.terms.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              {t('legal.terms.description')}
            </p>
            
            <h3 className="text-xl font-semibold mt-6">{t('legal.terms.accountTerms')}</h3>
            <p className="text-muted-foreground">
              {t('legal.terms.accountTermsDesc')}
            </p>

            <h3 className="text-xl font-semibold mt-6">{t('legal.terms.serviceTerms')}</h3>
            <p className="text-muted-foreground">
              {t('legal.terms.serviceTermsDesc')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
