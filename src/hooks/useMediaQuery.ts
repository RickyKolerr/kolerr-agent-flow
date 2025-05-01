
import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that returns if a media query is matched
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Set initial value (SSR safe)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    // Update matches state initially and on changes
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    
    // Add listener for changes
    media.addEventListener('change', updateMatches);
    
    // Cleanup function
    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}
