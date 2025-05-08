
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth(); // Changed 'register' to 'signup'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("brand");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      // Show error about terms
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password, role);
      navigate(`/onboarding/${role}`);
    } catch (error) {
      console.error("Registration failed:", error);
      // Error handling would go here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-brand-navy/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/ff866eaa-8037-4015-a3f1-e8d5c10916b3.png" 
            alt="Kolerr Logo" 
            className="h-12 w-12 mx-auto"
          />
          <h1 className="mt-3 text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-1">Get started with Kolerr</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup 
              value={role} 
              onValueChange={setRole}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="brand" id="brand" />
                <Label htmlFor="brand">Brand</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kol" id="kol" />
                <Label htmlFor="kol">Creator/KOL</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(!!checked)}
              required
            />
            <Label 
              htmlFor="terms" 
              className="text-sm cursor-pointer"
            >
              I agree to the{" "}
              <Link 
                to="/terms" 
                className="text-brand-pink hover:text-brand-pink/80"
              >
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link 
                to="/privacy" 
                className="text-brand-pink hover:text-brand-pink/80"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-brand-pink hover:bg-brand-pink/90" 
            disabled={isLoading || !agreeTerms}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-brand-pink hover:text-brand-pink/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
