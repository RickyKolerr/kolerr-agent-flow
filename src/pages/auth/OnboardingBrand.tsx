
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const OnboardingBrand = () => {
  const { completeOnboarding, skipOnboarding, user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Step 1: Company Information
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  
  // Step 2: Campaign Preferences
  const [budgetRange, setBudgetRange] = useState("");
  const [campaignGoals, setCampaignGoals] = useState("");
  const [preferredPlatforms, setPreferredPlatforms] = useState({
    tiktok: true,
    instagram: false,
    youtube: false,
    twitter: false,
  });
  
  // Step 3: Target Audience
  const [targetAudience, setTargetAudience] = useState("");
  const [audienceAge, setAudienceAge] = useState("");
  const [audienceLocation, setAudienceLocation] = useState("");

  const handleNextStep = () => {
    if (step < totalSteps) {
      toast.success(`Step ${step} completed!`);
      setStep(step + 1);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    toast.info("You can complete your profile later");
    skipOnboarding();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <Card className="w-full max-w-2xl shadow-xl border-border/50 glass-panel animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <Button variant="ghost" size="sm" onClick={handlePreviousStep} disabled={step === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip for now
            </Button>
          </div>
          
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          
          <div className="text-center mt-4">
            <CardTitle className="text-2xl font-bold">Set up your brand profile</CardTitle>
            <CardDescription>
              Step {step} of {totalSteps}: {step === 1 ? "Company Information" : step === 2 ? "Campaign Preferences" : "Target Audience"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Fashion, Technology, Food"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <select 
                  id="companySize"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Step 2: Campaign Preferences */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budgetRange">Monthly Campaign Budget Range</Label>
                <select 
                  id="budgetRange"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                >
                  <option value="">Select budget range</option>
                  <option value="<1000">Less than $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5001-10000">$5,001 - $10,000</option>
                  <option value="10001-50000">$10,001 - $50,000</option>
                  <option value="50000+">More than $50,000</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaignGoals">Campaign Goals</Label>
                <Textarea
                  id="campaignGoals"
                  placeholder="What are your main marketing objectives?"
                  value={campaignGoals}
                  onChange={(e) => setCampaignGoals(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Social Platforms</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tiktok" className="flex items-center gap-2 cursor-pointer">
                      <TikTokIcon className="h-4 w-4" />
                      TikTok
                    </Label>
                    <Switch
                      id="tiktok"
                      checked={preferredPlatforms.tiktok}
                      onCheckedChange={(checked) => setPreferredPlatforms({...preferredPlatforms, tiktok: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="instagram" className="flex items-center gap-2 cursor-pointer">
                      <InstagramIcon className="h-4 w-4" />
                      Instagram
                    </Label>
                    <Switch
                      id="instagram"
                      checked={preferredPlatforms.instagram}
                      onCheckedChange={(checked) => setPreferredPlatforms({...preferredPlatforms, instagram: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="youtube" className="flex items-center gap-2 cursor-pointer">
                      <YoutubeIcon className="h-4 w-4" />
                      YouTube
                    </Label>
                    <Switch
                      id="youtube"
                      checked={preferredPlatforms.youtube}
                      onCheckedChange={(checked) => setPreferredPlatforms({...preferredPlatforms, youtube: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twitter" className="flex items-center gap-2 cursor-pointer">
                      <TwitterIcon className="h-4 w-4" />
                      Twitter/X
                    </Label>
                    <Switch
                      id="twitter"
                      checked={preferredPlatforms.twitter}
                      onCheckedChange={(checked) => setPreferredPlatforms({...preferredPlatforms, twitter: checked})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Target Audience */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience Description</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Describe your ideal customer or target audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audienceAge">Target Age Range</Label>
                <select 
                  id="audienceAge"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={audienceAge}
                  onChange={(e) => setAudienceAge(e.target.value)}
                >
                  <option value="">Select age range</option>
                  <option value="13-17">13-17</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audienceLocation">Primary Target Locations</Label>
                <Input
                  id="audienceLocation"
                  placeholder="e.g. United States, Canada, Global"
                  value={audienceLocation}
                  onChange={(e) => setAudienceLocation(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            onClick={handleNextStep} 
            className="w-full bg-brand-pink hover:bg-brand-pink/90"
          >
            {step === totalSteps ? "Complete Setup" : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Icon components for social platforms
const TikTokIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1 7.87C17.47 7.87 16.05 7.07 15.1 5.83V15.5C15.1 18.6 12.6 21.1 9.5 21.1C6.4 21.1 3.9 18.6 3.9 15.5C3.9 12.4 6.4 9.9 9.5 9.9C9.92 9.9 10.33 9.95 10.72 10.03V13.18C10.33 13.04 9.91 12.97 9.49 12.97C8.1 12.97 6.97 14.1 6.97 15.49C6.97 16.88 8.1 18.01 9.49 18.01C10.88 18.01 12.02 16.87 12.02 15.49L12.04 3H15.09C15.09 3.23 15.11 3.46 15.15 3.68C15.39 5.21 16.67 6.44 18.22 6.5C18.39 6.5 18.56 6.51 18.73 6.5V9.93C18.5 9.96 18.3 9.97 18.1 9.97C17.28 9.97 16.5 9.79 15.8 9.48V11.22C16.85 11.67 18.02 11.9 19.11 11.9V7.87" fill="currentColor"/>
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.4 6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-.9.6-2 .9-3.1 1.2-.9-.9-2.2-1.5-3.6-1.5-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .7.1 1.1-4.2-.2-7.8-2.2-10.2-5.2-.4.8-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.4-2.6z" fill="currentColor"/>
  </svg>
);

export default OnboardingBrand;
