
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Loader2, Mail, AlertCircle, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useInterval } from "@/hooks/useInterval";

const EmailVerification = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyEmail } = useAuth();

  // Extract token from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    
    if (tokenParam) {
      setToken(tokenParam);
      handleVerification(tokenParam);
    } else {
      setError("Verification token is missing");
      setIsVerifying(false);
    }
  }, [location]);

  // Progress bar animation
  useEffect(() => {
    if (isVerifying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 30);
      
      return () => clearInterval(timer);
    }
  }, [isVerifying]);

  // Countdown timer for redirect
  useInterval(
    () => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    },
    isSuccess ? 1000 : null
  );

  const handleVerification = async (verificationToken: string) => {
    try {
      // Simulate verification (replace with actual verify email function)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app would call API
      // await verifyEmail(verificationToken);
      
      setIsSuccess(true);
      setIsVerifying(false);
      
      toast.success("Email verified successfully", {
        description: "Your account is now active.",
      });
      
      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Email verification failed:", error);
      setError("Failed to verify email. The token may be invalid or expired.");
      setIsVerifying(false);
      toast.error("Verification failed", {
        description: "The verification link is invalid or has expired.",
      });
    }
  };

  const handleResendVerification = async () => {
    try {
      // Simulate resending verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call your backend:
      // await resendVerificationEmail(user.email);
      
      setError("");
      toast.success("Verification email sent", {
        description: "Please check your inbox for the verification link.",
      });
    } catch (error) {
      console.error("Failed to resend verification email:", error);
      setError("Failed to resend verification email. Please try again later.");
      toast.error("Failed to send email", {
        description: "Please try again later or contact support.",
      });
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
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isVerifying ? "Verifying Your Email" : isSuccess ? "Email Verified" : "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-center">
            {isVerifying 
              ? "Please wait while we verify your email address."
              : isSuccess 
                ? "Your email has been successfully verified."
                : "We couldn't verify your email address."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex flex-col items-center">
          {isVerifying ? (
            <div className="flex flex-col items-center gap-4 py-8 w-full">
              <Loader2 className="h-10 w-10 animate-spin text-brand-pink" />
              <p>Verifying your email address...</p>
              <Progress value={progress} className="w-full mt-2" />
            </div>
          ) : isSuccess ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="h-16 w-16 rounded-full bg-brand-pink/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-brand-pink" />
              </div>
              <div className="text-center">
                <p className="mb-2">You will be redirected to login in {countdown} seconds.</p>
                <p className="text-sm text-muted-foreground">
                  Or you can <Link to="/login" className="underline text-brand-pink hover:text-brand-pink/90">login now</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-center">{error}</p>
              <Button 
                onClick={handleResendVerification}
                className="mt-2"
                variant="secondary"
              >
                <Mail className="mr-2 h-4 w-4" />
                Resend Verification Email
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <p className="text-center text-sm">
            Back to{" "}
            <Link to="/login" className="underline text-brand-pink hover:text-brand-pink/90">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerification;
