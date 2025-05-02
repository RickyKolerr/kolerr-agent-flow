
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export const CreditFAQ = () => {
  const faqs = [
    {
      question: "What are credits?",
      answer: "Credits are used to perform searches and access detailed KOL information. Each KOL search consumes one credit, while general questions use 1 credit per 3 questions.",
    },
    {
      question: "How many free credits do I get?",
      answer: "All users receive 5 free credits daily, which reset at 7:00 AM. Premium plan subscribers get additional credits based on their subscription tier.",
    },
    {
      question: "What's the difference between search types?",
      answer: "KOL/campaign searches (finding creators, campaigns, etc.) use 1 credit per search. General conversation uses 1 credit for every 3 questions.",
    },
    {
      question: "How does the chat toggle work?",
      answer: "The chat toggle lets you switch between Normal Mode (3:1 question ratio) and Search Mode (1:1 ratio). Use Normal Mode for general information and Search Mode when looking for specific KOLs or campaigns.",
    },
    {
      question: "What can I do as a guest user?",
      answer: "Guest users can use credits for basic searches but are limited to 3 view-only results. Registration is required to save searches, contact KOLs, or access premium features.",
    },
    {
      question: "What permissions do KOLs have?",
      answer: "KOLs can search profiles, view campaign details, save campaigns, and apply for jobs. Some advanced features may require credits or premium plans.",
    },
    {
      question: "What permissions do brands have?",
      answer: "Brands can search for KOLs, contact them, and invite them to campaigns. Viewing detailed metrics requires a premium plan. Free accounts are limited to daily credits.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileQuestion className="h-5 w-5 text-brand-pink" />
          <CardTitle>Credit FAQ</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
