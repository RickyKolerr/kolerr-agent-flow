
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Learn about our commitment to protecting your data and maintaining the security of our platform.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Data Protection</h3>
            <p className="text-muted-foreground">
              We employ industry-standard encryption and security measures to protect your sensitive information.
            </p>

            <h3 className="text-xl font-semibold mt-6">Compliance</h3>
            <p className="text-muted-foreground">
              Our platform adheres to global security standards and data protection regulations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityPage;
