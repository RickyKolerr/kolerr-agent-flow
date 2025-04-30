
import { useState, useEffect } from 'react';
import { useInterval } from './useInterval';

interface UseTypingEffectOptions {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  highlightText?: string;
  highlightSpeed?: number;
}

/**
 * Custom hook that creates a typing animation effect
 * @param options Configuration options for the typing effect
 * @returns The current typed text and a boolean indicating if typing is complete
 */
export function useTypingEffect({ 
  text, 
  typingSpeed = 150, 
  startDelay = 0,
  highlightText = "",
  highlightSpeed = 300 // Even slower speed for highlighted text
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const isComplete = currentIndex >= text.length;

  // Handle the initial delay before typing starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Reset effect when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setStarted(false);
    
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(timer);
  }, [text, startDelay]);

  // Use interval for the typing effect
  useInterval(() => {
    if (currentIndex < text.length) {
      const currentChar = text.charAt(currentIndex);
      const nextFewChars = text.substring(currentIndex, currentIndex + highlightText.length);
      
      // Check if we're typing the highlighted phrase
      const isHighlightedPhrase = highlightText && 
        nextFewChars.toLowerCase().includes(highlightText.toLowerCase().substring(0, Math.min(nextFewChars.length, highlightText.length)));
      
      // Add longer pause after punctuation
      let extraDelay = 0;
      if (['.', '!', '?'].includes(currentChar)) {
        extraDelay = 200; // Longer pause after sentence end
      } else if ([',', ';', ':'].includes(currentChar)) {
        extraDelay = 100; // Medium pause after comma, etc.
      }
      
      // Set the next character
      setDisplayedText(text.substring(0, currentIndex + 1));
      
      // Increment index after delay if needed
      if (extraDelay > 0 || isHighlightedPhrase) {
        setTimeout(() => {
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, isHighlightedPhrase ? highlightSpeed : extraDelay);
      } else {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }
  }, started && !isComplete ? typingSpeed : null);

  return { displayedText, isComplete };
}
