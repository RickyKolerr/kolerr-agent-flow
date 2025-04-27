
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground">
              This Privacy Policy outlines how Kolerr collects, uses, and protects your personal information.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Data Collection</h3>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us, including but not limited to 
              your name, email address, and payment information.
            </p>

            <h3 className="text-xl font-semibold mt-6">Data Usage</h3>
            <p className="text-muted-foreground">
              We use your information to provide and improve our services, process payments, 
              and communicate with you about your account and updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPage;
