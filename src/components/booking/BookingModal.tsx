
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft } from "lucide-react";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  contactName: string;
  selectedKolId?: string; // Added to support direct booking with a KOL
}

export const BookingModal = ({
  open,
  onClose,
  contactName,
  selectedKolId,
}: BookingModalProps) => {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    duration: "30",
    description: ""
  });
  const navigate = useNavigate();

  const handleFormSubmit = (formData: {
    date: string;
    time: string;
    duration: string;
    description: string;
  }) => {
    setBookingDetails(formData);
    setStep('payment');
  };

  const handleGoBack = () => {
    setStep('form');
  };

  const handlePaymentConfirm = () => {
    // This will be integrated with Stripe later
    onClose();
    // Redirect to success page after Stripe payment
    navigate('/dashboard/bookings?status=success');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-brand-pink" />
              {step === 'form' ? 'Book a Session' : 'Complete Your Booking'}
            </div>
          </DialogTitle>
          <DialogDescription>
            {step === 'form' 
              ? `Schedule a session with ${contactName}. Please select your preferred date and time.` 
              : 'Please review your booking details before proceeding to payment.'}
          </DialogDescription>
        </DialogHeader>
        
        {step === 'form' ? (
          <BookingForm onSubmit={handleFormSubmit} />
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Booking with</span>
                <span className="font-medium">{contactName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date(bookingDetails.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{bookingDetails.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{bookingDetails.duration} minutes</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold">$50.00</span>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          {step === 'form' ? (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          ) : (
            <Button variant="outline" onClick={handleGoBack}>
              Back
            </Button>
          )}
          
          {step === 'payment' && (
            <Button 
              onClick={handlePaymentConfirm} 
              className="bg-brand-pink hover:bg-brand-pink/90"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
