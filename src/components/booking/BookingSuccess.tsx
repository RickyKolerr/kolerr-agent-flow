
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');
  
  // Auto-redirect after 5 seconds
  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate('/dashboard/bookings');
    }
  }, [countdown, navigate, status]);

  if (status !== 'success') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Your booking has been successfully confirmed. 
            Check your email for further details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <div className="text-center text-sm text-muted-foreground mb-2">
              Booking Reference: <span className="font-mono font-medium">BK-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
            </div>
            
            <p className="text-center text-sm">
              You will be redirected to your bookings in {countdown} seconds...
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
          <Button 
            className="bg-brand-pink hover:bg-brand-pink/90"
            onClick={() => navigate('/dashboard/bookings')}
          >
            View Bookings <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingSuccess;
