
import React, { useState, useRef, useEffect } from "react";
import { FloatingHomeChat } from "@/components/chat/FloatingHomeChat";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCredits } from "@/contexts/CreditContext";
import { useUserAccess } from "@/hooks/useUserAccess";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useIntelligentCredits } from "@/hooks/useIntelligentCredits";
import { RESET_HOUR, getTimeUntilReset } from "@/hooks/useSearchCredits";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  isTyping?: boolean;
  isKOLSpecific?: boolean;
}

export const ChatSection: React.FC = () => {
  const navigate = useNavigate();
  const welcomeMessage = "👋 Welcome to the world's first Influencer Marketing AI Agent! As a Strategic Partner of Global TikTok and Meta, Kolerr can help you quickly find creators all around the world for your campaigns. What type of influencers are you looking for today?";
  
  // Special phrases for typing effect
  const slowTypedPhrase = "What type of influencers are you looking for today?";
  const creatorPhrase = "For Creators";
  
  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    type: "bot",
    content: welcomeMessage,
    isTyping: true
  }]);
  
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, canAccessFeature } = useUserAccess();
  const { freeCredits: originalFreeCredits, useFreeCredit, hasPremiumPlan } = useCredits();
  
  // Initialize intelligent credit system
  const { 
    freeCredits,
    generalQuestionCounter, 
    remainingGeneralQuestions,
    useIntelligentCredit,
    isKOLSpecificQuery,
    generalQuestionsPerCredit
  } = useIntelligentCredits(originalFreeCredits, hasPremiumPlan);

  // Enhanced typing effect with super slow speed for specific phrases
  const { displayedText, isComplete } = useTypingEffect({
    text: welcomeMessage,
    typingSpeed: 150, // Normal speed for regular text
    startDelay: 1000,
    highlightText: slowTypedPhrase,
    highlightSpeed: 400  // Much slower (400ms) for the highlighted phrase
  });

  // Track if messages have been updated specifically by adding a new message
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  // Update the welcome message as it types
  useEffect(() => {
    setMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const welcomeMessageIndex = newMessages.findIndex(msg => msg.id === "welcome");
      if (welcomeMessageIndex !== -1) {
        newMessages[welcomeMessageIndex] = {
          ...newMessages[welcomeMessageIndex],
          content: displayedText,
          isTyping: !isComplete
        };
      }
      return newMessages;
    });
  }, [displayedText, isComplete]);

  // Only scroll when new messages are added, not on any click or interaction
  useEffect(() => {
    if (messagesEndRef.current && shouldScrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScrollToBottom(false); // Reset the flag after scrolling
    }
  }, [shouldScrollToBottom]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    
    // Analyze if the message is KOL-specific
    const isSpecific = isKOLSpecificQuery(inputValue);
    
    // Check if we have enough credits
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      isKOLSpecific: isSpecific
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setShouldScrollToBottom(true); // Set flag to scroll to bottom

    // Use intelligent credit system
    if (!useIntelligentCredit(inputValue)) {
      return; // Stop if we couldn't use a credit
    }

    // Add a small delay before AI starts typing
    setTimeout(() => {
      const botResponseText = getResponse(inputValue);
      const botResponseId = (Date.now() + 1).toString();
      
      // Add empty bot message with typing indicator
      setMessages(prev => [...prev, {
        id: botResponseId,
        type: "bot",
        content: "",
        isTyping: true,
        isKOLSpecific: isSpecific
      }]);
      setShouldScrollToBottom(true); // Set flag to scroll to bottom
      
      // Use typing effect to gradually reveal the message with more realistic timing
      let currentText = "";
      let charIndex = 0;
      
      // Check if this message contains our special phrases
      const containsSlowTypedPhrase = botResponseText.includes(slowTypedPhrase);
      const containsCreatorPhrase = botResponseText.includes(creatorPhrase);
      
      const typingTextWithDelay = () => {
        if (charIndex < botResponseText.length) {
          // Check if we're currently typing one of our special phrases
          const currentSubstring = botResponseText.substring(charIndex, charIndex + Math.max(slowTypedPhrase.length, creatorPhrase.length));
          const isSlowPart = containsSlowTypedPhrase && 
            currentSubstring.includes(slowTypedPhrase.substring(0, Math.min(currentSubstring.length, slowTypedPhrase.length)));
          const isCreatorPart = containsCreatorPhrase && 
            currentSubstring.includes(creatorPhrase.substring(0, Math.min(currentSubstring.length, creatorPhrase.length)));
          
          // Adjust typing speed based on what we're typing
          const typingDelay = isSlowPart || isCreatorPart ? 400 : 150;
          
          currentText += botResponseText[charIndex];
          charIndex++;
          
          // Update the message with the current text
          setMessages(prev => {
            const updatedMessages = [...prev];
            const messageIndex = updatedMessages.findIndex(msg => msg.id === botResponseId);
            if (messageIndex !== -1) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                content: currentText,
                isTyping: charIndex < botResponseText.length
              };
            }
            return updatedMessages;
          });
          
          // Only scroll if we're near the end of the message to avoid frequent scrolling
          if (charIndex === botResponseText.length) {
            setShouldScrollToBottom(true);
          }
          
          // If we're typing one of our special phrases, slow down even more
          setTimeout(typingTextWithDelay, typingDelay);
        }
      };
      
      // Start the typing effect
      typingTextWithDelay();
    }, 1500);
  };
  
  const getResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi ")) {
      return "Hello! How can I assist you with your influencer marketing needs today?";
    } else if (lowerMsg.includes("search") || lowerMsg.includes("find") || lowerMsg.includes("kol") || lowerMsg.includes("influencer")) {
      return `For Creators: I can help you find the perfect TikTok creators! Please log in or sign up to access our full KOL search database with analytics.`;
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("subscription")) {
      return "We offer flexible pricing plans starting at $99/month. You can view all pricing details and features after creating an account.";
    } else if (lowerMsg.includes("account") || lowerMsg.includes("sign") || lowerMsg.includes("login")) {
      return "You can create an account or sign in using the buttons in the top right corner. It only takes a minute!";
    } else {
      return "I'd love to help you with that! To access our full platform features including KOL search, campaign management, and analytics, please sign in or create an account.";
    }
  };

  return (
    <>
      <FloatingHomeChat
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
        isKOLSpecificQuery={isKOLSpecificQuery}
        generalQuestionCounter={generalQuestionCounter}
        generalQuestionsPerCredit={generalQuestionsPerCredit}
      />
    </>
  );
};
