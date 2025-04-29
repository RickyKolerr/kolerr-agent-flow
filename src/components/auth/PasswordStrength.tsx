
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  
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

  if (!password) return null;

  return (
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
  );
};
