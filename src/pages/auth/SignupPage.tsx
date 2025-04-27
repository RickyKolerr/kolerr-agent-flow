
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Instagram, Mail } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("brand");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, socialLogin } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, password, role);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "tiktok") => {
    try {
      await socialLogin(provider);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  const benefitsBrand = [
    "Access to our AI-powered KOL search engine",
    "Campaign management tools",
    "Analytics dashboard",
    "Contract management"
  ];

  const benefitsKOL = [
    "Get discovered by top brands",
    "Manage campaign offers",
    "Track your earnings",
    "Professional contract templates"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <div className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        <Card className="w-full lg:w-1/2 shadow-xl border-border/50 glass-panel animate-fade-in">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-10 w-10 rounded-md bg-brand-pink flex items-center justify-center">
                <span className="font-bold text-white text-xl">K</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Choose your account type and enter your information
            </CardDescription>
            <Tabs defaultValue="brand" className="w-full mt-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="brand" onClick={() => setRole("brand")}>Brand</TabsTrigger>
                <TabsTrigger value="kol" onClick={() => setRole("kol")}>Creator/KOL</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long.
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin("google")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M22 12a10 10 0 0 1-10 10c-5.523 0-10-4.477-10-10S6.477 2 12 2c2.27 0 4.36.74 6.055 2H12v4h10c-.1 1.554-1 5.6-4 8Z" />
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleSocialLogin("tiktok")}
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  TikTok
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline text-brand-pink hover:text-brand-pink/90">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold mb-6">Join thousands of {role === "brand" ? "brands" : "creators"} using Kolerr</h2>
          <div className="space-y-4">
            {(role === "brand" ? benefitsBrand : benefitsKOL).map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-4 h-6 w-6 rounded-full bg-brand-pink/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-brand-pink" />
                </div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg border border-border bg-secondary/30">
            <p className="italic text-muted-foreground">
              {role === "brand" 
                ? "\"Kolerr has transformed how we approach influencer marketing. The AI agent made finding the right TikTok creators for our brand effortless and the results exceeded our expectations.\""
                : "\"As a content creator, Kolerr helped me connect with brands that truly align with my values. The platform makes it easy to manage campaigns and get paid on time.\""}
            </p>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-3">
                <p className="font-medium">{role === "brand" ? "Sarah Johnson" : "Alex Chen"}</p>
                <p className="text-sm text-muted-foreground">{role === "brand" ? "Marketing Director, StyleBrand" : "Lifestyle Creator, 500K+ followers"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
