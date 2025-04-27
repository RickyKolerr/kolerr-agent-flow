
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

const OnboardingKOL = () => {
  const { completeOnboarding, skipOnboarding, user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Step 1: Personal Information
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  
  // Step 2: Social Media Accounts
  const [socialPlatforms, setSocialPlatforms] = useState({
    tiktok: { connected: false, handle: "" },
    instagram: { connected: false, handle: "" },
    youtube: { connected: false, handle: "" },
    twitter: { connected: false, handle: "" },
  });
  
  // Step 3: Creator Preferences
  const [contentCategories, setContentCategories] = useState({
    fashion: false,
    beauty: false,
    lifestyle: false,
    travel: false,
    food: false,
    fitness: false,
    tech: false,
    gaming: false,
  });
  const [minBudget, setMinBudget] = useState("");

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

  const updateSocialHandle = (platform, value) => {
    setSocialPlatforms(prev => ({
      ...prev,
      [platform]: { ...prev[platform], handle: value }
    }));
  };

  const toggleSocialPlatform = (platform) => {
    setSocialPlatforms(prev => ({
      ...prev,
      [platform]: { ...prev[platform], connected: !prev[platform].connected }
    }));
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
            <CardTitle className="text-2xl font-bold">Set up your creator profile</CardTitle>
            <CardDescription>
              Step {step} of {totalSteps}: {step === 1 ? "Personal Information" : step === 2 ? "Social Media Accounts" : "Content Preferences"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="Your creator name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell brands about yourself and your content"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. New York, USA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Social Media Accounts */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your social media accounts to help brands find and verify you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TikTokIcon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">TikTok</p>
                      {socialPlatforms.tiktok.connected && (
                        <p className="text-xs text-muted-foreground">Connected</p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={socialPlatforms.tiktok.connected}
                    onCheckedChange={() => toggleSocialPlatform("tiktok")}
                  />
                </div>
                {socialPlatforms.tiktok.connected && (
                  <div className="pl-8">
                    <Label htmlFor="tiktokHandle" className="text-sm">TikTok Handle</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-muted-foreground">@</span>
                      <Input
                        id="tiktokHandle"
                        placeholder="username"
                        value={socialPlatforms.tiktok.handle}
                        onChange={(e) => updateSocialHandle("tiktok", e.target.value)}
                        className="ml-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      {socialPlatforms.instagram.connected && (
                        <p className="text-xs text-muted-foreground">Connected</p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={socialPlatforms.instagram.connected}
                    onCheckedChange={() => toggleSocialPlatform("instagram")}
                  />
                </div>
                {socialPlatforms.instagram.connected && (
                  <div className="pl-8">
                    <Label htmlFor="instagramHandle" className="text-sm">Instagram Handle</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-muted-foreground">@</span>
                      <Input
                        id="instagramHandle"
                        placeholder="username"
                        value={socialPlatforms.instagram.handle}
                        onChange={(e) => updateSocialHandle("instagram", e.target.value)}
                        className="ml-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <YoutubeIcon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">YouTube</p>
                      {socialPlatforms.youtube.connected && (
                        <p className="text-xs text-muted-foreground">Connected</p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={socialPlatforms.youtube.connected}
                    onCheckedChange={() => toggleSocialPlatform("youtube")}
                  />
                </div>
                {socialPlatforms.youtube.connected && (
                  <div className="pl-8">
                    <Label htmlFor="youtubeHandle" className="text-sm">YouTube Channel</Label>
                    <Input
                      id="youtubeHandle"
                      placeholder="Channel name"
                      value={socialPlatforms.youtube.handle}
                      onChange={(e) => updateSocialHandle("youtube", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TwitterIcon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Twitter/X</p>
                      {socialPlatforms.twitter.connected && (
                        <p className="text-xs text-muted-foreground">Connected</p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={socialPlatforms.twitter.connected}
                    onCheckedChange={() => toggleSocialPlatform("twitter")}
                  />
                </div>
                {socialPlatforms.twitter.connected && (
                  <div className="pl-8">
                    <Label htmlFor="twitterHandle" className="text-sm">Twitter/X Handle</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-muted-foreground">@</span>
                      <Input
                        id="twitterHandle"
                        placeholder="username"
                        value={socialPlatforms.twitter.handle}
                        onChange={(e) => updateSocialHandle("twitter", e.target.value)}
                        className="ml-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Creator Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Content Categories</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the categories that best represent your content
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(contentCategories).map(([category, isSelected]) => (
                    <div key={category} className="flex items-center justify-between border p-3 rounded-md">
                      <Label htmlFor={category} className="cursor-pointer capitalize">
                        {category}
                      </Label>
                      <Switch
                        id={category}
                        checked={isSelected}
                        onCheckedChange={(checked) => 
                          setContentCategories(prev => ({ ...prev, [category]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="minBudget">Minimum Campaign Budget</Label>
                <select 
                  id="minBudget"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                >
                  <option value="">Select minimum budget</option>
                  <option value="any">Any Budget</option>
                  <option value="100">$100+</option>
                  <option value="500">$500+</option>
                  <option value="1000">$1,000+</option>
                  <option value="5000">$5,000+</option>
                  <option value="10000">$10,000+</option>
                </select>
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

export default OnboardingKOL;
