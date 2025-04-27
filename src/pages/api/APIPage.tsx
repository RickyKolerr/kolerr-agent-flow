
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Database, FileJson } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const APIPage = () => {
  const endpoints = [
    {
      category: "Campaigns",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/campaigns",
          description: "List all campaigns"
        },
        {
          method: "POST",
          path: "/api/v1/campaigns",
          description: "Create a new campaign"
        }
      ]
    },
    {
      category: "KOLs",
      endpoints: [
        {
          method: "GET",
          path: "/api/v1/kols",
          description: "Search and filter KOLs"
        },
        {
          method: "GET",
          path: "/api/v1/kols/{id}/analytics",
          description: "Get KOL performance metrics"
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">API Reference</h1>
          <p className="text-xl text-muted-foreground">
            Integrate Kolerr's powerful features directly into your applications
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <div className="flex items-center gap-3 mb-6">
                    <FileJson className="w-6 h-6 text-brand-pink" />
                    <h2 className="text-2xl font-semibold m-0">Getting Started</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    The Kolerr API is organized around REST. Our API accepts JSON-encoded request bodies,
                    returns JSON-encoded responses, and uses standard HTTP response codes and authentication.
                  </p>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm">
                    Base URL: https://api.kolerr.com/v1
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication">
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-brand-pink" />
                    <h2 className="text-2xl font-semibold m-0">Authentication</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Kolerr uses API keys to authenticate requests. You can manage your API keys from your dashboard.
                  </p>
                  <div className="bg-muted rounded-md p-4 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints">
            <div className="space-y-6">
              {endpoints.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.endpoints.map((endpoint, i) => (
                        <div key={i} className="border rounded-md p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              endpoint.method === 'GET' ? 'bg-brand-pink/10 text-brand-pink' : 
                              'bg-accent/10 text-accent'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm">{endpoint.path}</code>
                          </div>
                          <p className="text-muted-foreground text-sm">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIPage;
