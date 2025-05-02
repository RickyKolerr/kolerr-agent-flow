
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, LockKeyhole, AlertTriangle, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SecurityPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-brand-pink/10">
            <ShieldCheck className="h-6 w-6 text-brand-pink" />
          </div>
          <h1 className="text-3xl font-bold">Security</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Last updated: May 1, 2025
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-brand-pink" />
              Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Kolerr employs industry-standard encryption technologies to protect your data in transit and at rest. All communications between your devices and our servers are encrypted using TLS 1.3, ensuring that your information cannot be intercepted by malicious actors.
            </p>
            
            <p className="text-muted-foreground mt-4">
              We implement multiple layers of security controls, including but not limited to: encrypted databases, secure access protocols, regular security audits, and intrusion detection systems.
            </p>
            
            <div className="bg-blue-500/10 p-4 rounded-md mt-6 border border-blue-500/20">
              <h4 className="text-lg font-medium mb-2 text-blue-600">Data Encryption</h4>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>All personally identifiable information is encrypted</li>
                <li>Payment information is processed through PCI-DSS compliant providers</li>
                <li>Database backups are encrypted with AES-256 encryption</li>
                <li>Multi-factor authentication is available for all accounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-pink" />
              Security Incident Response
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Kolerr has a dedicated security team that continuously monitors our systems for suspicious activity. In the unlikely event of a security breach, we follow a comprehensive incident response plan:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground mt-4">
              <li><strong>Detection and Assessment:</strong> Identify the scope and nature of the incident</li>
              <li><strong>Containment:</strong> Isolate affected systems to prevent further damage</li>
              <li><strong>Notification:</strong> Inform affected users and relevant authorities within 72 hours</li>
              <li><strong>Remediation:</strong> Fix the vulnerability and restore affected services</li>
              <li><strong>Post-incident analysis:</strong> Learn from the incident and improve our defenses</li>
            </ol>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Bug Bounty Program</h4>
              <p className="text-muted-foreground">
                We maintain an active bug bounty program, rewarding security researchers who responsibly disclose vulnerabilities in our systems. This collaborative approach helps us continuously improve our security posture.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-brand-pink" />
              Infrastructure Security
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              Our infrastructure is hosted on enterprise-grade cloud platforms with ISO 27001, SOC 2, and GDPR compliance. We employ a defense-in-depth approach with multiple security layers:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-4">
              <li>Web Application Firewalls (WAF) to filter malicious traffic</li>
              <li>DDoS protection to ensure service availability</li>
              <li>Regular vulnerability scanning and penetration testing</li>
              <li>Automated security updates for all systems</li>
              <li>Network segmentation to limit the impact of potential breaches</li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Third-Party Security Audits</h4>
              <p className="text-muted-foreground">
                We undergo regular third-party security assessments to validate our security controls. These assessments help us identify and address potential vulnerabilities before they can be exploited.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            For any security concerns or to report a vulnerability, please contact our security team at:
          </p>
          <Button variant="outline">
            security@kolerr.ai
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
