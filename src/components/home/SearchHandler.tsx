
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";
import { RESET_HOUR, getTimeUntilReset } from "@/hooks/useSearchCredits";
import { toast } from "sonner";
import { Message } from "./ChatSection";

export function useSearchHandler(
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setShouldScrollToBottom: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserAccess();
  const { freeCredits: originalFreeCredits, hasPremiumPlan } = useCredits();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    freeCredits,
    generalQuestionCounter, 
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    generalQuestionsPerCredit
  } = useIntelligentCredits(originalFreeCredits, hasPremiumPlan);

  // Helper function to get appropriate credit usage text
  const getCreditUsageText = () => {
    if (hasPremiumPlan) return "Premium plan activated";
    
    return `${freeCredits} free ${freeCredits === 1 ? 'search' : 'searches'} remaining • ${remainingGeneralQuestions} general ${remainingGeneralQuestions === 1 ? 'question' : 'questions'} left`;
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    
    // Search is always considered a KOL-specific query
    if (!hasPremiumPlan && freeCredits === 0) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      
      toast.error("Out of free searches", {
        description: `Upgrade your plan to continue searching or wait until ${RESET_HOUR}:00 AM for your credits to reset (${getTimeUntilReset()} remaining).`,
        action: {
          label: "Upgrade",
          onClick: () => navigate("/pricing")
        }
      });
      return;
    }

    const searchMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Search for: ${searchQuery}`,
      isKOLSpecific: true
    };
    
    setMessages(prev => [...prev, searchMessage]);
    setShouldScrollToBottom(true); // Set flag to scroll to bottom

    // Use intelligent credit system (search is always KOL-specific)
    if (!useIntelligentCredit(`find ${searchQuery}`)) {
      return; // Stop if we couldn't use a credit
    }

    // Add a small delay before AI starts typing
    setTimeout(() => {
      const responseText = isAuthenticated 
        ? `I found several TikTok creators matching "${searchQuery}". Let me analyze their profiles.`
        : "To see detailed analytics and book these creators, please sign in.";
      
      // Check if this response contains "For Creators" phrase
      const creatorPhrase = "For Creators";
      const containsCreatorPhrase = responseText.includes(creatorPhrase);
      
      const botResponseId = (Date.now() + 1).toString();
      
      // Add empty bot message with typing indicator
      setMessages(prev => [...prev, {
        id: botResponseId,
        type: "bot",
        content: "",
        isTyping: true,
        isKOLSpecific: true
      }]);
      setShouldScrollToBottom(true); // Set flag to scroll to bottom
      
      // Use typing effect with variable speed
      let currentText = "";
      let charIndex = 0;
      
      const typingTextWithDelay = () => {
        if (charIndex < responseText.length) {
          // Check if we're currently typing the creator phrase
          const currentSubstring = responseText.substring(charIndex, charIndex + creatorPhrase.length);
          const isCreatorPart = containsCreatorPhrase && 
            currentSubstring.includes(creatorPhrase.substring(0, Math.min(currentSubstring.length, creatorPhrase.length)));
          
          // Slow down for creator phrase
          const typingDelay = isCreatorPart ? 400 : 150;
          
          currentText += responseText[charIndex];
          charIndex++;
          
          // Update the message with the current text
          setMessages(prev => {
            const updatedMessages = [...prev];
            const messageIndex = updatedMessages.findIndex(msg => msg.id === botResponseId);
            if (messageIndex !== -1) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                content: currentText,
                isTyping: charIndex < responseText.length
              };
            }
            return updatedMessages;
          });
          
          // Only scroll at the end of the message
          if (charIndex === responseText.length) {
            setShouldScrollToBottom(true);
          }
          
          // Schedule next character
          setTimeout(typingTextWithDelay, typingDelay);
        } else {
          // Typing is complete, check if we need to navigate
          if (!isAuthenticated) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        }
      };
      
      // Start the typing effect
      typingTextWithDelay();
    }, 1500);
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    getCreditUsageText,
    freeCredits,
    hasPremiumPlan,
    generalQuestionCounter,
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    generalQuestionsPerCredit
  };
}
