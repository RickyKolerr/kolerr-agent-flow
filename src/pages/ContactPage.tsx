
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Clock, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you succeed with your influencer marketing campaigns.
          </p>
        </div>
        
        <Tabs defaultValue="contact" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="message">Send a Message</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid md:grid-cols-2 gap-8">
              {/* US Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-brand-pink" />
                    Our Headquarters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    1349 Sea Grove CT.<br />
                    Gulf Breeze, FL 32563<br />
                    United States
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (810) 351-7299</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Vietnam Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-brand-pink" />
                    Ho Chi Minh City Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    541/24 Huynh Van Banh<br />
                    13 Ward, Phu Nhuan District<br />
                    Ho Chi Minh City, Viet Nam
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+84 938 737-714</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Email Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-brand-pink" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <a href="mailto:hello@kolerr.com" className="text-brand-pink hover:underline">hello@kolerr.com</a>
                    </div>
                    
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <a href="mailto:support@kolerr.com" className="text-brand-pink hover:underline">support@kolerr.com</a>
                    </div>
                    
                    <div>
                      <p className="font-medium">Sales & Partnerships</p>
                      <a href="mailto:sales@kolerr.com" className="text-brand-pink hover:underline">sales@kolerr.com</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-pink" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-muted-foreground">9:00 AM - 5:00 PM PT</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span>Support Response</span>
                      <span className="text-muted-foreground">Within 24 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="message">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-brand-pink" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is your message about?" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you"
                      rows={6}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-muted-foreground mb-6">
            For urgent matters, please call our customer support hotline
          </p>
          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +84 938 737-714
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
