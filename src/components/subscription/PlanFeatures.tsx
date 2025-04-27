
import { CheckCircle2, AlertCircle, CreditCard } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanFeaturesProps {
  features: PlanFeature[];
  credits: number;
  isFree: boolean;
}

export const PlanFeatures = ({ features, credits, isFree }: PlanFeaturesProps) => {
  return (
    <>
      <div className="space-y-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-muted-foreground mr-2" />
            )}
            <p className={feature.included ? '' : 'text-muted-foreground'}>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-md">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          <span className="font-medium">
            {isFree ? `${credits} daily free searches` : `${credits} Premium credits monthly`}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {isFree ? 'Resets every day at 7:00 AM' : 'Roll over up to 50% of unused credits'}
        </p>
      </div>
    </>
  );
};
