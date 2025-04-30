
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
  }, [text]);

  // Use interval for the typing effect with dynamic speed
  useInterval(
    () => {
      if (currentIndex < text.length) {
        // Get the current substring being typed
        const currentSubstring = text.substring(currentIndex, currentIndex + highlightText.length);
        
        // Check if we're typing the highlighted phrase
        const isHighlightedPhrase = highlightText && 
          currentSubstring.toLowerCase().includes(highlightText.toLowerCase().substring(0, Math.min(currentSubstring.length, highlightText.length)));
        
        // Use the slower speed if this is part of the highlighted text
        const currentSpeed = isHighlightedPhrase ? highlightSpeed : typingSpeed;
        
        // Add random variation to typing speed (±20%) to make it feel more human
        const speedVariation = Math.random() * 0.4 - 0.2; // -20% to +20%
        
        // Add longer pause after punctuation
        const currentChar = text.charAt(currentIndex);
        let extraDelay = 0;
        if (['.', '!', '?'].includes(currentChar)) {
          extraDelay = 300; // Longer pause after sentence end
        } else if ([',', ';', ':'].includes(currentChar)) {
          extraDelay = 150; // Medium pause after comma, etc.
        }

        // Set the next character with delay
        setTimeout(() => {
          setDisplayedText(prev => prev + text.charAt(currentIndex));
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, extraDelay);
      }
    },
    started && !isComplete ? typingSpeed : null
  );

  return { displayedText, isComplete };
}
