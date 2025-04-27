
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    "Access to our AI-powered KOL search engine",
    "Campaign management tools",
    "Analytics dashboard",
    "Contract management"
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
              Enter your information to create your account
            </CardDescription>
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
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
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
          <h2 className="text-2xl font-bold mb-6">Join thousands of brands using Kolerr</h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
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
              "Kolerr has transformed how we approach influencer marketing. The AI agent made finding the right TikTok creators for our brand effortless and the results exceeded our expectations."
            </p>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-3">
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Marketing Director, StyleBrand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
