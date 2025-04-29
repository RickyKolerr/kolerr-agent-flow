
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Eye, EyeOff, Loader } from "lucide-react";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordRequirements } from "./PasswordRequirements";

interface ResetPasswordFormProps {
  password: string;
  confirmPassword: string;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  error: string;
  isLoading: boolean;
  token: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const ResetPasswordForm = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  error,
  isLoading,
  token,
  onSubmit
}: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
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
          
          <PasswordStrength password={password} />
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
        
        <PasswordRequirements password={password} />
      </div>

      <div className="pt-6">
        <Button 
          type="submit" 
          className="w-full bg-brand-pink hover:bg-brand-pink/90"
          disabled={!token || isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : "Reset Password"}
        </Button>
      </div>
    </form>
  );
};
