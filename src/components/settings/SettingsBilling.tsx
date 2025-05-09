
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ChevronRight, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CreditPackages } from "@/components/credits/CreditPackages";
import { TeamManagement } from "@/components/settings/TeamManagement";

export const SettingsBilling = () => {
  const navigate = useNavigate();
  const { hasPremiumPlan, premiumCredits } = useCredits();
  const { user } = useAuth();
  const isKOL = user?.role === 'kol';

  return (
    <div className="space-y-6">
      {/* Current Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription and credit usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">
                {hasPremiumPlan ? 'Premium Plan' : 'Free Plan'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasPremiumPlan 
                  ? `${premiumCredits} credits remaining`
                  : '5 free searches per day'}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              {isKOL ? (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/pricing#credit-packages-section')}
                  className="justify-between"
                >
                  <span>Get More Credits</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard/subscription')}
                  className="justify-between"
                >
                  <span>{hasPremiumPlan ? 'Change Plan' : 'Upgrade to Premium'}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              {hasPremiumPlan && !isKOL && (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/dashboard/subscription?action=cancel')}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 justify-between"
                >
                  <span>Cancel Subscription</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Packages - Always available for all users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Credit Packages
          </CardTitle>
          <CardDescription>
            Purchase additional search credits that expire in 60 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-start gap-4 mb-4"
            onClick={() => navigate('/pricing#credit-packages-section')}
          >
            <Package className="h-4 w-4" />
            Browse Credit Packages
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
          
          {/* Direct access to credit packages for all users */}
          <div className="mt-6">
            <CreditPackages />
          </div>
        </CardContent>
      </Card>

      {/* Team Management - Only for brands */}
      {!isKOL && (
        <TeamManagement />
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your payment methods and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-start gap-4"
            onClick={() => navigate('/dashboard/payment')}
          >
            <CreditCard className="h-4 w-4" />
            Manage Payment Methods
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
