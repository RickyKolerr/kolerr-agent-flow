
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, AlertCircle, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
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

  // Password strength meter
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    // Length check
    if (password.length >= 8) strength += 25;
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;
    // Number check
    if (/[0-9]/.test(password)) strength += 25;
    // Special character check
    if (/[!@#$%^&*]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
  }, [password]);

  const getStrengthLabel = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-yellow-500";
    if (passwordStrength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
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

        {isSubmitted ? (
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-brand-pink/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-brand-pink" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                You will be redirected to the login page shortly.
              </p>
              <Progress value={100} className="my-4" />
              <Button 
                onClick={() => navigate("/login")} 
                className="mt-2 w-full bg-brand-pink hover:bg-brand-pink/90"
              >
                Go to Login Now
              </Button>
            </div>
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
              
              {!token && (
                <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">Invalid or missing reset token. Please request a new password reset link.</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!token || isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {password && (
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-xs">
                      <span>Password strength: </span>
                      <span className={
                        passwordStrength <= 25 ? "text-red-500" :
                        passwordStrength <= 50 ? "text-yellow-500" :
                        passwordStrength <= 75 ? "text-blue-500" : "text-green-500"
                      }>
                        {getStrengthLabel()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className={`${getStrengthColor()} h-1 rounded-full transition-all duration-300`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!token || isLoading}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div className="pt-2 text-sm">
                <ul className="space-y-1 text-muted-foreground list-disc pl-5">
                  <li className={password.length >= 8 ? "text-green-500" : ""}>
                    At least 8 characters long
                  </li>
                  <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                    Contains uppercase letter
                  </li>
                  <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                    Contains a number
                  </li>
                  <li className={/[!@#$%^&*]/.test(password) ? "text-green-500" : ""}>
                    Contains special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full bg-brand-pink hover:bg-brand-pink/90"
                disabled={!token || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : "Reset Password"}
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
