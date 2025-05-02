
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SecurityPage = () => {
  const { t } = useLanguage();

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "All sensitive data and communications are encrypted using industry-standard protocols."
    },
    {
      title: "Two-Factor Authentication",
      description: "Extra security layer for account access using email or authenticator apps."
    },
    {
      title: "Regular Security Audits",
      description: "Continuous monitoring and third-party penetration testing to identify vulnerabilities."
    },
    {
      title: "Data Backups",
      description: "Automated backup procedures with secure off-site storage."
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <Shield className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">{t('legal.security.title')}</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8">
          {t('legal.security.description')}
        </p>
        
        <Alert className="mb-8 bg-brand-pink/5 border-brand-pink/20">
          <CheckCircle className="h-5 w-5 text-brand-pink" />
          <AlertTitle>Security Commitment</AlertTitle>
          <AlertDescription>
            Kolerr is committed to protecting your data with enterprise-grade security measures and continuous monitoring.
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/20 mt-1">
                    <Lock className="h-4 w-4 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-pink" />
              {t('legal.security.dataProtection')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              We employ industry-standard security practices to protect your data, including:
            </p>
            
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-brand-pink mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">256-bit SSL encryption for all data transfers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-brand-pink mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">Data stored in secure, SOC 2 compliant data centers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-brand-pink mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">Regular security assessments and penetration testing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-brand-pink mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">Strict access controls and role-based permissions</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Data Breach Protocol</h3>
              <p className="text-muted-foreground">
                In the unlikely event of a data breach, we have comprehensive procedures in place to:
              </p>
              <ul className="mt-2 space-y-1">
                <li className="text-muted-foreground">• Identify and isolate the breach source</li>
                <li className="text-muted-foreground">• Assess the impact and affected data</li>
                <li className="text-muted-foreground">• Notify affected users within 72 hours</li>
                <li className="text-muted-foreground">• Work with cybersecurity experts to prevent future incidents</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-pink" />
              {t('legal.security.compliance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Kolerr maintains compliance with international security standards and regulations, including:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-black/20 p-3 rounded-md text-center">
                <p className="font-medium">GDPR</p>
                <p className="text-xs text-muted-foreground">EU Data Protection</p>
              </div>
              <div className="bg-black/20 p-3 rounded-md text-center">
                <p className="font-medium">ISO 27001</p>
                <p className="text-xs text-muted-foreground">Information Security</p>
              </div>
              <div className="bg-black/20 p-3 rounded-md text-center">
                <p className="font-medium">CCPA</p>
                <p className="text-xs text-muted-foreground">California Privacy</p>
              </div>
              <div className="bg-black/20 p-3 rounded-md text-center">
                <p className="font-medium">SOC 2</p>
                <p className="text-xs text-muted-foreground">Service Organization</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-6">
              Our security team continuously monitors evolving security standards and updates our protocols accordingly to ensure that your data remains protected against emerging threats.
            </p>
          </CardContent>
        </Card>
        
        <div className="mt-8 p-6 bg-black/20 rounded-lg text-center">
          <h3 className="text-xl font-medium mb-2">Report a Security Concern</h3>
          <p className="text-muted-foreground mb-4">
            If you discover a potential security vulnerability, please report it immediately to our security team.
          </p>
          <p className="font-medium">security@kolerr.ai</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
