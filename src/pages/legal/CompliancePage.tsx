
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const CompliancePage = () => {
  const { t } = useLanguage();
  
  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Independent verification of our security controls, processes, and procedures.",
      icon: FileCheck
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management systems.",
      icon: Shield
    },
    {
      name: "GDPR Compliance",
      description: "Full compliance with European data protection regulations.",
      icon: CheckCircle
    },
    {
      name: "CCPA Compliance",
      description: "Adherence to California Consumer Privacy Act requirements.",
      icon: CheckCircle
    }
  ];
  
  const complianceFaqs = [
    {
      question: "How does Kolerr handle data subject requests?",
      answer: "We have established dedicated processes for handling data subject requests (access, rectification, erasure, etc.) within legal timeframes. All requests are tracked, documented, and executed in accordance with applicable privacy laws."
    },
    {
      question: "Is data stored in compliance with international transfer requirements?",
      answer: "Yes, all international data transfers are conducted in compliance with relevant regulations. We utilize EU Standard Contractual Clauses and other appropriate transfer mechanisms as required by GDPR and other privacy laws."
    },
    {
      question: "What measures are in place for processing children's data?",
      answer: "Kolerr implements enhanced protection for any data that may pertain to children, including age verification mechanisms, parental consent flows, and strict data minimization principles in accordance with COPPA and similar regulations."
    },
    {
      question: "How often are compliance audits conducted?",
      answer: "We conduct internal compliance audits quarterly and undergo independent third-party audits annually. Additionally, we perform continuous automated compliance monitoring through specialized tools integrated with our systems."
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <FileCheck className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">{t('legal.compliance.title')}</h1>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8">
          {t('legal.compliance.description')}
        </p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-pink" />
              {t('legal.compliance.standards')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-6">
              {t('legal.compliance.standardsDesc')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex gap-4">
                  <div className="p-2 bg-brand-pink/10 rounded-md h-fit">
                    <cert.icon className="h-5 w-5 text-brand-pink" />
                  </div>
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-pink" />
              {t('legal.compliance.dataHandling')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              {t('legal.compliance.dataHandlingDesc')}
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Data Protection Impact Assessments</h3>
                <p className="text-sm text-muted-foreground">
                  We conduct comprehensive DPIAs for all new features and processes involving personal data to identify and mitigate privacy risks before implementation.
                </p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Vendor Assessment Program</h3>
                <p className="text-sm text-muted-foreground">
                  All third-party service providers undergo thorough security and compliance assessments before integration with our platform to ensure end-to-end compliance.
                </p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Retention and Deletion Policies</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain strict data retention schedules and secure deletion protocols to ensure data is not kept longer than necessary for its intended purpose.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-brand-pink" />
              Compliance FAQ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {complianceFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For detailed compliance documentation or specific inquiries, please contact our compliance team:
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
