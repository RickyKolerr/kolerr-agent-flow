
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Contact } from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions and automated payment processing for all parties"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated agreement generation and management"
    },
    {
      icon: Contact,
      title: "Campaign Analytics",
      description: "Real-time tracking and performance metrics"
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Platform Features</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <feature.icon className="w-6 h-6 text-brand-pink" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
