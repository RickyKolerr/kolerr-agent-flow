
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const APIPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Integrate Kolerr's powerful features directly into your applications with our comprehensive API.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Authentication</h3>
            <p className="text-muted-foreground">
              Learn how to authenticate your API requests and manage API keys securely.
            </p>

            <h3 className="text-xl font-semibold mt-6">Endpoints</h3>
            <p className="text-muted-foreground">
              Explore our RESTful API endpoints for managing campaigns, KOLs, and analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIPage;
