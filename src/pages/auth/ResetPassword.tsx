
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();

  // Extract token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Assuming resetPassword is defined in AuthContext
      await resetPassword(token, password);
      setIsSubmitted(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to reset password. The token may be invalid or expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/90">
      <div className="absolute top-6 left-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-xl border-border/50 glass-panel animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded-md bg-brand-pink flex items-center justify-center">
              <span className="font-bold text-white text-xl">K</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isSubmitted ? "Password Reset Complete" : "Reset Your Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSubmitted
              ? "Your password has been successfully reset."
              : "Enter your new password below."}
          </CardDescription>
        </CardHeader>

        {isSubmitted ? (
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-brand-pink/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-brand-pink" />
              </div>
            </div>
            <p className="text-center text-muted-foreground">
              You will be redirected to the login page shortly.
            </p>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </CardFooter>
          </form>
        )}

        <CardFooter className="flex justify-center pb-6">
          <p className="text-center text-sm">
            Remember your password?{" "}
            <Link to="/login" className="underline text-brand-pink hover:text-brand-pink/90">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
