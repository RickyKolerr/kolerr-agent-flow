
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Search, Book, FileText, MessageSquare, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchTutorial } from "@/components/docs/SearchTutorial";
import { CreditFAQ } from "@/components/docs/CreditFAQ";
import { SearchTips } from "@/components/docs/SearchTips";
import { FeatureComparison } from "@/components/docs/FeatureComparison";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const { t } = useLanguage();

  const popularTopics = [
    {
      title: "Getting Started with KOL Discovery",
      icon: Book,
      link: "#",
    },
    {
      title: "Campaign Performance Metrics Explained",
      icon: FileText,
      link: "#",
    },
    {
      title: "Billing and Subscription Management",
      icon: FileText,
      link: "#",
    },
    {
      title: "Security Best Practices",
      icon: FileText,
      link: "#",
    }
  ];
  
  const commonFaqs = [
    {
      question: "How do I find the right influencers for my campaign?",
      answer: "Use our advanced search filters to narrow down influencers by audience demographics, engagement rates, content categories, and location. Our AI-powered matching system can also recommend creators based on your specific campaign goals and target audience."
    },
    {
      question: "What metrics are available to track campaign performance?",
      answer: "Kolerr provides comprehensive analytics including reach, impressions, engagement rate, click-through rate, conversions, ROI, and sentiment analysis. You can view these metrics in real-time on your campaign dashboard and export detailed reports."
    },
    {
      question: "How are creator payments processed?",
      answer: "Creator payments are securely processed through our platform after campaign completion and performance verification. We support multiple payment methods including bank transfers, PayPal, and cryptocurrency. Payments typically process within 14 days of campaign completion."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing cycle. We don't charge cancellation fees, and you can download your data before cancellation."
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('help.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('help.description')}
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t('help.searchPlaceholder')}
              className="pl-10 h-12"
            />
            <Button className="absolute right-1 top-1 h-10">
              Search
            </Button>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Help Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="hover:border-brand-pink/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand-pink/10 rounded-md">
                      <topic.icon className="h-5 w-5 text-brand-pink" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{topic.title}</h3>
                      <a 
                        href={topic.link} 
                        className="text-xs text-brand-pink hover:text-brand-pink/80 mt-1 inline-block"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="faq" className="mb-12">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="guides">Video Tutorials</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {commonFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">View All FAQs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guides">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <div className="aspect-video bg-black/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Platform Navigation Tutorial</h3>
                  <p className="text-sm text-muted-foreground">Learn how to navigate through the Kolerr dashboard and access key features.</p>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video bg-black/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Campaign Creation Walkthrough</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step guide to creating and launching your first influencer campaign.</p>
                </CardContent>
              </Card>
              
              <Button variant="outline" className="md:col-span-2 mt-4">View Tutorial Library</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-brand-pink" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our support team typically responds within 24 hours during business days.
                  </p>
                  <Button className="w-full">
                    support@kolerr.ai
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-brand-pink" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Available Monday-Friday, 9am-5pm PT for premium plan subscribers.
                  </p>
                  <Button variant="outline" className="w-full">
                    +1 (888) 123-4567
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-8">
          <SearchTutorial />
          <CreditFAQ />
          <SearchTips />
          <FeatureComparison />
        </div>
        
        <div className="mt-12 bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our customer support team is ready to assist you with any questions or issues you may have.
          </p>
          <div className="flex justify-center gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">Visit Community Forum</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
