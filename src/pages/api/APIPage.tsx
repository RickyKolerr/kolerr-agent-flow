
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, FileCode, CheckCircle, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const APIPage = () => {
  const { t } = useLanguage();
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };
  
  const apiEndpoints = [
    {
      id: "creators",
      name: "Creators",
      description: "Access and filter the creator database",
      methods: [
        {
          method: "GET",
          endpoint: "/api/v1/creators",
          description: "List creators with optional filtering parameters",
          parameters: [
            { name: "page", type: "integer", required: false, description: "Page number for pagination" },
            { name: "limit", type: "integer", required: false, description: "Number of results per page" },
            { name: "niche", type: "string", required: false, description: "Filter by content niche" },
            { name: "followers_min", type: "integer", required: false, description: "Minimum follower count" }
          ]
        },
        {
          method: "GET",
          endpoint: "/api/v1/creators/{id}",
          description: "Get detailed information about a specific creator",
          parameters: [
            { name: "id", type: "string", required: true, description: "Creator unique identifier" }
          ]
        }
      ]
    },
    {
      id: "campaigns",
      name: "Campaigns",
      description: "Manage influencer marketing campaigns",
      methods: [
        {
          method: "POST",
          endpoint: "/api/v1/campaigns",
          description: "Create a new campaign",
          parameters: [
            { name: "name", type: "string", required: true, description: "Campaign name" },
            { name: "budget", type: "number", required: true, description: "Campaign budget" },
            { name: "start_date", type: "string", required: true, description: "Campaign start date" }
          ]
        }
      ]
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Access campaign performance data",
      methods: [
        {
          method: "GET",
          endpoint: "/api/v1/analytics/campaigns/{id}",
          description: "Get performance metrics for a specific campaign",
          parameters: [
            { name: "id", type: "string", required: true, description: "Campaign unique identifier" },
            { name: "period", type: "string", required: false, description: "Time period" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Integrate Kolerr's powerful influencer marketing capabilities into your applications
            </p>
          </div>
          
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=400" 
              alt="API Documentation" 
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
            
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
                  <p className="text-muted-foreground mb-4">
                    The Kolerr API allows you to programmatically access creator data, manage campaigns, and retrieve analytics. 
                    This RESTful API uses standard HTTP response codes and returns data in JSON format.
                  </p>
                  
                  <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-4 mt-6 flex gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">Base URL</h3>
                      <p className="text-sm text-muted-foreground">All API requests should be made to:</p>
                      <code className="bg-black/20 p-2 rounded block mt-2">https://api.kolerr.com/v1</code>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4">Authentication</h3>
                  <p className="text-muted-foreground mb-4">
                    All API endpoints require authentication using API keys. You can generate and manage your API keys in the 
                    <a href="/dashboard/settings" className="text-brand-pink hover:text-brand-pink/80"> dashboard settings</a>.
                  </p>
                  
                  <div className="bg-black/20 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <span className="text-gray-400">Authorization:</span> Bearer YOUR_API_KEY
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">API Reference</h2>
          
          <Tabs defaultValue={apiEndpoints[0].id} className="w-full">
            <TabsList className="mb-8">
              {apiEndpoints.map(endpoint => (
                <TabsTrigger key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {apiEndpoints.map(endpoint => (
              <TabsContent key={endpoint.id} value={endpoint.id}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-brand-pink" />
                      {endpoint.name}
                    </CardTitle>
                    <CardDescription>
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {endpoint.methods.map((method, methodIndex) => (
                        <div key={methodIndex} className="border border-muted rounded-md overflow-hidden">
                          <div className="bg-black/20 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Badge variant={method.method === "GET" ? "outline" : "default"} className={method.method === "GET" ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/20" : ""}>
                                {method.method}
                              </Badge>
                              <code className="text-sm">{method.endpoint}</code>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-xs"
                              onClick={() => copyToClipboard(`https://api.kolerr.com/v1${method.endpoint}`, method.endpoint)}
                            >
                              {copiedEndpoint === method.endpoint ? (
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 mr-1" />
                              )}
                              {copiedEndpoint === method.endpoint ? "Copied" : "Copy"}
                            </Button>
                          </div>
                          
                          <div className="p-4">
                            <p className="text-muted-foreground mb-4">{method.description}</p>
                            
                            {method.parameters.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-medium mb-2">Parameters</h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-border text-sm">
                                    <thead>
                                      <tr>
                                        <th className="px-4 py-2 text-left font-medium">Name</th>
                                        <th className="px-4 py-2 text-left font-medium">Type</th>
                                        <th className="px-4 py-2 text-left font-medium">Required</th>
                                        <th className="px-4 py-2 text-left font-medium">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                      {method.parameters.map((param, paramIndex) => (
                                        <tr key={paramIndex}>
                                          <td className="px-4 py-2 font-mono text-xs">{param.name}</td>
                                          <td className="px-4 py-2 font-mono text-xs">{param.type}</td>
                                          <td className="px-4 py-2">
                                            {param.required ? (
                                              <Badge variant="outline" className="bg-brand-pink/20 text-brand-pink hover:bg-brand-pink/20">
                                                Required
                                              </Badge>
                                            ) : (
                                              <Badge variant="outline" className="bg-black/20 hover:bg-black/20">
                                                Optional
                                              </Badge>
                                            )}
                                          </td>
                                          <td className="px-4 py-2 text-xs text-muted-foreground">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>SDKs & Libraries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="border border-brand-pink/20 bg-brand-pink/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">JavaScript</h3>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">npm install kolerr-js</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">Python</h3>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">pip install kolerr</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-1">Ruby</h3>
                      <code className="bg-black/20 px-2 py-1 rounded text-xs">gem install kolerr</code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default APIPage;
