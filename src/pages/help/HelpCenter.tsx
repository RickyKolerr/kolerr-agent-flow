
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Search, FileText, Database } from "lucide-react";
import { Input } from "@/components/ui/input";

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      icon: FileText,
      topics: [
        "Platform Overview",
        "Account Setup",
        "Creating Your First Campaign",
        "Finding KOLs"
      ]
    },
    {
      title: "Campaign Management",
      icon: Database,
      topics: [
        "Campaign Setup",
        "KOL Selection",
        "Performance Tracking",
        "Payment Processing"
      ]
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      topics: [
        "Common Issues",
        "Account Access",
        "Technical Support",
        "FAQs"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to your questions about using Kolerr
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:border-brand-pink/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-brand-pink/10">
                    <category.icon className="w-5 h-5 text-brand-pink" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.topics.map((topic, i) => (
                    <li key={i}>
                      <button className="text-muted-foreground hover:text-brand-pink text-left w-full">
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is available 24/7 to assist you with any questions
              </p>
              <button className="bg-brand-pink hover:bg-brand-pink/90 text-white px-6 py-2 rounded-full">
                Contact Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;
