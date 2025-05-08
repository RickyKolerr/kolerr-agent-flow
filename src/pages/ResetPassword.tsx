
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would normally call an API endpoint
      // await api.auth.resetPassword(token, password);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccessful(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("There was an error resetting your password. The link may have expired.");
    } finally {
      setIsSubmitting(false);
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
          <h1 className="mt-3 text-2xl font-bold">Create new password</h1>
          <p className="text-muted-foreground mt-1">
            {!isSuccessful 
              ? "Enter a new password for your account" 
              : "Your password has been reset successfully"}
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!isSuccessful ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-brand-pink hover:bg-brand-pink/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto rounded-full bg-green-100 w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            
            <p className="text-lg font-medium">Password Reset Successful</p>
            
            <p className="text-sm text-muted-foreground">
              You'll be redirected to the login page in a moment.
            </p>
            
            <div className="pt-2">
              <Link to="/login">
                <Button className="bg-brand-pink hover:bg-brand-pink/90">
                  Login Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
