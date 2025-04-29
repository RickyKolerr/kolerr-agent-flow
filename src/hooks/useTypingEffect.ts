
import { useState, useEffect } from 'react';
import { useInterval } from './useInterval';

interface UseTypingEffectOptions {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
}

/**
 * Custom hook that creates a typing animation effect
 * @param options Configuration options for the typing effect
 * @returns The current typed text and a boolean indicating if typing is complete
 */
export function useTypingEffect({ 
  text, 
  typingSpeed = 30, 
  startDelay = 0 
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

  // Use interval for the typing effect
  useInterval(
    () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text.charAt(currentIndex));
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    },
    started && !isComplete ? typingSpeed : null
  );

  return { displayedText, isComplete };
}
