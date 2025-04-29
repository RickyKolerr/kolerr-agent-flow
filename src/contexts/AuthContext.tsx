
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

// Define user roles
export type UserRole = "brand" | "kol" | "admin";

// Define onboarding status
export type OnboardingStatus = "incomplete" | "complete";

// Define subscription plan types
export type SubscriptionPlan = "free" | "starter" | "growth" | "pro" | "enterprise";

// Define subscription interface
export interface Subscription {
  plan: SubscriptionPlan;
  status: "active" | "canceled" | "expired";
  renewalDate?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  onboardingStatus: OnboardingStatus;
  subscription?: Subscription;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: "google" | "tiktok") => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Collection of real portrait images from Unsplash
const portraitImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop"
];

// Function to get a random portrait from the collection
const getRandomPortrait = (): string => {
  const randomIndex = Math.floor(Math.random() * portraitImages.length);
  return portraitImages[randomIndex];
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock auth functions
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from the backend
      const mockUser = {
        id: "user-123",
        email,
        name: "Demo User",
        avatar: getRandomPortrait(), // Use random real portrait instead of cartoon avatar
        role: "brand" as UserRole,
        onboardingStatus: "incomplete" as OnboardingStatus
      };
      
      setUser(mockUser);
      localStorage.setItem("kolerr_user", JSON.stringify(mockUser));
      toast.success("Login successful");
      
      // Redirect based on onboarding status
      if (mockUser.onboardingStatus === "incomplete") {
        navigate(`/onboarding/${mockUser.role}`);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: "google" | "tiktok") => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from the OAuth provider
      const mockUser = {
        id: `user-${provider}-${Math.random().toString(36).substring(2, 9)}`,
        email: `user_${Math.random().toString(36).substring(2, 7)}@example.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        avatar: getRandomPortrait(), // Use random real portrait instead of cartoon avatar
        role: "kol" as UserRole, // Default role for social logins
        onboardingStatus: "incomplete" as OnboardingStatus
      };
      
      setUser(mockUser);
      localStorage.setItem("kolerr_user", JSON.stringify(mockUser));
      toast.success(`${provider} login successful`);
      
      // Redirect to onboarding as social logins always need role selection
      navigate(`/onboarding/${mockUser.role}`);
    } catch (error) {
      toast.error(`Failed to login with ${provider}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        avatar: getRandomPortrait(), // Use random real portrait instead of cartoon avatar
        role,
        onboardingStatus: "incomplete" as OnboardingStatus
      };
      
      setUser(mockUser);
      localStorage.setItem("kolerr_user", JSON.stringify(mockUser));
      toast.success("Account created successfully");
      
      // Redirect to onboarding
      navigate(`/onboarding/${role}`);
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kolerr_user");
    toast.info("You've been logged out");
    navigate("/");
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, onboardingStatus: "complete" as OnboardingStatus };
      setUser(updatedUser);
      localStorage.setItem("kolerr_user", JSON.stringify(updatedUser));
      navigate("/dashboard");
      toast.success("Onboarding completed successfully");
    }
  };

  const skipOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, onboardingStatus: "complete" as OnboardingStatus };
      setUser(updatedUser);
      localStorage.setItem("kolerr_user", JSON.stringify(updatedUser));
      navigate("/dashboard");
      toast.info("You can complete your profile later in settings");
    }
  };

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("kolerr_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        socialLogin,
        signup,
        logout,
        forgotPassword,
        completeOnboarding,
        skipOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Route protection component
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="w-full h-screen grid place-items-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but hasn't completed onboarding, redirect to onboarding
  if (user && user.onboardingStatus === "incomplete" && !location.pathname.includes("/onboarding")) {
    return <Navigate to={`/onboarding/${user.role}`} replace />;
  }
  
  return <>{children}</>;
};

// Role-based route protection component
export const RoleProtectedRoute = ({ children, allowedRoles }: { children: ReactNode, allowedRoles: UserRole[] }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="w-full h-screen grid place-items-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};
