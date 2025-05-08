
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // This would normally call an API endpoint
      // await api.auth.forgotPassword(email);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (err) {
      setError("There was an error sending the password reset email. Please try again.");
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
          <h1 className="mt-3 text-2xl font-bold">Reset your password</h1>
          <p className="text-muted-foreground mt-1">
            {!isSubmitted 
              ? "We'll send you a link to reset your password" 
              : "Check your email for the reset link"}
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!isSubmitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-brand-pink hover:bg-brand-pink/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
            
            <div className="text-center mt-2">
              <Link 
                to="/login" 
                className="text-brand-pink hover:text-brand-pink/80 inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto rounded-full bg-green-100 w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            
            <p>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            
            <p className="text-sm text-muted-foreground">
              If you don't see it in your inbox, please check your spam folder.
            </p>
            
            <div className="pt-4">
              <Button 
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="mr-2"
              >
                Try another email
              </Button>
              
              <Link to="/login">
                <Button>
                  Return to login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
