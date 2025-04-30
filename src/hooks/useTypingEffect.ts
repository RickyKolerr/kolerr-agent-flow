
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
  const [isPaused, setIsPaused] = useState(false);
  const [pauseDuration, setPauseDuration] = useState(0);
  const isComplete = currentIndex >= text.length;

  // Handle the initial delay before typing starts
  useEffect(() => {
    // For ultra-fast typing, minimize the start delay
    const timer = setTimeout(() => {
      setStarted(true);
    }, typingSpeed <= 5 ? 50 : startDelay); // Use smaller delay for fast typing
    
    return () => clearTimeout(timer);
  }, [startDelay, typingSpeed]);

  // Randomize typing speed to simulate human typing if enabled
  useEffect(() => {
    if (humanizedTyping && started && !isComplete) {
      // For ultra-fast mode, use minimal variations and pauses
      if (typingSpeed <= 5) {
        // When ultra-fast is requested, minimize all randomization
        setCurrentSpeed(1);
        return;
      }
      
      // Current character being typed
      const currentChar = text[currentIndex];
      const nextChar = text[currentIndex + 1];
      
      // Check if we should insert a pause to simulate thinking
      if (
        // Pause after completing a sentence
        ['.', '!', '?'].includes(currentChar) ||
        // Occasionally pause mid-sentence to simulate thinking
        (currentIndex > 5 && Math.random() < 0.05) ||
        // Pause before starting brand names
        (highlightText && 
         text.substring(currentIndex + 1, currentIndex + 1 + highlightText.length).toLowerCase() === 
         highlightText.toLowerCase())
      ) {
        setIsPaused(true);
        // Random pause duration between 300ms and 1000ms
        const pause = ['.', '!', '?'].includes(currentChar) ? 
          Math.floor(Math.random() * 700) + 600 : // Longer pause after sentences
          Math.floor(Math.random() * 400) + 300;  // Shorter mid-sentence pause
        setPauseDuration(pause);
        return;
      }
      
      // Common characters like spaces might be typed faster
      const isCommonChar = [' ', '.', ','].includes(currentChar);
      
      // Add realistic variation to typing speed
      // People type faster in the middle of words, slower when starting new words
      let variation = Math.random() * 100 - 50; // -50 to +50ms variation
      
      // Typists often have a rhythm, with occasional stumbles or speed bursts
      if (Math.random() < 0.1) {
        // Occasional very fast or slow keystroke
        variation = Math.random() < 0.5 ? -30 : 120;
      }
      
      // Highlighted text gets typed at highlightSpeed
      const isHighlighted = highlightText && 
        text.substring(currentIndex, currentIndex + highlightText.length).toLowerCase() === 
        highlightText.toLowerCase();
      
      // Calculate new speed
      let newSpeed = isHighlighted ? highlightSpeed : typingSpeed;
      
      // Common characters are typed faster
      if (isCommonChar) newSpeed = newSpeed * 0.7;
      
      // Add realistic variation for human typing effect
      newSpeed = Math.max(20, newSpeed + variation);
      
      // If typing a capital letter after a lowercase, add slight delay for shift key
      if (currentIndex > 0 && 
          currentChar >= 'A' && currentChar <= 'Z' && 
          text[currentIndex - 1] >= 'a' && text[currentIndex - 1] <= 'z') {
        newSpeed += 40;
      }
      
      // If end of word (space after letter), add slight pause
      if (currentIndex > 0 && currentChar === ' ' && text[currentIndex - 1] !== ' ') {
        newSpeed += 80;
      }
      
      // If punctuation, add longer pause
      if (['.', '!', '?'].includes(currentChar)) {
        newSpeed += 200;
      }
      
      // Consecutive same letter is often typed faster
      if (currentChar === text[currentIndex - 1]) {
        newSpeed *= 0.8;
      }
      
      // Occasionally simulate a "burst" of typing for common letter combinations
      const commonPairs = ['th', 'er', 'on', 'an', 'in', 'he', 'nd'];
      if (currentIndex > 0 && 
          commonPairs.includes(text.substring(currentIndex - 1, currentIndex + 1).toLowerCase())) {
        newSpeed *= 0.7;
      }
      
      setCurrentSpeed(newSpeed);
    }
  }, [currentIndex, text, started, isComplete, humanizedTyping, typingSpeed, highlightText, highlightSpeed]);

  // Handle pauses in typing
  useEffect(() => {
    // For ultra-fast typing mode, minimize or skip pauses entirely
    if (typingSpeed <= 5 && isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (isPaused && pauseDuration > 0) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
      }, pauseDuration);
      
      return () => clearTimeout(pauseTimer);
    }
  }, [isPaused, pauseDuration, typingSpeed]);

  // Special handling for ultra-fast mode
  useEffect(() => {
    // If typing speed is very low (ultra-fast mode), skip the typing animation altogether
    if (typingSpeed <= 1 && started && !isComplete) {
      // Set the full text immediately for ultra-fast mode
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [typingSpeed, started, isComplete, text]);

  // Use interval for the typing effect with dynamic speed
  useInterval(
    () => {
      if (currentIndex < text.length && !isPaused) {
        // For very fast typing, add multiple characters at once
        if (typingSpeed <= 3 && typingSpeed > 1) {
          const charsToAdd = Math.min(5, text.length - currentIndex);
          setDisplayedText(prev => prev + text.substr(currentIndex, charsToAdd));
          setCurrentIndex(prevIndex => Math.min(prevIndex + charsToAdd, text.length));
        } else if (typingSpeed > 1) {
          // Normal typing, one character at a time
          setDisplayedText(prev => prev + text.charAt(currentIndex));
          setCurrentIndex(prevIndex => prevIndex + 1);
        }
        // For typingSpeed <= 1, we handle it in the useEffect above
      }
    },
    // Only use the interval for normal typing mode
    (started && !isComplete && !isPaused && typingSpeed > 1) ? currentSpeed : null
  );

  return { displayedText, isComplete };
}
