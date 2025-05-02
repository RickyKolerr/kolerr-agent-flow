
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, Globe, Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const CompliancePage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <CheckCircle className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">Compliance</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Last updated: April 30, 2025
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-brand-pink" />
              Global Regulatory Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              At Kolerr, we are committed to adhering to global regulations and standards that govern data privacy, digital marketing, and influencer relationships. Our platform is designed to maintain compliance with various regional and international legal frameworks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-secondary/50 p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">GDPR Compliance</h4>
                <p className="text-muted-foreground text-sm">
                  Our platform adheres to the European Union's General Data Protection Regulation (GDPR), ensuring proper data processing, user consent mechanisms, and data subject rights.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">CCPA Compliance</h4>
                <p className="text-muted-foreground text-sm">
                  We respect the California Consumer Privacy Act (CCPA) requirements, providing California residents with specific rights regarding their personal information.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">FTC Guidelines</h4>
                <p className="text-muted-foreground text-sm">
                  All campaign templates and influencer contracts include Federal Trade Commission (FTC) disclosure requirements for transparent sponsored content.
                </p>
              </div>
              
              <div className="bg-secondary/50 p-4 rounded-md">
                <h4 className="text-lg font-medium mb-2">ASA Standards</h4>
                <p className="text-muted-foreground text-sm">
                  Our UK campaigns follow the Advertising Standards Authority (ASA) guidelines for influencer marketing and sponsored content disclosure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-pink" />
              Documentation & Record Keeping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Our platform automatically maintains records required for regulatory compliance, ensuring both brands and creators can easily demonstrate adherence to relevant laws and regulations.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Campaign Documentation</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    All campaigns on Kolerr include:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Detailed terms and conditions</li>
                    <li>Required disclosures based on jurisdiction</li>
                    <li>Payment terms and deliverable specifications</li>
                    <li>Content approval workflows with timestamped records</li>
                    <li>Performance metrics and engagement data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Contract Compliance</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    Our digital contract system ensures:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Legally binding e-signatures</li>
                    <li>Immutable contract records</li>
                    <li>Automated reminder systems for deliverables</li>
                    <li>Clear disclosure requirements for sponsored content</li>
                    <li>Proper tax documentation collection</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Data Retention Policies</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-2">
                    We maintain comprehensive data retention policies that:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Follow region-specific retention requirements</li>
                    <li>Provide data export capabilities for users</li>
                    <li>Include secure data deletion processes</li>
                    <li>Support legal hold procedures when necessary</li>
                    <li>Allow configuration of custom retention periods</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-brand-pink" />
              Industry Standards & Self-Regulation
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Beyond legal compliance, Kolerr adheres to industry best practices and self-regulatory frameworks to maintain the highest ethical standards in influencer marketing.
            </p>
            
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2">IAB Guidelines</h4>
                <p className="text-muted-foreground">
                  We implement the Interactive Advertising Bureau's guidelines for social media marketing, ensuring transparency and ethical advertising practices.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Platform-Specific Requirements</h4>
                <p className="text-muted-foreground">
                  Our campaign tools are updated regularly to comply with the latest requirements from social media platforms like Instagram, TikTok, and YouTube for branded content and sponsorship disclosure.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Ethical Marketing Pledge</h4>
                <p className="text-muted-foreground">
                  All users of Kolerr agree to our Ethical Marketing Pledge, which prohibits misleading claims, requires transparency, and promotes honest engagement practices.
                </p>
              </div>
            </div>
            
            <div className="bg-brand-pink/10 p-4 rounded-md mt-6 border border-brand-pink/20">
              <h4 className="text-lg font-medium mb-2 text-brand-pink">Compliance Assistance</h4>
              <p className="text-muted-foreground">
                Our platform includes built-in compliance tools to help both brands and creators navigate regulatory requirements:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-2">
                <li>Automated disclosure reminders</li>
                <li>Region-specific compliance templates</li>
                <li>Content review checklists</li>
                <li>Tax documentation management</li>
                <li>Regulatory update notifications</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For compliance-related inquiries or to request our detailed compliance documentation, please contact:
          </p>
          <Button variant="outline">
            compliance@kolerr.ai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;
