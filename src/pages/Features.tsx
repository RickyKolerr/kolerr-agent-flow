
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Contact, Users, CreditCard, Calendar, Search, Star, ShieldCheck } from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered KOL Search",
      description: "Find the perfect TikTok creators with our advanced AI matching algorithm. Filter by niche, audience demographics, and performance metrics."
    },
    {
      icon: Star,
      title: "Performance Analytics",
      description: "Comprehensive analytics dashboard with real-time ROI tracking, engagement metrics, and audience insights."
    },
    {
      icon: Calendar,
      title: "Smart Campaign Scheduling",
      description: "Automated content calendar and posting schedule optimization to maximize reach and engagement."
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Protected transactions with escrow services and automated payment processing for all parties."
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated agreement generation with customizable templates and e-signature integration."
    },
    {
      icon: Users,
      title: "Creator Relationship Management",
      description: "Build and maintain lasting partnerships with top creators through our CRM tools."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-pink to-brand-orange bg-clip-text text-transparent">
          Platform Features
        </h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to run successful influencer marketing campaigns
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-border/50 hover:border-border/100 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-pink/10">
                  <feature.icon className="w-5 h-5 text-brand-pink" />
                </div>
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
