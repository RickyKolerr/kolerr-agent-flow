
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { Check, ChevronRight } from "lucide-react";

const Onboarding = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if role doesn't match user role
  useEffect(() => {
    if (user && user.role !== role) {
      navigate(`/onboarding/${user.role}`);
    }
  }, [user, role, navigate]);

  const isBrand = role === "brand";
  const totalSteps = isBrand ? 3 : 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // This would normally call an API endpoint
      // await updateUserProfile({ onboardingStatus: "complete", ...formData });
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on role
      navigate(isBrand ? "/dashboard/overview" : "/dashboard/kol/campaigns");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSteps = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                step < currentStep
                  ? "bg-green-500 text-white"
                  : step === currentStep
                  ? "bg-brand-pink text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {step < currentStep ? <Check className="h-5 w-5" /> : step}
            </div>
            <p className="text-xs mt-2 text-muted-foreground">
              {isBrand
                ? ["Profile", "Company", "Goals"][step - 1]
                : ["Profile", "Content", "Audience", "Goals"][step - 1]}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderBrandStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="Marketing Manager" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Company Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Your Company" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201+">201+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://yourcompany.com" />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Marketing Goals</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Goals</Label>
                {["Brand awareness", "Increase sales", "Product launch", "Community building", "Content creation"].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2 mt-2">
                    <Switch id={`goal-${goal}`} />
                    <Label htmlFor={`goal-${goal}`} className="cursor-pointer">{goal}</Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea 
                  id="targetAudience" 
                  placeholder="Describe your target audience" 
                  rows={3} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Monthly Marketing Budget</Label>
                <Select>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1000">Less than $1,000</SelectItem>
                    <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                    <SelectItem value="5001-10000">$5,001 - $10,000</SelectItem>
                    <SelectItem value="10001+">$10,001+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderKolStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" placeholder="How you'd like to be known" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Handle</Label>
                  <Input id="username" placeholder="@username" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell brands about yourself" rows={4} />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Content Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contentTypes">Content Categories</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Fashion", "Beauty", "Travel", "Fitness", "Food", "Technology", "Lifestyle", "Gaming"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Switch id={`category-${category}`} />
                      <Label htmlFor={`category-${category}`} className="cursor-pointer">{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label>Platforms</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {["Instagram", "TikTok", "YouTube", "Twitter", "Facebook", "Twitch"].map((platform) => (
                    <div key={platform} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Switch id={`platform-${platform}`} />
                        <Label htmlFor={`platform-${platform}`} className="cursor-pointer">{platform}</Label>
                      </div>
                      <Input 
                        placeholder={`${platform} handle`} 
                        className="mt-1" 
                        id={`${platform.toLowerCase()}-handle`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Audience Demographics</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followerCount">Total Followers</Label>
                  <Input id="followerCount" placeholder="Approximate followers across platforms" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="averageEngagement">Average Engagement Rate</Label>
                  <Input id="averageEngagement" placeholder="e.g. 3.5%" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Audience Age Range</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["13-17", "18-24", "25-34", "35-44", "45-54", "55+"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Switch id={`age-${range}`} />
                      <Label htmlFor={`age-${range}`} className="cursor-pointer">{range}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="audienceLocation">Top Audience Locations</Label>
                <Textarea 
                  id="audienceLocation" 
                  placeholder="e.g. United States, Canada, UK" 
                  rows={2} 
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Partnership Preferences</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Types of Collaborations</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    "Sponsored posts", 
                    "Product reviews", 
                    "Brand ambassador", 
                    "Affiliate marketing",
                    "Event appearances", 
                    "Content creation"
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Switch id={`collab-${type}`} />
                      <Label htmlFor={`collab-${type}`} className="cursor-pointer">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="minBudget">Minimum Collaboration Budget</Label>
                <Select>
                  <SelectTrigger id="minBudget">
                    <SelectValue placeholder="Select minimum budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product exchange</SelectItem>
                    <SelectItem value="<500">Under $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1001-2500">$1,001 - $2,500</SelectItem>
                    <SelectItem value="2501+">$2,501+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brandValues">Brand Values Alignment</Label>
                <Textarea 
                  id="brandValues" 
                  placeholder="What matters to you in brand partnerships" 
                  rows={3} 
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-brand-navy/10 p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" 
            alt="Kolerr Logo" 
            className="h-12 w-12 mx-auto"
          />
          <h1 className="mt-3 text-2xl font-bold">
            {isBrand ? "Brand Onboarding" : "Creator Onboarding"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Help us customize your experience
          </p>
        </div>
        
        {renderSteps()}
        
        <Card>
          <CardContent className="p-6">
            {isBrand ? renderBrandStepContent() : renderKolStepContent()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-brand-pink hover:bg-brand-pink/90"
              >
                {isSubmitting ? "Saving..." :
                 currentStep < totalSteps ? "Continue" : "Complete Setup"}
                {!isSubmitting && currentStep < totalSteps && (
                  <ChevronRight className="ml-1 h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
