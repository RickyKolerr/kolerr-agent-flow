
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCampaignPage = location.pathname.includes("/campaigns/");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <div className="text-center space-y-6 max-w-md glass-panel rounded-xl p-8 animate-fade-in">
        <div className="h-20 w-20 mx-auto rounded-xl bg-brand-pink/20 flex items-center justify-center">
          <span className="text-5xl font-bold text-brand-pink">404</span>
        </div>
        
        {isCampaignPage ? (
          <>
            <h1 className="text-3xl font-bold">Campaign Not Found</h1>
            <p className="text-muted-foreground">
              The campaign you're looking for doesn't exist or has been removed.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          {isCampaignPage ? (
            <Button 
              onClick={() => navigate("/dashboard/campaigns")} 
              className="bg-brand-pink hover:bg-brand-pink/90"
            >
              Browse Available Campaigns
            </Button>
          ) : (
            <Button 
              onClick={() => navigate("/")} 
              className="bg-brand-pink hover:bg-brand-pink/90"
            >
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
