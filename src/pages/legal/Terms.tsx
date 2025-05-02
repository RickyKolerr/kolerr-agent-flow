
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <FileText className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">{t('legal.terms.title')}</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Last updated: April 25, 2025
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-pink" />
              {t('legal.terms.accountTerms')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              By creating an account on Kolerr, you agree to these Terms of Service. You are responsible for maintaining the security of your account and password. Kolerr cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
            </p>
            
            <p className="text-muted-foreground">
              You are responsible for all content posted and activity that occurs under your account. You may not use the Service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.
            </p>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Account Termination</h4>
              <p className="text-muted-foreground">
                Kolerr, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of the Service for any reason at any time. Such termination of the Service will result in the deactivation or deletion of your Account or your access to your Account.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-pink" />
              {t('legal.terms.serviceTerms')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Kolerr reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. Kolerr shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
            </p>
            
            <p className="text-muted-foreground mt-4">
              Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis without any warranty or condition, express, implied or statutory.
            </p>
            
            <div className="bg-black/20 p-4 rounded-md mt-6">
              <h4 className="text-lg font-medium mb-2">Fair Usage Policy</h4>
              <p className="text-muted-foreground">
                To ensure optimal platform performance for all users, Kolerr implements fair usage limitations. Excessive API calls, automated scraping, or activities that negatively impact platform performance may result in temporary restrictions.
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Intellectual Property Rights</h4>
              <p className="text-muted-foreground">
                The Service and its original content, features, and functionality are owned by Kolerr and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of United States, without regard to its conflict of law provisions.
            </p>
            
            <p className="text-muted-foreground mt-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For any questions regarding our Terms of Service, please contact us at:
          </p>
          <Button variant="outline">
            legal@kolerr.ai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
