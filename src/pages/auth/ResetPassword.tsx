
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { ResetSuccessView } from "@/components/auth/ResetSuccessView";
import { useInterval } from "@/hooks/useInterval";

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
    } else {
      setError("Reset token is missing. Please request a new password reset link.");
    }
  }, [location]);

  // Redirect to login after submission
  useInterval(
    () => {
      navigate("/login");
    },
    isSubmitted ? 3000 : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      toast.error("Password too short", {
        description: "Please use at least 8 characters"
      });
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app
      // await resetPassword(token, password);
      
      setIsSubmitted(true);
      toast.success("Password reset successful", {
        description: "You can now log in with your new password."
      });
      
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to reset password. The token may be invalid or expired.");
      toast.error("Password reset failed", {
        description: "The reset link may be invalid or expired. Please request a new one."
      });
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
            <div className="h-12 w-12 rounded-md bg-brand-pink flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
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

        <CardContent>
          {isSubmitted ? (
            <ResetSuccessView />
          ) : (
            <ResetPasswordForm 
              password={password}
              confirmPassword={confirmPassword}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              error={error}
              isLoading={isLoading}
              token={token}
              onSubmit={handleSubmit}
            />
          )}
        </CardContent>

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
