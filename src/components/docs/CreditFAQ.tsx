
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export const CreditFAQ = () => {
  const faqs = [
    {
      question: "What are credits?",
      answer: "Credits are used to perform searches and access detailed KOL information. Each search consumes one credit.",
    },
    {
      question: "How do I get more credits?",
      answer: "You can get more credits by upgrading to a premium plan or waiting for your daily free credits to reset.",
    },
    {
      question: "When do credits reset?",
      answer: "Free credits reset at midnight UTC. Premium plans have different credit allowances and reset periods.",
    },
    {
      question: "Can I save unused credits?",
      answer: "Free credits expire daily and don't roll over. Premium plan credits may have different expiration rules.",
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
