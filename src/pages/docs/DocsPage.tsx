
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Book, Database, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DocsPage = () => {
  const gettingStartedGuides = [
    {
      title: "Platform Overview",
      description: "Learn about Kolerr's core features and capabilities",
      icon: Book
    },
    {
      title: "Campaign Creation",
      description: "Step-by-step guide to launching your first campaign",
      icon: FileText
    },
    {
      title: "KOL Discovery",
      description: "How to find and connect with the right influencers",
      icon: Search
    },
    {
      title: "Analytics Dashboard",
      description: "Understanding your campaign performance metrics",
      icon: Database
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about using Kolerr's platform
          </p>
        </div>

        <Tabs defaultValue="guides" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guides">Getting Started</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="reference">API Reference</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 gap-6">
              {gettingStartedGuides.map((guide, index) => (
                <Card key={index} className="hover:border-brand-pink/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-brand-pink/10">
                        <guide.icon className="w-5 h-5 text-brand-pink" />
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{guide.description}</p>
                  </CardHeader>
                  <CardContent>
                    <button className="text-brand-pink hover:text-brand-pink/80 text-sm font-medium">
                      Read documentation →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-2xl font-semibold mb-4">Video Tutorials</h3>
                  <p className="text-muted-foreground">
                    Step-by-step video guides to help you master Kolerr's features:
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-pink" />
                      <span>Setting up your first campaign</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-pink" />
                      <span>Advanced KOL filtering techniques</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-pink" />
                      <span>Analytics and reporting deep dive</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reference">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-2xl font-semibold mb-4">API Documentation</h3>
                  <p className="text-muted-foreground">
                    Comprehensive API reference for integrating Kolerr into your applications.
                  </p>
                  <div className="mt-4">
                    <a href="/api" className="text-brand-pink hover:text-brand-pink/80">
                      View full API documentation →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocsPage;
