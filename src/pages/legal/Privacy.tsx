import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Lock, UserCheck, Database } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <Info className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">{t('legal.privacy.title')}</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Last updated: April 25, 2025
        </p>
        
        <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Privacy Commitment</h2>
          <p className="text-muted-foreground">
            {t('legal.privacy.description')}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-brand-pink" />
              {t('legal.privacy.dataCollection')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              {t('legal.privacy.dataCollectionDesc')}
            </p>
            
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Information We Collect:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-muted-foreground">Account information (name, email, password)</li>
                <li className="text-muted-foreground">Profile information (professional history, portfolio)</li>
                <li className="text-muted-foreground">Transaction information (payment methods, billing details)</li>
                <li className="text-muted-foreground">Usage data (interactions with the platform, content preferences)</li>
                <li className="text-muted-foreground">Communications (customer support inquiries, feedback)</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Automatic Data Collection</h4>
              <p className="text-muted-foreground">
                When you use our platform, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and cookies. Additionally, as you browse the platform, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the platform, and information about how you interact with the platform.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-brand-pink" />
              {t('legal.privacy.dataUsage')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              {t('legal.privacy.dataUsageDesc')}
            </p>
            
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">How We Use Your Information:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-muted-foreground">Facilitate creator-brand connections and campaign collaborations</li>
                <li className="text-muted-foreground">Process payments and provide transaction confirmations</li>
                <li className="text-muted-foreground">Personalize your experience and deliver content and product offerings</li>
                <li className="text-muted-foreground">Improve our website and enhance user experience</li>
                <li className="text-muted-foreground">Communicate with you about updates, security alerts, and support</li>
              </ul>
            </div>
            
            <div className="bg-black/20 p-4 rounded-md mt-6">
              <h4 className="text-lg font-medium mb-2">Third-Party Disclosure</h4>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as necessary to provide our services (such as payment processing, cloud storage, and analytics).
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-brand-pink" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              We implement security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. We use secure encryption protocols, regular security assessments, and strict access controls.
            </p>
            
            <p className="text-muted-foreground mt-4">
              Despite our efforts, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Your Data Rights</h4>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Information directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For any questions regarding our Privacy Policy or to submit a data request, please contact our Data Protection Officer at:
          </p>
          <Button variant="outline">
            privacy@kolerr.ai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
