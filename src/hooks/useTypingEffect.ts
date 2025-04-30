
import { useState, useEffect } from 'react';
import { useInterval } from './useInterval';

interface UseTypingEffectOptions {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  highlightText?: string;
  highlightSpeed?: number;
  humanizedTyping?: boolean;
}

/**
 * Custom hook that creates a typing animation effect
 * @param options Configuration options for the typing effect
 * @returns The current typed text and a boolean indicating if typing is complete
 */
export function useTypingEffect({ 
  text, 
  typingSpeed = 40, 
  startDelay = 200,
  highlightText = "",
  highlightSpeed = 100, 
  humanizedTyping = true
}: UseTypingEffectOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(typingSpeed);
  const isComplete = currentIndex >= text.length;

  // Handle the initial delay before typing starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(timer);
  }, [startDelay]);

  // Randomize typing speed to simulate human typing if enabled
  useEffect(() => {
    if (humanizedTyping && started && !isComplete) {
      // Current character being typed
      const currentChar = text[currentIndex];
      
      // Common characters like spaces might be typed faster
      const isCommonChar = [' ', '.', ','].includes(currentChar);
      
      // Add variation to typing speed
      const variation = Math.random() * 80 - 40; // -40 to +40ms variation
      
      // Highlighted text gets typed at highlightSpeed
      const isHighlighted = highlightText && 
        text.substring(currentIndex, currentIndex + highlightText.length).toLowerCase() === 
        highlightText.toLowerCase();
      
      // Calculate new speed
      let newSpeed = isHighlighted ? highlightSpeed : typingSpeed;
      
      // Common characters are typed faster
      if (isCommonChar) newSpeed = newSpeed * 0.7;
      
      // Add random variation for realistic effect
      newSpeed = Math.max(20, newSpeed + variation);
      
      // If end of word (space after letter), add slight pause
      if (currentIndex > 0 && currentChar === ' ' && text[currentIndex - 1] !== ' ') {
        newSpeed += 60;
      }
      
      // If punctuation, add longer pause
      if (['.', '!', '?'].includes(currentChar)) {
        newSpeed += 200;
      }
      
      setCurrentSpeed(newSpeed);
    }
  }, [currentIndex, text, started, isComplete, humanizedTyping, typingSpeed, highlightText, highlightSpeed]);

  // Use interval for the typing effect with dynamic speed
  useInterval(
    () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text.charAt(currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    },
    started && !isComplete ? currentSpeed : null
  );

  return { displayedText, isComplete };
}
