
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BillingPeriodSelectorProps {
  value: 'monthly' | 'yearly';
  onValueChange: (value: 'monthly' | 'yearly') => void;
}

export const BillingPeriodSelector = ({ value, onValueChange }: BillingPeriodSelectorProps) => {
  return (
    <div className="flex justify-center">
      <Tabs
        value={value}
        onValueChange={(v) => onValueChange(v as 'monthly' | 'yearly')}
        className="w-fit"
      >
        <TabsList className="grid w-[300px] grid-cols-2 mb-8">
          <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
          <TabsTrigger value="yearly">
            Yearly Billing
            <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
              Save 20%
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
