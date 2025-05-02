
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ChatAgentWrapperProps {
  title: string;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const ChatAgentWrapper: React.FC<ChatAgentWrapperProps> = ({
  title,
  isOpen,
  onOpenChange,
  children
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // For mobile devices, use a Sheet component that slides in from bottom
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-xl border-t border-white/10 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-xl">
          {children}
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, use Dialog component to create a modal-like experience
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] h-[70vh] p-0 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
