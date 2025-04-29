
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, X, TriangleAlert, Check, Lightbulb, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface TourStep {
  id: number;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  element?: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function WelcomeTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const tourSteps: TourStep[] = [
    {
      id: 1,
      title: "Welcome to Kolerr! 👋",
      description: "We're excited to have you on board. Let's take a quick tour to get you started.",
      position: 'center',
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />
    },
    {
      id: 2,
      title: "Find Perfect Matches",
      description: "Use our AI-powered chat to quickly find creators or campaigns that match your needs.",
      position: 'left',
      element: '.ai-chat-container',
      icon: <MessageCircle className="h-8 w-8 text-brand-pink" />
    },
    {
      id: 3,
      title: "Browse Campaigns",
      description: "Discover trending campaigns and apply with just a few clicks.",
      position: 'right',
      element: '.campaign-section',
      icon: <Check className="h-8 w-8 text-green-500" />,
      action: {
        label: "Browse Campaigns",
        onClick: () => navigate("/dashboard/kol/campaigns")
      }
    }
  ];

  // Check if user is new and hasn't seen the tour
  useEffect(() => {
    const checkTourStatus = async () => {
      // In a real app, this would come from user preferences in DB
      const hasSeenTourBefore = localStorage.getItem('hasSeenTour') === 'true';
      
      if (isAuthenticated && !hasSeenTourBefore) {
        // Delay the tour start for a better UX
        setTimeout(() => {
          setIsVisible(true);
          toast.info("Welcome tour started", {
            description: "Let's help you get familiar with the platform"
          });
        }, 1500);
      }
      
      setHasSeenTour(hasSeenTourBefore);
    };
    
    checkTourStatus();
  }, [isAuthenticated]);
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const completeTour = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenTour', 'true');
    toast.success("Tour completed!", {
      description: "You're all set to start using Kolerr."
    });
  };
  
  const skipTour = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenTour', 'true');
  };
  
  if (!isVisible || hasSeenTour) {
    return null;
  }
  
  const currentTourStep = tourSteps[currentStep];
  
  // Position the tour card based on the step
  const getPositionClasses = () => {
    switch (currentTourStep.position) {
      case 'top':
        return 'bottom-full mb-4';
      case 'bottom':
        return 'top-full mt-4';
      case 'left':
        return 'right-full mr-4';
      case 'right':
        return 'left-full ml-4';
      default:
        return 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <Card className={`w-full max-w-md shadow-xl animate-fade-in ${getPositionClasses()}`}>
        <button 
          onClick={skipTour}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            {currentTourStep.icon}
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">{currentTourStep.title}</h3>
            <p className="text-muted-foreground">{currentTourStep.description}</p>
          </div>
          
          <div className="flex justify-center space-x-1 mb-4">
            {tourSteps.map((_, index) => (
              <div 
                key={index}
                className={`h-1 w-8 rounded-full ${
                  index === currentStep ? 'bg-brand-pink' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {currentTourStep.action && (
            <Button
              onClick={currentTourStep.action.onClick}
              className="w-full mb-3 bg-brand-navy hover:bg-brand-navy/90"
            >
              {currentTourStep.action.label}
            </Button>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            className="bg-brand-pink hover:bg-brand-pink/90"
          >
            {currentStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
            {currentStep < tourSteps.length - 1 && <ChevronRight className="ml-1 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
