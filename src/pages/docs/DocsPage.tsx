
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocsPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Welcome to the Kolerr documentation. Here you'll find detailed guides and resources
              to help you make the most of our platform.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Getting Started</h3>
            <p className="text-muted-foreground">
              Learn how to set up your account, create your first campaign, and connect with KOLs.
            </p>

            <h3 className="text-xl font-semibold mt-6">API Reference</h3>
            <p className="text-muted-foreground">
              Detailed documentation for integrating Kolerr's APIs into your applications.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocsPage;
