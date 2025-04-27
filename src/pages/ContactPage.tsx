
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground">
              Get in touch with our team. We're here to help you succeed with your influencer marketing campaigns.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Support</h3>
            <p className="text-muted-foreground">
              Email: support@kolerr.com<br />
              Phone: +1 (555) 123-4567<br />
              Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>

            <h3 className="text-xl font-semibold mt-6">Business Inquiries</h3>
            <p className="text-muted-foreground">
              For partnership opportunities and business inquiries:<br />
              Email: business@kolerr.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
