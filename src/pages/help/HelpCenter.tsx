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
      title: "Understanding the Credit System",
      icon: Book,
      link: "#credit-faq",
    },
    {
      title: "KOL Search Best Practices",
      icon: Search,
      link: "#search-tips",
    },
    {
      title: "Role-Based Access Permissions",
      icon: FileText,
      link: "#feature-comparison",
    },
    {
      title: "Subscription Benefits & Upgrades",
      icon: FileText,
      link: "#",
    }
  ];
  
  const commonFaqs = [
    {
      question: "How do credits work in the AI assistant?",
      answer: "Our AI assistant uses a credit system that differentiates between search queries and general conversation. KOL/campaign searches use 1 credit per search, while general questions follow a 3:1 ratio (3 questions per credit). All users receive 5 free credits daily, which reset at 7:00 AM."
    },
    {
      question: "What can I do as a guest vs. registered user?",
      answer: "Guest users can perform basic searches with limited results (3 maximum) and view basic profile information. Registered users get personalized experiences based on their role (KOL or Brand) with access to save searches, contact creators, view full campaign details, and more depending on their subscription tier."
    },
    {
      question: "What are the differences between KOL and Brand permissions?",
      answer: "KOLs can search profiles, view full campaign details, save campaigns, and apply for jobs. Brands can search for KOLs, contact them, and invite them to campaigns. Some advanced features like viewing detailed metrics require premium plans for both user types."
    },
    {
      question: "When do my free credits reset?",
      answer: "Free credits reset daily at 7:00 AM. Premium plan subscribers receive additional credits that may have different reset periods based on their subscription tier."
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
                <CardTitle>Credit System & Permissions</CardTitle>
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
                  <h3 className="font-medium mb-2">Understanding the Credit System</h3>
                  <p className="text-sm text-muted-foreground">Learn how our credit system works and how to optimize your searches.</p>
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
                  <h3 className="font-medium mb-2">Maximizing Your Free Credits</h3>
                  <p className="text-sm text-muted-foreground">Tips and tricks to make the most of your daily free credits.</p>
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
        
        <div className="space-y-8" id="help-content">
          <SearchTutorial />
          <div id="credit-faq">
            <CreditFAQ />
          </div>
          <div id="search-tips">
            <SearchTips />
          </div>
          <div id="feature-comparison">
            <FeatureComparison />
          </div>
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
